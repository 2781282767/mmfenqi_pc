/**
 * Created by sheldon on 2016/7/19.
 */
'use strict';

function onLoad() {

    var search= CommonService.getUrlParams('search')
    "use strict";
    ReactDOM.render(
        <div style={{flexDirection:'column',display:'flex'}}>
            <R_Header/>
            <R_Logo search={search}/>
            <R_ChannelNav/>
            <R_ProjectListPage/>
            <R_Footer/>
            <R_ToolBar/>
        </div>
        , document.getElementById("content"));
}
