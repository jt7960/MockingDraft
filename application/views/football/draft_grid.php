<?php
$config = json_decode($config);
//print_r($config);

echo "<table class='draft_grid'><tr>";
for($team=1;$team<=$config->num_teams;$team++){
    echo "<th class='draft_grid'><div>Team".$team."</div></th>";
        } 
echo "</tr>";
for($round=1;$round<=$config->num_rounds;$round++){
    echo "<tr>";
        for($team=1;$team<=$config->num_teams;$team++){
            echo "<td class='draft_grid' round='".$round."' team='".$team."'><div ondrop='draft_by_drop(event)'>Team".$team. "\n Round".$round."</div></td>";
            }
    echo "</tr>";
        }


    
    

echo "</tr></table>";

?>


