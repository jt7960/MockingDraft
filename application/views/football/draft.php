    <body>
        <div id='page_wrapper'>
            <div id='menu'>
                <span class='title'>Mocking Draft</span>
            </div>
            <div id='player_select_controls'>
                <div id='undo' onclick='undo_pick()'>Undo</div>
                <div id='redo'onclick='redo_pick()'>Redo</div>
                <div id='filter' onchange='filter_position()'>
                    <select id='filter_position'>
                        <option value='' selected disabled>Filter Postion</option>
                        <option value='QB'>QB</option>
                        <option value='RB'>RB</option>
                        <option value='WR'>WR</option>
                        <option value='TE'>TE</option>
                        <option value='PK'>PK</option>
                        <option value='Def'>Def</option>
                        <option value='DE'>DE</option>
                        <option value='LB'>LB</option>
                        <option value='DB'>DB</option>
                    </select>
                </div>
            </div>
            <div id='player_select_column'></div>
            <div id='overview_tabs'>
                <div id='draft_config_tab' class='selected' onclick='highlight_tab("draft_config_tab", "draft_config")'>Draft Config</div>
                <div id='team_boards_tab' class='unselected' onclick='highlight_tab("team_boards_tab", "team_boards")'>Team Boards</div>
                <div id='draft_grid_tab' class='unselected' onclick='highlight_tab("draft_grid_tab", "draft_grid")'>Draft Grid</div>
            </div>
            <div id='overview_column'>
                <div id='overview'>
                    <div id='draft_config'></div>
                    <div id='team_boards'></div>
                    <div id='draft_grid'></div>
                </div>
            </div>
            <div id='draft_log_column'></div>
        </div>
