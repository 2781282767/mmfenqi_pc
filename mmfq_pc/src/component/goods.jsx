'use strict';

class R_Goods extends React.Component {

    constructor() {
        super();
        this.state = {
            json: [],
            t_startTime: '',
            t_endTime: '',

            text: '',
            h: '',
            m: '',
            s: '',
            leftOrRight: '0',


            showMore:false


        };

        this.currentPage=1;

        this.timeConfig = {
            h: '时',
            m: '分',
            style_t: {
                padding: 5, margin: '0 5px',
            },
            style_h: {
                color: '#fd657a', border: '1px solid #e4e4e4', padding: 5, margin: '0 5px', background: '#FFFFff'
            },
            style_s: {
                color: '#fd657a', border: '1px solid #e4e4e4', padding: 5, margin: '0 5px', background: '#FFFFff'
            },
            style_m: {
                color: '#666666', border: '1px solid #e4e4e4', padding: 5, margin: '0 5px', background: '#FFFFff'
            },

            compare: function () {

                var compareTime = new Date();
                if (compareTime.getHours() >= 10) {
                    var time = compareTime.Format('yyyy-MM-dd 23:59:59');
                    return {
                        time: time,
                        text: '距离结束仅剩'
                    };
                }
                var time = compareTime.Format('yyyy-MM-dd 10:00:00');
                return {
                    time: time,
                    text: '距离开始仅剩'
                }
            }
        }


    }


    query(index,start,end){
        HttpService.query({
            url: '/pc/computer/query_flashSaleGoodsList_pc',
            data:{index:index,startTime:start,endTime:end},
            success:(res)=>{

                this.currentPage=index;
                this.totalPage=res.paginator.totalPage;
                if(this.totalPage>this.currentPage){
                    this.setState({showMore:true});
                }else{
                    this.setState({showMore:false});
                }
                this.setState({
                    json: this.state.json.concat(res.flashSaleGoodsItemList)
                })
            }
        })
    }

    today_fast() {
        this.setState({
            leftOrRight: '0'
        });

        var startTime = new Date();
        var today_start = startTime.Format('yyyy-MM-dd 00:00:00');
        var today_end = startTime.Format('yyyy-MM-dd 23:59:59');

        this.query(1,today_start,today_end)


    }

    tm_fast() {
        this.setState({
            leftOrRight: '1'
        });
        var compareTime = new Date(), start, end, tm;
        tm = compareTime.setDate(compareTime.getDate() + 1);
        start = this.timeStamp2String(tm);
        end = this.timeStamp3String(tm);

        this.query(1,start,end)
    }

    more() {
        this.currentPage=this.currentPage+1;
        if(this.state.leftOrRight=='0'){
            var startTime = new Date();
            var today_start = startTime.Format('yyyy-MM-dd 00:00:00');
            var today_end = startTime.Format('yyyy-MM-dd 23:59:59');
            this.query(this.currentPage,today_start,today_end)
        }else if(this.state.leftOrRight=='1'){
            var compareTime = new Date(), start, end, tm;
            tm = compareTime.setDate(compareTime.getDate() + 1);
            start = this.timeStamp2String(tm);
            end = this.timeStamp3String(tm);
            this.query(this.currentPage,start,end)

        }
    }



    timeStamp2String(time) {
        var datetime = new Date();
        datetime.setTime(time);
        var year = datetime.getFullYear();
        var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
        var hour = '00';
        var minute = '00';
        var second = '00';
        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    }

    timeStamp3String(time) {
        var datetime = new Date();
        datetime.setTime(time);
        var year = datetime.getFullYear();
        var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
        var hour = '59';
        var minute = '59';
        var second = '59';
        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    }

