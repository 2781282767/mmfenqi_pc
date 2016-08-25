'use strict';
class R_MyBill extends React.Component{

    constructor(){
        super();
        this.state={
            data:[],
            myBillResponse:[],
            isOpen:'',
            repaymentedBill:'',//出现已还完
            length:'-1'
        }
    }

    componentWillMount(){
        if(!$.cookie('appToken')){
            window.location.href = 'login.html'
        }
    }

    myBill(periodType) {

        $('.top ul li').eq(periodType).addClass('color_fd5').siblings('li').removeClass('color_fd5');



        if(periodType=='2'){//全部还款

            this.setState({
                isOpen:'0',
                repaymentedBill:'1'
            });


            $.ajax({
                type: 'post',
                url: '/pc/computer/repaymented_bill',
                dataType: 'json',
                success: (data)=> {
                    console.log('+++');
                    console.log(data);
                    if (data.result == 1013){
                        window.location.href = 'login.html'
                    }else if(data.result==0){
                        console.log(data);
                        this.setState({
                            data: data.data,
                            myBillResponse: data.data.myBillResponse,
                            length:data.data.billNum,
                        })
                    }

                }

            });

        }else if(periodType=='0'){//本期
            let jsonData = {
                periodType:periodType,
            };
            $.ajax({
                type: 'post',
                url: '/pc/computer/user_bill',
                data: jsonData,
                dataType: 'json',
                success: (data)=> {
                    console.log(data);
                    if (data.result == 1013){
                        window.location.href = 'login.html'
                    }else if(data.result==0){
                        this.setState({
                            data: data.data,
                            myBillResponse: data.data.myBillResponse,
                            length:data.data.billNum,
                            isOpen:'1',
                            repaymentedBill:'0'
                        })
                    }

                }

            })
        }else if(periodType=='1'){//下期
            let jsonData = {
                periodType:periodType,
            };
            $.ajax({
                type: 'post',
                url: '/pc/computer/user_bill',
                data: jsonData,
                dataType: 'json',
                success: (data)=> {
                    console.log(data);
                    if (data.result == 1013){
                        window.location.href = 'login.html'
                    }else if(data.result==0){
                        this.setState({
                            data: data.data,
                            myBillResponse: data.data.myBillResponse,
                            length:data.data.billNum,

                            isOpen:'0',
                            repaymentedBill:'0'
                        })
                    }

                }

            })
        }


    }

