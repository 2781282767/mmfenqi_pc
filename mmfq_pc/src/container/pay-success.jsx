'use strict';

function onLoad() {
    "use strict";
    ReactDOM.render(
        <div>
            <R_Header/>
            <R_Cashier five="5"/>
            <R_PaySuccess/>

            <R_Footer/>
            <R_ToolBar/>
        </div>
        , document.getElementById("content"));

}
