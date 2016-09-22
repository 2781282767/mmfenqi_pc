/**
 * Created by sheldon on 2016/8/1.
 */
'use strict';

function onLoad() {
    "use strict";
    ReactDOM.render(
        <div>
            <R_Header/>
            <R_Cashier three="3"/>
            <R_OrderEnsure/>
            <R_Footer/>
            <R_ToolBar/>
        </div>
        , document.getElementById("content"));
}
