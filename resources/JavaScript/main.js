function loadXML(source) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    loadXML_HtmlWriter(this);
    }
  };
  xhttp.open("GET", source, true);
  xhttp.send();
}

function loadXML_HtmlWriter(xml){
  var i;
  var xmlDoc = xml.responseXML;
  var x = xmlDoc.getElementsByTagName("player");
  var html = '';
  for (i = 0; i <x.length; i++) { 
    html += "<div class='PS_Player_Row' onclick='draft_player()'><div>" +
    x[i].getElementsByTagName("pos")[0].childNodes[0].nodeValue +
    "</div><div>" +
    x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue +
    "</div><div>" + 
    x[i].getElementsByTagName("adp_overall")[0].childNodes[0].nodeValue +
    "</div></div>";
  }
  document.getElementById("PS_Player_Row_Cont").innerHTML += html;
}

function draft_player(){
  console.log('player_drafted');
}

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

function launch_new_draft(event){
  event.preventDefault();
  var draft_config = {
    'teams':document.getElementById('form_num_teams').value,
    'positions':{
      'QB':{'name':'QB', 'quantity':document.getElementById('form_num_QBs').value},
      'RB':{'name':'RB', 'quantity':document.getElementById('form_num_RBs').value},
      'WR':{'name':'WR', 'quantity':document.getElementById('form_num_WRs').value},
      'TE':{'name':'TE', 'quantity':document.getElementById('form_num_TEs').value},
      'WR_RB':{'name':'WR_RB', 'quantity':document.getElementById('form_num_WR_RB').value},
      'WR_RB_TE':{'name':'WR_RB_TE', 'quantity':document.getElementById('form_num_WR_RB_TE').value},
      'PK':{'name':'PK', 'quantity':document.getElementById('form_num_PKs').value},
      'DEF':{'name':'DEF', 'quantity':document.getElementById('form_num_DEFs').value},
      'LB':{'name':'LB', 'quantity':document.getElementById('form_num_LBs').value},
      'DB':{'name':'DB', 'quantity':document.getElementById('form_num_DBs').value},
      'DL':{'name':'DL', 'quantity':document.getElementById('form_num_DLs').value},
      'IDP_FLEX':{'name':'IDP_Flex', 'quantity':document.getElementById('form_num_IDP_Flex').value},
      'Bench':{'name':'Bench', 'quantity':document.getElementById('form_num_bench').value}
    }
  }
  ajaxPOST('/ffdraft/load_team_boards', draft_config);
  hide_draft_config();
}

function ajaxPOST(url, data){
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById('team_boards_cont').innerHTML += xhr.responseText;
      }
    }
  xhr.open('POST', '/ffdraft/load_team_boards', true);
  xhr.setRequestHeader("Content-type", "application/json");
  data = JSON.stringify(data);
  xhr.send(data);
}


loadXML("/resources/xml/ff_calc_xml.xml");

