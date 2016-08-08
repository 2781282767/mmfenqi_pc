function onLoad() {
    "use strict";
    ReactDOM.render(
        <div>
            <R_Header/>
            <R_Logo/>
            <R_Nav now="1"/>
            <R_Banner/>
            <R_IndexTitle firstTitle="限时" secondTitle="秒杀" subTitle="Time spike" href={"goods.html"}/>
            <R_SaleGoods/>
            <R_IndexTitle firstTitle="合作" secondTitle="医院" subTitle="Cooperative Hospital"/>
            <R_IndexHospital/>
            <R_IndexTitle firstTitle="人气" secondTitle="项目" subTitle="Popular Project" isRed="true" href={"goods-list.html"}/>
            <R_PopularGoods/>
            <R_IndexTitle firstTitle="分期" secondTitle="流程" subTitle="Staging Process" isRed="true"/>
            <div className="wrap" style={{marginBottom: 40}}>
                <img src="../static/images/common/staging-progress.jpg"/>
            </div>
            <R_Footer/>
            <R_ToolBar/>
        </div>
        , document.getElementById("content"));
}