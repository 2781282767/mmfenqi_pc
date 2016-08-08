
"use strict";
function onLoad() {
    "use strict";
    ReactDOM.render(
        <div>
            <R_Header/>
            <R_Cashier one="1" two="2" />
            <div style={{borderTop: '2px solid #ff5370'}}>
                <div className="wrap">
                    <RMy_pay/>
                </div>
            </div>
            <R_Footer/>
            <R_ToolBar/>
        </div>
        , document.getElementById("content"));
}
