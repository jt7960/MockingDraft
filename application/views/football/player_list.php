<?php
foreach($adp->adp_data->player as $player){
    echo '<div class="player_list_row" drafted="false" player_name="'.$player->name.'" id="'.$player->id.'" position="'.$player->pos.'" onclick="draft_player(event);">
        <div>'.$player->pos.'</div>
        <div>'.$player->name.' - '.$player->team.'</div>
        <div>'.$player->adp_overall.'</div>
        </div>';
}
?>