/**
 * Created by sheldon on 2016/7/22.
 */
'use strict';

function onLoad() {
    "use strict";
    ReactDOM.render(
        <div style={{height:'100%',flexDirection:'column',display:'flex'}}>
            <R_LoginHeader/>
            <R_LoginLogo login="1"/>
            <R_Forget phone_regex={/^[1]\d{10}$/}/>
        </div>

        , document.getElementById("content"));
}
