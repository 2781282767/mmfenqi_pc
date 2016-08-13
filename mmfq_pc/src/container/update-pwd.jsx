/**
 * Created by ChinaHp on 2016/8/10.
 */
'use strict';
function onLoad() {
    "use strict";
    ReactDOM.render(
        <div>
            <R_Header/>
            <R_Logo/>
            <R_Nav/>

            <div style={{borderTop: '2px solid #ff5370'}}>
                <div className="wrap">
                    <R_MyBar status="order"/>
                    <R_aa pwd_regex={/^.{6,16}$/}/>
                    <div style={{overflow:'hidden'}}></div>
                </div>
            </div>
        </div>
        , document.getElementById("content"));
}