    timeStamp4String(time) {

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

    componentWillMount() {

        Date.prototype.Format = function (fmt) { //author: meizz
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        };
        var startTime = new Date(), start, end;
        console.log(startTime);
        var timestamp = Date.parse(new Date()),
            timestamp = timestamp / 1000;
        console.log("当前时间戳为：" + timestamp - 123);
        start = startTime.Format('yyyy-MM-dd 00:00:00');
        end = startTime.Format('yyyy-MM-dd 23:59:59');
        this.setState({
            t_startTime: start,
            t_endTime: end
        });
        this.query(1,start, end);

    }

    render() {

        /*限时价*/
        var style = {
            display: 'inline-block',
            width: 107
        };
        /*原价*/
        var style2 = {
            display: 'inline-block',
            width: 103,
            textAlign: 'right'
        };
        return (
            <div className="goods-main">
                <div className="main"></div>
                <div className="goods-date">
                    <div className="_main">
                        <div className="left">
                            <div className="today-time">
                                {/*<div style={{background: 'none', marginRight: '0'}}>{this.state.text}</div>*/}

                                {/*<div className="ooo"*/}
                                     {/*style={{color: '#fd657a', border: '1px solid #e4e4e4'}}>{this.state.h}</div>*/}
                                {/*时*/}
                                {/*<div className="ooo"*/}
                                     {/*style={{color: '#fd657a', border: '1px solid #e4e4e4'}}>{this.state.m}</div>*/}
                                {/*分*/}
                                {/*<div className="ooo" style={{border: '1px solid #e4e4e4'}}>{this.state.s}</div>*/}

                                <R_TimeOver cxt={this}/>
                            </div>

                            <div style={{color: '#999'}}>每日10：00-24：00 开抢</div>

                        </div>
                        <div className="right">
                            <img src="../static/images/goods/three.png" alt=""/>
                        </div>
                    </div>
                </div>

                <div className="activity-main">
                    <div className="activity-title">
                        {this.state.leftOrRight == 0 ?
                            <div className="left"
                                 onClick={this.today_fast.bind(this)}>
                                <div style={{height: '66px'}}>
                                    <div className="t-content bg">
                                        <div className="today-seckilling">
                                            <p style={{color: '#fff'}}>今日秒杀</p>

                                        </div>
                                    </div>
                                    <div className="_cb"></div>
                                </div>
                            </div>
                            :
                            <div className="left"
                                 onClick={this.today_fast.bind(this)}>

                                <div style={{height: '66px'}}>
                                    <div className="t-content bd2">
                                        <div className="today-seckilling">
                                            <p style={{color: '#000'}}>今日秒杀</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {this.state.leftOrRight == 1 ?

                            <div className="right" onClick={this.tm_fast.bind(this)}>
                                <div style={{height: '66px'}}>
                                    <div className="tm bg">
                                        <div className="tm-seckilling">
                                            <p style={{color: '#fff'}}>明日秒杀</p>

                                        </div>
                                    </div>
                                    <div className="_cb"></div>
                                </div>
                            </div>
                            :
                            <div className="right" style={{width: '50%'}} onClick={this.tm_fast.bind(this)}>
                                <div style={{height: '66px'}}>
                                    <div className="tm bd">
                                        <div className="tm-seckilling">
                                            <p>明日秒杀</p>

                                        </div>
                                    </div>
                                    <div></div>
                                </div>

                            </div>
                        }
                    </div>
                    <div className="activity-content">

                        {
                            this.state.json.map(json=> {
                                return <div className="one" key={json.hotItemName}>
                                    <ul>
                                        {
                                            (Date.parse(new Date()) < json.teamEndTime) && ( Date.parse(new Date()) >= json.teamBeginTime)
                                                ?
                                                <li>
                                                    <a href={"goods-detail.html?goodsId=" + json.goodsHerf}>
                                                        <div className="top-img">
                                                            {/*<img src="../static/images/goods/bit.png" alt=""/>*/}
                                                        </div>

                                                        <div className="img">
                                                            <img src={json.goodsHerPic} alt=""/>
                                                        </div>
                                                        <div className="goods-info">
                                                            <p>{json.hotItemName}</p>
                                                            <div>仅剩:{json.lastNumber}</div>
                                                            <p style={{padding: '10px'}}>
                                                                <span style={style}>限时价: <b>￥{json.temporaryPrice}</b> </span>
                                                                <del style={style2}>原价:￥{json.marketPrice}</del>

                                                            </p>

                                                            <div>{this.timeStamp4String(json.teamBeginTime)}</div>
                                                            <div>{this.timeStamp4String(json.teamEndTime)}</div>

                                                            <div className="bg-img">
                                                                <div className="month-pay">
                                                                    月供:￥{json.monthlyPrice}
                                                                    <spna>x{json.staging}</spna>
                                                                </div>
                                                                <div style={{color: '#fff'}}>
                                                                    立即分期
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>

                                                :

                                                <li>

                                                    <a href={"goods-detail.html?goodsId=" + json.goodsHerf}>

                                                    <div className="top-img">
                                                        {/*<img src="../static/images/goods/bit.png" alt=""/>*/}
                                                    </div>
                                                    <div className="img">
                                                        <img src={json.goodsHerPic} alt=""/>
                                                    </div>
                                                    <div className="goods-info">
                                                        <p>{json.hotItemName}</p>
                                                        <div>仅剩:{json.lastNumber}</div>
                                                        <p style={{padding: '10px'}}>
                                                            <span
                                                                style={style}>限时价: <b>￥{json.temporaryPrice}</b> </span>
                                                            <del style={style2}>原价:￥{json.marketPrice}</del>

                                                        </p>

                                                        <div>{this.timeStamp4String(json.teamBeginTime)}</div>
                                                        <div>{this.timeStamp4String(json.teamEndTime)}</div>

                                                        <div className="bg-img2">
                                                            <div className="month-pay">
                                                                月供:￥{json.monthlyPrice}
                                                                <spna>x{json.staging}</spna>
                                                            </div>

                                                            <div className="active">
                                                                马上开始
                                                            </div>

                                                        </div>

                                                    </div>
                                                        </a>
                                                </li>
                                        }
                                    </ul>

                                </div>

                            })
                        }

                        {
                            this.state.showMore?
                                <div style={{clear:'both',textAlign:'center', margin:'0 auto' }} onClick={this.more.bind(this)}>
                                    <button>查看更多</button>
                                </div>
                                :
                                <div></div>

                        }

                    </div>
                </div>
            </div>
        )

    }
}
