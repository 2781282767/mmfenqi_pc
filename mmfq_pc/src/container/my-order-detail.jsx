'use strict';

function onLoad() {
    "use strict";
    ReactDOM.render(
        <div>
            <R_Header/>
            <R_Cashier one="1" two="2" three="" four="4" five=""/>
            <R_MyOrderDetail/>
            <R_Footer/>
            <R_ToolBar/>
        </div>
        , document.getElementById("content"));
}
