<?php
foreach($adp->adp_data->player as $player){
    echo '<div class="player_list_row" id="'.$player->name.'_player_row" onclick="draft_player(event);">
        <div>'.$player->pos.'</div>
        <div>'.$player->name.'</div>
        <div>'.$player->adp_overall.'</div>
        </div>';
}
?>