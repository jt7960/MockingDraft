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
  var draft_config = {};
  draft_config.num_teams = document.getElementById('form_num_teams').value;
  draft_config.num_QBs = document.getElementById('form_num_QBs').value;
  draft_config.num_RBs = document.getElementById('form_num_RBs').value;
  draft_config.num_WRs = document.getElementById('form_num_WRs').value;
  draft_config.num_WR_RB = document.getElementById('form_num_WR_RB').value;
  draft_config.num_WR_RB_TE = document.getElementById('form_num_WR_RB_TE').value;
  draft_config.num_TEs = document.getElementById('form_num_TEs').value;
  draft_config.num_Ks = document.getElementById('form_num_Ks').value;
  draft_config.num_DEFs = document.getElementById('form_num_DEFs').value;
  draft_config.num_DLs = document.getElementById('form_num_DLs').value;
  draft_config.num_LBs = document.getElementById('form_num_LBs').value;
  draft_config.num_DBs = document.getElementById('form_num_DBs').value;
  draft_config.num_IDP_Flex = document.getElementById('form_num_IDP_Flex');
  draft_config.num_Bench = document.getElementById('form_num_bench').value;

  var draft_log = {};
  var draft_status = {'round':1, 'pick':1};

  draw_team_boards(draft_config);
}

function draw_team_boards(draft_config){
  hide_draft_config();
  var boards = document.getElementById('team_boards_cont');
  boards.innerHTML = '';
  if(boards){console.log('boards exists');}
  for(i=1; i<=draft_config.num_teams; i++){
    boards.innerHTML += "<div class='team_board' id='team"+i+"board'><div class='team_board_header'>Team"+i+"</div></div>";
    for(qb=1;qb<=draft_config.num_QBs;qb++){
      document.getElementById('team'+i+'board').innerHTML+= "<div class='team_board_qb'>QB</div><div class='team_board_player'></div>";
      }
    for(rb=1;rb<=draft_config.num_RBs;rb++){
      document.getElementById('team'+i+'board').innerHTML+= "<div class='team_board_rb'>RB</div><div class='team_board_player'></div>";
      }
    for(wr=1;wr<=draft_config.num_WRs;wr++){
      document.getElementById('team'+i+'board').innerHTML+= "<div class='team_board_wr'>WR</div><div class='team_board_player'></div>";
      }
    for(flx=1;flx<=draft_config.num_WR_RB;flx++){
      document.getElementById('team'+i+'board').innerHTML+= "<div class='team_board_WR_RB'>FLEX(WR/RB): </div><div class='team_board_player'></div>";
    }
    for(flx=1;flx<=draft_config.num_WR_RB_TE;flx++){
      document.getElementById('team'+i+'board').innerHTML+= "<div class='team_board_WR_RB_TE'>FLEX(WR/RB/TE): </div><div class='team_board_player'></div>";
    }
    for(te=1;te<=draft_config.num_TEs;te++){
      document.getElementById('team'+i+'board').innerHTML+= "<div class='team_board_te'>TE</div><div class='team_board_player'></div>";
      }
    for(k=1;k<=draft_config.num_Ks;k++){
      document.getElementById('team'+i+'board').innerHTML+= "<div class='team_board_k'>K</div><div class='team_board_player'></div>";
      }
    for(def=1;def<=draft_config.num_DEFs;def++){
      document.getElementById('team'+i+'board').innerHTML+= "<div class='team_board_def'>DEF</div><div class='team_board_player'></div>";
      }
    for(db=1;db<=draft_config.num_DBs;db++){
      document.getElementById('team'+i+'board').innerHTML+= "<div class='team_board_db'>DB</div><div class='team_board_player'></div>";
      }
    for(lb=1;lb<=draft_config.num_LBs;lb++){
      document.getElementById('team'+i+'board').innerHTML+= "<div class='team_board_lb'>LB</div><div class='team_board_player'></div>";
      }
    for(dl=1;dl<=draft_config.num_LBs;dl++){
      document.getElementById('team'+i+'board').innerHTML+= "<div class='team_board_dl'>DL</div><div class='team_board_player'></div>";
      }
    for(idp=1;idp<=draft_config.num_IDP_Flex;idp++){
      document.getElementById('team'+i+'board').innerHTML+= "<div class='team_board_idp_flex'>IDP Flex</div><div class='team_board_player'></div>";
      }
    for(ben=1;ben<=draft_config.num_Bench;ben++){
      document.getElementById('team'+i+'board').innerHTML+= "<div class='team_board_bench'>Bench</div><div class='team_board_player'></div>";
      }
    }
  }

loadXML("/resources/xml/ff_calc_xml.xml");
