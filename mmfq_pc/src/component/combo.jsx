'use strict';

class R_Combo extends React.Component {

    constructor(){
        super()
        this.state={
            data:[],
            goodsMapList:[],
            item0:[],
            item1:[],
            item2:[],
            item00:[],
            item11:[],
            item22:[],
            goodsId0:[],
            goodsId1:[],
            goodsId2:[],
        }
    }
    http(url, jsonData, cb) {
        $.ajax({
            type: 'post',
            url: url,
            data: jsonData,
            dataType: 'json',
            success: function (res) {
                if (res.result == 0) {
                    return cb(res)
                } else if (res.result == 1013) {
                    alert(333)
                }
            }
        })
    }




    combo(){

        this.http('/pc/computer/query_netRedPack_pc', '', function (res) {

            console.log(res)

            this.setState({
                data:res.data.orderList,
                goodsMapList:res.data.goodsMapList,
                item0:res.data.goodsMapList[0].goodsItemGroupList,
                item1:res.data.goodsMapList[1].goodsItemGroupList,
                item2:res.data.goodsMapList[2].goodsItemGroupList,


                item00:res.data.goodsMapList[0].netRedGoodsItem,
                item11:res.data.goodsMapList[1].netRedGoodsItem,
                item22:res.data.goodsMapList[2].netRedGoodsItem,



                goodsId0:res.data.goodsMapList[0].goodsId,
                goodsId1:res.data.goodsMapList[1].goodsId,
                goodsId2:res.data.goodsMapList[2].goodsId,



            })

        }.bind(this));

    }

