<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class FFDraft extends CI_Controller {
    
    function __construct() {
        parent::__construct();
        $this->load->helper("url");
        self::refresh_ffCalcXML();
    }
    
    public function index(){
        $this->load->helper('form');
        $data['title'] = 'FF Draft';
        $this->load->view('common/head.php', $data);
        $this->load->view('football/draft.php');
        $this->load->view('common/foot.php');
        $this->load->view('football/draft_config.php');
    }

    private function refresh_ffCalcXML(){
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
    }