//Page Setup
var draft_status = {
  'round':0,
  'pick':0
}
var draft_log = { //draft_log.push({'round':1, 'pick':1, 'overall':1, 'team':'team1', 'player':'whoever', 'position':'RB'});
  'picks':[]
}
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
  console.log(league_type);
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
  var draft_config = {
    'teams':document.getElementById('form_num_teams').value,
    'positions':[
      {'name':'QB', 'quantity':document.getElementById('form_num_QBs').value},
      {'name':'RB', 'quantity':document.getElementById('form_num_RBs').value},
      {'name':'WR', 'quantity':document.getElementById('form_num_WRs').value},
      {'name':'WR_RB', 'quantity':document.getElementById('form_num_WR_RB').value},
      {'name':'WR_RB_TE', 'quantity':document.getElementById('form_num_WR_RB_TE').value},
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
  load_team_boards('/ffdraft/load_team_boards', draft_config);
  load_player_list('/ffdraft/load_player_list/'+ source);
  hide_draft_config();
  //define the number of rounds
  var num_rounds = 0;
  draft_config.positions.forEach(function(position){
    num_rounds +=parseInt(position.quantity);
  });
  //
  
    
}
//ajax
function load_team_boards(url, data){
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById('team_boards_cont').innerHTML = xhr.responseText;
        //document.getElementById('team_boards_cont').innerHTML = 'helo';
        console.log(xhr.responseText);
      }
      else(console.log(xhr.status));
    }
  xhr.open('POST', url, true);
  xhr.setRequestHeader("Content-type", "application/json");
  data = JSON.stringify(data);
  xhr.send(data);
}
function load_player_list(url, data){
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById('player_list').innerHTML = xhr.responseText;
      }
    }
  xhr.open('GET', url, true);
  xhr.send();
  }

function draft_player(){
  console.log('it works again');
  }

//Auto