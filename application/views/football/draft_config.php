<div id='page_cover' onclick='hide_draft_config()'></div>
<div id='config_module'>
    <div id='module_title'>
        <span>Draft Configuration</span>
    </div>
    <div id='config_form_cont'>
    <?php
        //open form
        echo form_open('FFDraft');
        //number of teams
        $num_teams = array('8'=>'8', '10'=>'10', '12'=>'12', '14'=>'14', '16'=>'16', '18'=>'18', '20'=>'20');
        echo form_label('Teams: ', 'form_num_teams');
        echo form_dropdown('num_teams', $num_teams, array('12'=>'12'), array('id'=>'form_num_teams'));
        echo '<br><br>';
        //Number of QBs
        $num_QBs = array('0'=>'0', '1'=>'1', '2'=>'2', '3'=>'3');
        echo form_label('QBs: ', 'form_num_QBs');
        echo form_dropdown('num_QBs', $num_QBs, array('1'=>'1'), array('id'=>'form_num_QBs'));
        echo '<br><br>';
        //Number of RBs
        $num_RBs = array('0'=>'0', '1'=>'1', '2'=>'2', '3'=>'3');
        echo form_label('RBs: ', 'form_num_RBs');
        echo form_dropdown('num_RBs', $num_RBs, array('2'=>'2'), array('id'=>'form_num_RBs'));
        echo '<br><br>';
        //Number of WRs
        $num_WRs = array('0'=>'0', '1'=>'1', '2'=>'2', '3'=>'3');
        echo form_label('WRs: ', 'form_num_WRs');
        echo form_dropdown('num_WRs', $num_WRs, array('2'=>'2'), array('id'=>'form_num_WRs'));
        echo '<br><br>';
        //Number of WR/RB
        $num_WR_RB = array('0'=>'0', '1'=>'1', '2'=>'2', '3'=>'3');
        echo form_label('WR/RB: ', 'form_num_WR_RB');
        echo form_dropdown('num_WR_RB', $num_WR_RB, array('1'=>'1'), array('id'=>'form_num_WR_RB'));
        echo '<br><br>';
        //Number of WR/RB/TE
        $num_WR_RB_TE = array('0'=>'0', '1'=>'1', '2'=>'2', '3'=>'3');
        echo form_label('WR/RB/TE: ', 'form_num_WR_RB_TE');
        echo form_dropdown('num_WR_RB_TE', $num_WR_RB_TE, array('0'=>'0'), array('id'=>'form_num_WR_RB_TE'));
        echo '<br><br>';
        //Number of TEs
        $num_TEs = array('0'=>'0', '1'=>'1', '2'=>'2', '3'=>'3');
        echo form_label('TEs: ', 'form_num_TEs');
        echo form_dropdown('num_TEs', $num_TEs, array('1'=>'1'), array('id'=>'form_num_TEs'));
        echo '<br><br>';
        //Number of Ks
        $num_Ks = array('0'=>'0', '1'=>'1', '2'=>'2', '3'=>'3');
        echo form_label('Ks: ', 'form_num_Ks');
        echo form_dropdown('num_Ks', $num_Ks, array('1'=>'1'), array('id'=>'form_num_Ks'));
        echo '<br><br>';
        //Standard or IDP
        $idp = array('Standard'=>'Standard', 'IDP'=>'IDP');
        echo form_label('Standard or IDP: ', 'stan_idp');
        echo form_dropdown('stan_idp', $idp, array('Standard'=>'Standard'), array('id'=>'stan_idp', 'onchange'=>'select_league_type()'));
        echo '<br><br>';
        //stanard league div
        echo "<div id='standard_league_def'>";
        //Number of DEFs
        $num_DEFs = array('0'=>'0', '1'=>'1', '2'=>'2', '3'=>'3');
        echo form_label('DEFs: ', 'form_num_DEFs');
        echo form_dropdown('num_DEFs', $num_DEFs, array('1'=>'1'), array('id'=>'form_num_DEFs'));
        echo '<br><br>';
        echo "</div>";
        //IDP League div
        echo "<div id='idp_league_def'>";
        //Number of DLs
        $num_DLs = array('0'=>'0', '1'=>'1', '2'=>'2', '3'=>'3');
        echo form_label('DLs: ', 'form_num_DLs');
        echo form_dropdown('num_DLs', $num_DLs, array('0'=>'0'), array('id'=>'form_num_DLs'));
        echo '<br><br>';
        //Number of LBs
        $num_LBs = array('0'=>'0', '1'=>'1', '2'=>'2', '3'=>'3');
        echo form_label('LBs: ', 'form_num_LBs');
        echo form_dropdown('num_LBs', $num_LBs, array('0'=>'0'), array('id'=>'form_num_LBs'));
        echo '<br><br>';
        //Number of DBs
        $num_DBs = array('0'=>'0', '1'=>'1', '2'=>'2', '3'=>'3');
        echo form_label('DBs: ', 'form_num_DBs');
        echo form_dropdown('num_DBs', $num_DBs, array('0'=>'0'), array('id'=>'form_num_DBs'));
        echo '<br><br>';
        //Number of IDP_Flex
        $num_IDP_Flex = array('0'=>'0', '1'=>'1', '2'=>'2', '3'=>'3');
        echo form_label('IDP_Flex: ', 'form_num_IDP_Flex');
        echo form_dropdown('num_IDP_Flex', $num_IDP_Flex, array('0'=>'0'), array('id'=>'form_num_IDP_Flex'));
        echo '<br><br>';
        echo "</div>";
        //number of bench
        $num_rounds = array('0'=>'0', '1'=>'1', '2'=>'2', '3'=>'3', '4'=>'4', '5'=>'5', '6'=>'6','7'=>'7', '8'=>'8','9'=>'9', '10'=>'10');
        echo form_label('Bench Depth: ', 'form_num_bench');
        echo form_dropdown('num_bench', $num_rounds, array('6'=>'6'), array('id'=>'form_num_bench'));
        echo '<br><br>';
        //form submit
        echo form_submit('draft_config_submit', 'Submit', array('id'=>'draft_config_submit', 'onclick'=>'launch_new_draft(event)'));
        //form close
        echo form_close();
        ?>
    </div>
</div>

