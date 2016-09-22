'use strict';

function onLoad() {
    "use strict";
    ReactDOM.render(
        <div>
            <R_Header/>
            <R_Logo/>
            <R_ChannelNav now="4"/>
            <R_HospitalActive/>
            <R_Footer/>
            <R_ToolBar/>
        </div>
        , document.getElementById("content"));
}