    timeStamp2String(time) {
        var datetime = new Date();
        datetime.setTime(time);
        var year = datetime.getFullYear();
        var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
        var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
        var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
        var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    }
    componentDidMount(){
        this.combo();
    }
    render() {

        var goodsMapList=this.state.goodsMapList;



        for(var i=0;i<goodsMapList.length;i++){

        }

        console.log(this.state.item0);
        console.log(this.state.item1);
        console.log(this.state.item2);

        var goodsId0=this.state.goodsId0;
        var goodsId1=this.state.goodsId1;
        var goodsId2=this.state.goodsId2;



        return (
            <div className="combo-main">
                <div className="main">
                </div>
                <div className="one-g">
                    <div className="one-main">
                        <div className="main-content">
                            <div className="goods-info">
                                <ul>

                                    {
                                        this.state.item0.map(json=>{
                                            return<li style={{marginBottom:'20px',marginLeft:'7px'}} key={json.goodsId}>
                                                <div className="infoImg">

                                                    <img src={json.goodsHerPic} alt=""/>


                                                </div>

                                                    <div className="babyInfo">
                                                        <div className="infoTit1">{json.hotItemName}</div>
                                                        <div className="infoTit2">
                                                            <div><b className="pink"><i>￥</i><span>{json.presentPrice}</span></b></div>

                                                            <div><del>市场价￥{json.marketPrice}</del></div>

                                                        </div>
                                                    </div>


                                            </li>

                                        })
                                    }

                                </ul>
                            </div>

                            <div className="one-pay">
                                <div style={{width:'150px'}}>
                                    <del>￥{this.state.item00.marketPrice}</del>
                                </div>
                                <div style={{width:'382px'}}>美眉专享价: <i>￥</i> <b>{this.state.item00.monthlyPrice}</b> <span>x{this.state.item00.staging}</span></div>

                                <div><a href={"goods-detail.html?goodsId=" + goodsId0}><div className="_btn btn_btn" style={{padding:'9px'}}>立刻分期</div></a></div>

                            </div>
                        </div>

                    </div>
                </div>

                <div className="two-g one-g">
                    <div className="one-main" style={{paddingTop:'24px'}}>
                        <div className="main-content" style={{marginLeft:'540px'}}>
                            <div className="goods-info goods2-info">
                                <ul>



                                    {
                                        this.state.item1.map(json=>{
                                            return<li style={{margin:0,marginBottom:'20px'}} key={json.goodsId}>
                                                <div className="infoImg">

                                                    <img src={json.goodsHerPic} alt=""/>


                                                </div>

                                                    <div className="babyInfo">
                                                        <div className="infoTit1">{json.hotItemName}</div>
                                                        <div className="infoTit2">
                                                            <div><b className="pink"><i>￥</i><span>{json.presentPrice}</span></b></div>

                                                            <div><del>市场价￥{json.marketPrice}</del></div>

                                                        </div>
                                                    </div>


                                            </li>

                                        })
                                    }

                                </ul>
                            </div>

                            <div className="one-pay">
                                <div style={{width:'150px'}}>
                                    <del>￥{this.state.item11.marketPrice}</del>
                                </div>
                                <div style={{width:'377px'}}>美眉专享价: <i>￥</i> <b>{this.state.item11.monthlyPrice}</b> <span>x{this.state.item11.staging}</span></div>

                                <a href={"goods-detail.html?goodsId=" + goodsId1}><div className="_btn btn_btn" style={{padding:'9px'}}>立刻分期</div></a>

                            </div>
                        </div>

                    </div>
                </div>

                <div className="three-g one-g">
                    <div className="one-main" style={{paddingTop:'24px',paddingLeft:'8px'}}>
                        <div className="main-content">
                            <div className="goods-info goods3-info">
                                <ul>



                                    {
                                        this.state.item2.map(json=>{
                                            return<li style={{margin:0,marginBottom:'20px'}} key={json.goodsId}>
                                                    <div className="infoImg">

                                                        <img src={json.goodsHerPic} alt=""/>


                                                    </div>

                                                        <div className="babyInfo">
                                                            <div className="infoTit1">{json.hotItemName}</div>
                                                            <div className="infoTit2">
                                                                <div><b className="pink"><i>￥</i><span>{json.presentPrice}</span></b></div>

                                                                <div><del>市场价￥{json.marketPrice}</del></div>

                                                            </div>
                                                        </div>

                                                </li>

                                        })
                                    }

                                </ul>
                            </div>

                            <div className="one-pay">
                                <div style={{width:'150px'}}>
                                    <del>￥{this.state.item22.marketPrice}</del>
                                </div>
                                <div style={{width:'377px'}}>美眉专享价: <i>￥</i> <b>{this.state.item22.monthlyPrice}</b> <span>x{this.state.item22.staging}</span></div>

                                <a href={"goods-detail.html?goodsId=" + goodsId2}><div className="_btn btn_btn" style={{padding:'9px'}}>立刻分期</div></a>

                            </div>
                        </div>

                    </div>
                </div>
                <div className="f-g"></div>
                <div className="five-g"></div>
                <div className="s-g"></div>
                <div className="sv-g"></div>
                <div className="e-g">
                    <div className="e-main">
                        <div className="e-content">

                            <div className="e-t">
                                <div></div>
                                <p style={{display: 'inline-block'}}>她们正在变美</p>
                                <div></div>
                            </div>
                            <div style={{overflow:'hidden'}}>
                                <div className="tab-list">

                                    <table>
                                        <tbody>
                                        {
                                            this.state.data.map((json,i)=>{
                                                return<tr key={i}>
                                                    <td className="wid-10">
                                                        <div style={{width:'61px',height:'61px',borderRadius:'50%'}}>
                                                            <img src={json.sculptureUrl?json.sculptureUrl:''} alt="" style={{width:'100%',borderRadius:'50%'}} /></div>
                                                    </td>
                                                    <td className="wid-30">
                                                        <div>{json.telphone}</div>
                                                    </td>
                                                    <td className="wid-30">
                                                            <div>已预约</div>
                                                    </td>
                                                    <td className="wid-30">
                                                        <div>{this.timeStamp2String(json.createTime)}</div>
                                                    </td>

                                                </tr>

                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
