<?php
foreach($adp->adp_data->player as $player){
    echo '<div class="player_list_row" player_name="'.$player->name.'" id="'.$player->id.'" onclick="draft_player(event);">
        <div>'.$player->pos.'</div>
        <div>'.$player->name.'</div>
        <div>'.$player->adp_overall.'</div>
        </div>';
}
?>