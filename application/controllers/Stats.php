<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Stats extends CI_Controller {
    
    function __construct() {
        parent::__construct();
        $this->load->helper("url");
    }

    public function index(){
        $this->load->view('football_stats/head');
        $this->load->view('football_stats/title_bar');
        $this->load->view('football_stats/stats');
    }

}