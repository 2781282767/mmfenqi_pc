/**
 * Created by ChinaHp on 2016/8/3.
 */
'use strict'

function onLoad() {
    "use strict";
    ReactDOM.render(
        <div>
            <R_Header/>
            <R_Logo/>
            <R_ChannelNav/>
            <R_Commerce_add phone_regex={/(13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7}/}/>
            <R_Footer/>
            <R_ToolBar/>
        </div>
        , document.getElementById("content"));
}
