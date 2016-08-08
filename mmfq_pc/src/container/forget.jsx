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
            <R_Forget phone_regex={/(13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7}/}/>
        </div>
        , document.getElementById("content"));
}
