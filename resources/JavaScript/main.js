//Page Setup

var draft_status = {}
var draft_log = {'picks':[]}
var draft_config = {};

//UI

function select_league_type(){
  var league_type = document.getElementById('stan_idp').value;
  if(league_type == 'Standard'){
    document.getElementById('idp_league_def').style.display = 'none';
    document.getElementById('standard_league_def').style.display = 'block';
  }
  if(league_type == 'IDP'){
    document.getElementById('standard_league_def').style.display = 'none';
    document.getElementById('idp_league_def').style.display = 'block';
  }
}
function highlight_tab(tabId, overviewId){
  var selected = document.getElementsByClassName('selected');
  [].forEach.call(selected, function(element){
    element.className = 'unselected';
  });
  var overviews = document.getElementById('overview').children;
  [].forEach.call(overviews, function(element){
    element.style.display = 'none';
  });
  document.getElementById(overviewId).style.display = 'block';
  document.getElementById(tabId).className = 'selected';
}

//Draft
function launch_new_draft(event){
  event.preventDefault();
  highlight_tab('team_boards_tab', 'team_boards');
 
  //get data from draft config
  var source = document.getElementById('form_ranks').value;
  draft_config = {
    'num_teams':document.getElementById('form_num_teams').value,
    'num_rounds':'',
    'positions':[
      {'name':'QB', 'quantity':document.getElementById('form_num_QBs').value},
      {'name':'RB', 'quantity':document.getElementById('form_num_RBs').value},
      {'name':'WR', 'quantity':document.getElementById('form_num_WRs').value},
      {'name':'WR RB', 'quantity':document.getElementById('form_num_WR_RB').value},
      {'name':'WR RB TE', 'quantity':document.getElementById('form_num_WR_RB_TE').value},
      {'name':'TE', 'quantity':document.getElementById('form_num_TEs').value},
      {'name':'PK', 'quantity':document.getElementById('form_num_PKs').value},
      {'name':'DEF', 'quantity':document.getElementById('form_num_DEFs').value},
      {'name':'DL', 'quantity':document.getElementById('form_num_DLs').value},
      {'name':'LB', 'quantity':document.getElementById('form_num_LBs').value},
      {'name':'DB', 'quantity':document.getElementById('form_num_DBs').value},
      {'name':'IDP_Flex', 'quantity':document.getElementById('form_num_IDP_Flex').value},
      {'name':'Bench', 'quantity':document.getElementById('form_num_bench').value}
      ]
    }
  //define the number of rounds
  var num_rounds = 0;
  draft_config.positions.forEach(function(position){
    num_rounds +=parseInt(position.quantity);
  });
  draft_config.num_rounds = num_rounds;
  //load the page contents
  load_team_boards('/ffdraft/load_team_boards', draft_config);
  load_player_list('/ffdraft/load_player_list/'+ source);
  draft_status = {'round':1, 'pick':1, 'overall_pick':1};
  //assign picks
  draft_picks = assign_draft_picks(draft_config.num_rounds, draft_config.num_teams);
  //console.log(draft_picks.indexOf(draft_picks[1]));
  //var pick = draft_picks.find(get_picking_team); //use this to determine whose pick it is
}
function draft_player(event){
  //verify the player hasn't already been drafted
  var drafted = event.currentTarget.getAttribute('drafted');
  if(drafted == 'false'){
    //identify the picking team
    var picking_team = draft_picks.find(function(val){
      return val.overall_pick === draft_status.overall_pick;
    });
    //create draft log entry object
    var draft_log_entry = {
      'round':draft_status.round, 
      'pick':draft_status.pick, 
      'overall_pick':draft_status.overall_pick,
      //'team':picking_team.team,
      'team':picking_team.team,
      'player':event.currentTarget.getAttribute('player_name'),
      'position':event.currentTarget.getAttribute('position')
    };
    //try to add player to team board (will fail if applicable position slots and all bench slots are full)
    if(add_player_to_team_board(draft_log_entry)){
      //add log entry to log
      draft_log.picks.push(draft_log_entry);
      event.currentTarget.setAttribute('drafted', 'true');
      advance_pick();
    }
    else{
      alert('cannot draft anymore '+ draft_log_entry.position+ 's');
    } //here
  }
}
function assign_draft_picks(num_rounds, num_teams){ //this will eventually faciliate trading picks
  var draft_picks = [];
  overall_pick = 1;
  for(round = 1; round<=num_rounds; round++){
    if(round%2!=0){
      for(var team = 1; team<=num_teams; team++){
        draft_picks.push({'team':team, 'overall_pick':overall_pick, 'round':round, 'pick':team});
        overall_pick++;
      }
    }
    else{
      for(team = parseInt(num_teams); team > 0; team--){
        var pick = (parseInt(num_teams) + 1) - parseInt(team);
        draft_picks.push({'team':team, 'overall_pick':overall_pick, 'round':round, 'pick':pick});
        overall_pick++;
      }
    }
  }
  return draft_picks;
}
function advance_pick(){
  if(draft_status.pick == draft_config.num_teams){
    draft_status.round++;
    draft_status.pick = 1;
    draft_status.overall_pick++;
  }
  else{
    draft_status.pick++;
    draft_status.overall_pick++;
  }
  console.log(draft_status);
}
function add_player_to_team_board(draft_log_entry){
  var position = draft_log_entry.position;
  var team_board = document.getElementById('team'+draft_log_entry.team+'board');
  var available_position_rows = team_board.getElementsByClassName(position);
  if(available_position_rows.length === 0){
    var available_position_rows = team_board.getElementsByClassName('bench');
    var position = 'bench';
    if(available_position_rows.length === 0){
      return false;
    }
  }
  var player_name_cell = available_position_rows[0].getElementsByClassName('team_board_player')[0];
  player_name_cell.innerHTML = draft_log_entry.player;
  team_board.getElementsByClassName(position)[0].setAttribute('id', draft_log_entry.player);
  team_board.getElementsByClassName(position)[0].className = draft_log_entry.player;
  return true;
}
//ajax
function load_team_boards(url, data){
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById('team_boards').innerHTML = xhr.responseText;
      }
      else{
        //(console.log(xhr.status));
      }
    }
  xhr.open('POST', url, true);
  xhr.setRequestHeader("Content-type", "application/json");
  data = JSON.stringify(data);
  xhr.send(data);
}
function load_player_list(url, data){
  exhr = new XMLHttpRequest();
  exhr.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById('player_select_column').innerHTML = exhr.responseText;
      }
    }
  exhr.open('GET', url, true);
  exhr.send();
}

//document.ready
function load_draft_config(){
  dc_xhr = new XMLHttpRequest();
  dc_xhr.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById('draft_config').innerHTML = dc_xhr.responseText;
      }
    }
  dc_xhr.open('GET', '/ffdraft/load_draft_config/', true);
  dc_xhr.send();
}

load_draft_config();