    /*立即还款*/
    pay(id){
        if(id instanceof Array){
            var b = id.join(",");
            var repaymentPlanId=b;
        }else {
            var repaymentPlanId=id;
        }
        let jsonData={
            repaymentPlanId:repaymentPlanId,
        };

        $.ajax({
            type: 'post',
            url: '/pc/computer/repayment',
            data: jsonData,
            dataType: 'json',
            success: (data)=> {

                console.log(data);
                var bill_amount=data.data.bill_amount;
                var orderId=data.data.orderId;
                var orderStr=data.data.orderStr;

                window.open('my-pay.html?bill_amount='+bill_amount+'&orderId='+orderId+'&orderStr='+orderStr+'');

                // window.open('my-detail.html?id=' + id + '');
            }

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

    getType(orderStatus) {
        switch (orderStatus) {
            case '0':
                return '还款中';
                break;
            case '1':
                return '已还款';
                break;
            case '2':
                return '延期还款';
                break;
            case '3':
                return '逾期还款';
                break;
            default:
                return '无'
        }
    }

    componentDidMount() {
        this.myBill('0');

    }
    render(){
        var data=this.state.data;
        var length=this.state.length;
        console.log(length);

        console.log(this.state.myBillResponse);

        return (
            <div style={{float:'left'}}>
                <div className="wrap-content">
                    <div className="wrap-content-right">
                        <div>
                            <div className="top">
                                <ul>
                                    <li className="color_fd5" onClick={this.myBill.bind(this,'0')}>本期账单</li>
                                    <li onClick={this.myBill.bind(this,'1')}>下期账单</li>
                                    <li onClick={this.myBill.bind(this,'2')}>已全部还款账单</li>
                                </ul>
                            </div>

                            {
                                length=='-1'

                                ?

                                    <div></div>
                                    :
                                    (

                                    length=='0'
                                ?

                                        <div className="month-content">
                                            <div style={{width:'150px',float:'left','minHeight': 500}}>
                                                <ul>
                                                    <li>亲，暂还没有账单哦！</li>
                                                </ul>
                                            </div>

                                        </div>
                                        :

                                        <div className="month-content" style={{display:(this.state.isOpen=='1'&& this.state.data.billNum!='0') ? 'block':'none'}}>
                                            <div style={{width:'150px',float:'left'}}>
                                                <ul>
                                                    <li>本月，共 <span>{this.state.data.billNum}</span>笔账单</li>
                                                    <li>待还款 <span>￥{this.state.data.payBillAmount}</span></li>
                                                </ul>
                                            </div>
                                            <div className="_btn btn_btn" onClick={this.pay.bind(this,this.state.data.payBillId)} style={{float:'left','marginTop':'33px'}}>
                                                立即还款
                                            </div>
                                        </div>



                                    )

                            }







                            {
                                this.state.myBillResponse.map((json=>{
                                    return <div className="top-content" key={json.repaymentPlanId}>
                                        <div className="one">
                                            <div className="sub-content">
                                                <ul>
                                                    <li>距离还款日仅剩: <span style={{color:'#fc6578',fontSize:'12px'}}>{json.to_repayment_date}天</span></li>
                                                    <li>期数: <b>{json.staging}</b></li>
                                                    <li>到期时间: <b>{json.expiredTime}</b></li>
                                                    <li style={{display:json.repayment_status==1?'inline-block':'none'}}>还款状态: <b>{this.getType(json.repayment_status)}</b> </li>
                                                    <li style={{display:json.repayment_status==2?'inline-block':'none'}}>还款状态: <b>{this.getType(json.repayment_status)}</b> </li>
                                                    <li style={{display:json.repayment_status==0?'inline-block':'none'  }}>还款状态: <span style={{color:'#ff682c',fontSize:'12px'}}>{this.getType(json.repayment_status)}</span> </li>
                                                    <li style={{display:json.repayment_status==3?'inline-block':'none'}}>还款状态: <span style={{color:'#ff65da',fontSize:'12px'}}>{this.getType(json.repayment_status)}</span> </li>
                                                </ul>
                                                <ul>
                                                    <li style={{width:'70px'}}>商品名称: <b></b>   </li>
                                                    <li style={{width:'260px',paddingRight:'78px',color:'#7fa9d3'}}>{json.goodsName}</li>
                                                    <li>订单号: <b style={{color:'#7fa9d3'}}>{json.orderNo}</b></li>
                                                    <li>所属医院: <b>{json.hosName}</b> </li>
                                                </ul>
                                                {
                                                    this.state.repaymentedBill==''?
                                                        <div></div>
                                                        :
                                                        this.state.repaymentedBill==1?
                                                            <div className="repaymented_bill"><img src="../static/images/repaymented_bill.png"/></div>
                                                            :

                                                            <div></div>

                                                }
                                            </div>

                                            <div className="refund">

                                                <div>

                                                    <p>本期账单应付: <span>￥{json.payAmount}</span> </p>
                                                </div>
                                                <div style={{color:'#9e9e9e'}}>
                                                    应付明细:{json.payAmount}+{json.overBreachAmount} (逾期费)
                                                </div>

                                                <div className="btn" style={{display:this.state.isOpen=='1' ? 'inline-block':'none'}}>
                                                    <div  className="_btn btn_btn" onClick={this.pay.bind(this,json.repaymentPlanId)}>立即还款</div>

                                                </div>
                                            </div>

                                            <div>
                                                <table cellSpacing="0"  cellPadding="0">
                                                    <thead>
                                                    <tr>
                                                        <th>分期金额(元)</th>
                                                        <th>分期数</th>
                                                        <th>到期时间</th>
                                                        <th>实际还款时间</th>
                                                        <th>还款状态</th>
                                                    </tr>
                                                    </thead>

                                                    {json.billStageList.map((list=>{
                                                        return<tbody className="bg_bd" key={list.id}>

                                                        <tr>
                                                            <td>
                                                                <li>￥{list.payAmount} <span>(包含逾期费:{list.overBreachAmount})</span></li>
                                                            </td>
                                                            <td>
                                                                <li>{list.staging}</li>
                                                            </td>
                                                            <td>
                                                                <li>{this.timeStamp2String(list.payTime)}</li>
                                                            </td>
                                                            <td>
                                                                <li>{list.actualPayTime==null? '-':this.timeStamp2String(list.actualPayTime)}</li>
                                                            </td>
                                                            <td>
                                                                <li>{this.getType(list.status)}</li>
                                                            </td>

                                                        </tr>
                                                        </tbody>

                                                    }))}
                                                </table>
                                            </div>
                                            {
                                                this.state.repaymentedBill=='1'?
                                                    <div></div>
                                                    :
                                                    <div className="page_foot">
                                                        <div></div>
                                                        <div>共 <span>{json.orderSurplusNum}</span>个账单，本期还款总额: <span>￥{json.orderSurplusPrice}</span></div>

                                                        <div className="pay_type">
                                                            <div onClick={this.pay.bind(this,json.orderSurplusId)}>全部还清</div>
                                                        </div>

                                                    </div>



                                            }


                                        </div>


                                    </div>
                                }))
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
