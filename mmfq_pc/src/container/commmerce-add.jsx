/**
 * Created by ChinaHp on 2016/8/3.
 */
'use strict';

function onLoad() {
    "use strict";
    ReactDOM.render(
        <div>
            <R_Header/>
            <R_Logo/>
            <R_ChannelNav/>
            <R_Commerce_add phone_regex={/^[1]\d{10}$/}/>
            <R_Footer/>
            <R_ToolBar/>
        </div>
        , document.getElementById("content"));
}
