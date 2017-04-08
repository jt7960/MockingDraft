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
    'postition':{'name':'QB', 'quantity':document.getElementById('form_num_QBs').value},
    'postition':{'name':'RB', 'quantity':document.getElementById('form_num_RBs').value},
    'postition':{'name':'WR', 'quantity':document.getElementById('form_num_WRs').value},
    'postition':{'name':'TE', 'quantity':document.getElementById('form_num_TEs').value},
    'postition':{'name':'WR_RB', 'quantity':document.getElementById('form_num_WR_RB').value},
    'postition':{'name':'WR_RB_TE', 'quantity':document.getElementById('form_num_WR_RB_TE').value},
    'postition':{'name':'PK', 'quantity':document.getElementById('form_num_PKs').value},
    'postition':{'name':'DEF', 'quantity':document.getElementById('form_num_DEFs').value},
    'postition':{'name':'LB', 'quantity':document.getElementById('form_num_LBs').value},
    'postition':{'name':'DB', 'quantity':document.getElementById('form_num_DBs').value},
    'postition':{'name':'DL', 'quantity':document.getElementById('form_num_DLs').value},
    'postition':{'name':'IDP_Flex', 'quantity':document.getElementById('form_num_IDP_Flex').value},
    'postition':{'name':'Bench', 'quantity':document.getElementById('form_num_bench').value}
  }
  load_team_boards(draft_config);

}
function load_team_boards(config){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", '/FFDraft/load_team_boards', true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log('onreadystate fired');
      document.getElementById('team_baords_cont').innerHTML += this.responseXML;
        }
  xhr.send(config);
    }
}

loadXML("/resources/xml/ff_calc_xml.xml");

