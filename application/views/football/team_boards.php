<?php
$config = json_decode($config);

//echo $config->positions->QB->name;
for($team = 1; $team <= $config->num_teams; $team++){
    echo "<table class='team_board' id='team".$team."board'><tr class='team_board_title_row'><th class='team_board_name' id='team_".$team."_name' colspan='3'>Team ".$team."</th></tr>";
    foreach($config->positions as $position){
        for($i = 1; $i <= $position->quantity; $i++){
            echo "<tr class='".str_replace('/', ' ', $position->name)."'>
            <td class='team_board_position'>".$position->name."</td>
            <td class='team_board_player'></td>
            <td class='team_board_pick'></td>
            </tr>";
            }
        }
        echo "</table>";
    }
    

?>

