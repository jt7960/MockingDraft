<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class FFDraft extends CI_Controller {
    
    function __construct() {
        parent::__construct();
        $this->load->helper("url");
        //self::refresh_ffCalcXML();
    }
    
    public function index(){
        $this->load->helper('form');
        $data['title'] = 'FF Draft';
        $data['config'] = '';
        $this->load->view('common/head.php', $data);
        $this->load->view('football/draft.php');
        $this->load->view('common/foot.php');
        $this->load->view('football/draft_config.php');
    }

    public function load_team_boards(){
        $data['config'] = file_get_contents('php://input');
        $this->load->view('football/team_boards.php', $data);
    }

    public function load_player_list($source){
        if($source == 'ffcalc'){
            if(file_exists(getcwd() . "\\resources\\xml\\ff_calc_xml.xml")){
                $data['adp'] = simplexml_load_file(getcwd() . "\\resources\\xml\\ff_calc_xml.xml");
            }
        }
        if($source == 'nfl.com'){
            $data['players'] = '';
        }
        $this->load->view('football/player_list.php', $data);
    }

    private function refresh_ffCalcXML_at_work(){
        $aContext = array(
            'http' => array(
            'proxy' => 'web-proxy.boi.hp.com:8080',
            'request_fulluri' => true,
            ),
        );
        $cxContext = stream_context_create($aContext);
        $File = file_get_contents("https://fantasyfootballcalculator.com/adp_xml.php", False, $cxContext);
        if(!file_exists(getcwd() . "\\resources\\xml\\ff_calc_xml.xml") || (time() - filemtime(getcwd() . "\\resources\\xml\\ff_calc_xml.xml") > 3600)){
            file_put_contents(getcwd() . "\\resources\\xml\\ff_calc_xml.xml", $File);
            }
        }
    
    private function refresh_ffCalcXML_at_home(){
        $File = file_get_contents("https://fantasyfootballcalculator.com/adp_xml.php");
        if(!file_exists(getcwd() . "\\resources\\xml\\ff_calc_xml.xml") || (time() - filemtime(getcwd() . "\\resources\\xml\\ff_calc_xml.xml") > 3600)){
            file_put_contents(getcwd() . "\\resources\\xml\\ff_calc_xml.xml", $File);
            }
        }
    }