//Page Setup

var draft_status = {}
var draft_log = {'picks':[]}
var draft_config = {};

//UI
function hide_draft_config(){
  event.preventDefault();
  document.getElementById('page_cover').style.display = 'none';
  document.getElementById('config_module').style.display = 'none';
  document.getElementById('page_container').style.background = 'rgba(0,0,0,0)';
}
function show_draft_config(event){
  event.preventDefault();
  document.getElementById('page_cover').style.display = 'block';
  document.getElementById('config_module').style.display = 'block';
  document.getElementById('page_container').style.background = 'rgba(0,0,0,0.5)';
}
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
//Draft
function launch_new_draft(event){
  event.preventDefault();
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
  hide_draft_config();
  draft_status = {'round':1, 'pick':1, 'overall_pick':1};
  //assign picks
  draft_picks = assign_draft_picks(draft_config.num_rounds, draft_config.num_teams);
  //console.log(draft_picks.indexOf(draft_picks[1]));
  //var pick = draft_picks.find(get_picking_team); //use this to determine whose pick it is
}
function draft_player(event){
  var picking_team = draft_picks.find(get_picking_team); //see (ctrl-f): confusing as hell
  //create draft log entry object
  var draft_log_entry = {
    'round':draft_status.round, 
    'pick':draft_status.pick, 
    'overall_pick':draft_status.overall_pick,
    //'team':picking_team.team,
    'team':picking_team.team, //see (ctrl-f): confusing as hell
    'player':event.currentTarget.getAttribute('player_name'),
    'position':event.currentTarget.getAttribute('position')
  };
  //add log entry to log
  draft_log.picks.push(draft_log_entry);
  //add player to team object -- NEED TO CREATE TEAM OBJECTS!

  //add player to team board
  add_player_to_team_board(draft_log_entry);
  console.log(draft_log);
  //add the player to the team board
  //advance the pick
  advance_pick();
  //console.log(draft_status);
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
function get_picking_team(draft_picks){ //this code is confusing as hell, but is used with array.find to work
  return draft_picks.overall_pick === draft_status.pick;
}
function advance_pick(){
  if(draft_status.pick == draft_config.num_teams){
    draft_status.round++;
    draft_status.pick = 1;
    overall_pick++;
  }
  else{
    draft_status.pick++;
    draft_status.overall_pick++;
  }
}
function add_player_to_team_board(draft_log_entry){
  var team_board = document.getElementById('team'+draft_log_entry.team+'board');
  console.log(team_board);
  var available_spots = team_board.getElementsByClassName(draft_log_entry.position);
  console.log(available_spots);
  //works to here!!
  var cells = 

}
//ajax
function load_team_boards(url, data){
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById('team_boards_cont').innerHTML = xhr.responseText;
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
        document.getElementById('player_list').innerHTML = exhr.responseText;
      }
    }
  exhr.open('GET', url, true);
  exhr.send();
}

//document.ready