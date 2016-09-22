/**
 * Created by ChinaHp on 2016/8/17.
 */
'use strict';
class R_HospitalActive extends React.Component{
    constructor(){
        super();

        this.state={
            json:[
                {img:'../static/images/hospital-active/doctor.png',id:378},
                {img:'../static/images/hospital-active/doctor2.png',id:379},
                {img:'../static/images/hospital-active/doctor3.png',id:381},
                {img:'../static/images/hospital-active/doctor4.png',id:528},

            ],


            json2:[
                {img:'../static/images/hospital-active/step1.jpg',id:"1F"},
                {img:'../static/images/hospital-active/step2.jpg',id:"2F"},
                {img:'../static/images/hospital-active/step3.jpg',id:"3F"}
            ],

            data:[]

        }
    }
    componentWillMount(){

        HttpService.query({
            url:"/pc/computer/query_alreadyBuy_goodsInfo_by_goodsIdList",
            data:{goodsIdList:'378,379,381,528'},
            success:function (res) {

                console.log(res)
                this.setState({
                    data:res.orderList
                })
            }.bind(this)
        })

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

    componentDidMount() {
        setTimeout(function () {
            $(".bannerImg li:eq(0) img").addClass("now");
        }, 100);
        $(".right").click(function () {

            $(".banner li img").removeClass("now");
            var nIn = $(".bannerImg .current").index();
            if (nIn < $(".bannerImg li").length - 1) {
                nIn++;
            } else {
                nIn = 0;
            }
          //  $(".tabIcon span").eq(nIn).addClass("now").siblings().removeClass("now");
            $(".bannerImg li").eq(nIn).addClass("current").siblings("li").removeClass("current");
            $(".bannerImg li").eq(nIn).fadeIn(200, function () {
                $(this).find("img").fadeIn(200).toggleClass("now");
            });
            $(".bannerImg li").eq(nIn).siblings("li").fadeOut(200);
        });

        $(".left").click(function () {

            $(".banner li img").removeClass("now");
            var nIn = $(".bannerImg .current").index();
            if (nIn < $(".bannerImg li").length && nIn > 0) {
                nIn--;
            } else {
                nIn = $(".bannerImg li").length - 1;
            }
            //  $(".tabIcon span").eq(nIn).addClass("now").siblings().removeClass("now");
            $(".bannerImg li").eq(nIn).addClass("current").siblings("li").removeClass("current");
            $(".bannerImg li").eq(nIn).fadeIn(200, function () {
                $(this).find("img").fadeIn(200).toggleClass("now");
            });
            $(".bannerImg li").eq(nIn).siblings("li").fadeOut(200);
        });
    }
    render(){
        return(
            <div className="hospital-wrap">
                <div className="theme"></div>
                <div className="doctor">

                </div>

                <div className="banner">
                    <div className="bannerImg">
                        <ul className="inner">
                            {
                                this.state.json.map((item,index)=>{
                                   return (
                                       <li id="_F" key={index} style={{display:'block'}} className={index==0?'current':''}>
                                           <img  src={item.img} alt=""/>
                                           <a href={"goods-detail.html?goodsId="+item.id} target="_blank" ><span className="button"></span></a>
                                       </li>
                                   )
                                })
                            }
                        </ul>
                        <span className="left" style={{cursor: 'pointer'}}></span>
                        <span className="right" style={{cursor: 'pointer'}}></span>
                    </div>
                </div>

                <div className="t1"></div>

                <div className="selects">
                    <div className="t3"></div>
                    <div style={{width:'100%',height:50,background:'#fff'}}></div>
                    <div className="banner2">
                        <div className="bannerImg2">
                            <ul className="inner">

                                {
                                    this.state.json2.map((item,index)=>{
                                        return (
                                            <li id={item.id} key={index} style={{display:'block'}}>
                                                <img src={item.img} alt=""/>
                                                <a href="#_F" ><span className="button"></span></a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <div className="tabIcon">
                                <div className="aa">
                                    <a href="#1F" ><div className="one_active"></div></a>
                                    <a href="#2F" ><div className="two_active"></div></a>
                                    <a href="#3F" ><div className="three_active"></div></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="step5"></div>
                <div className="step6"></div>

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
                                                        <div style={{width:'42px',height:'42px',borderRadius:'50%'}}>
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
                    <div className="company">
                        本活动最终解释权归杭州优呗网络科技公司所有
                    </div>
                </div>
            </div>
        )
    }
}
