/**
 * Created by sheldon on 2016/8/1.
 */
'use strict';

class R_OrderEnsure extends React.Component {

    componentWillMount() {
        this.order = JSON.parse(window.localStorage.orderData);
        console.log(this.order);
    }
    createOrderConfirm() {
        var orderData = this.order;

        $.ajax({
            type: 'post',
            url: '/pc/computer/user_goods_confirm_order',
            data: orderData,
            dataType: 'json',
            success: (res)=> {
                console.log(res);
                if (res.result == 0) {
                    var locationSearchString = '?';
                    var order = res.data.goodsConfirmOrderResponse.order;
                    console.log(JSON.stringify(res.data.goodsConfirmOrderResponse));
                    window.localStorage.midOrder = JSON.stringify(res.data.goodsConfirmOrderResponse);
                    var user = res.data.goodsConfirmOrderResponse.userInfo;
                    locationSearchString = locationSearchString + 'orderId=' + order.orderId +
                        '&orderNo=' + order.orderNo + '&orderName=' + order.orderName +
                        '&downpayAmount=' + (order.downpayAmount + (res.data.goodsConfirmOrderResponse.isInsuranceBuy ? parseInt(res.data.goodsConfirmOrderResponse.insuranceAmount) : 0)) + '&creditPay=' + res.data.goodsConfirmOrderResponse.creditPayment +
                        '&telephone=' + user.telephone + '&startPhone=' + user.telephone.substring(0, 3) + "****" + user.telephone.substring(7, 11);
                    window.location.href = ('my-order-detail.html' + locationSearchString);
                } else if (res.result == 1013) {
                    window.location.href = 'login.html';
                    window.localStorage.referer = window.location.href;
                } else if(res.result== 6) {

                    alert(res.msg);
                    window.location.href = 'my-credit.html';
                } else {
                    alert(res.msg);
                }
            }
        });
    }

    render() {

        return (
            <div
                style={{flexGrow:'1',width:'100%',backgroundRepeat:'no-repeat',backgroundSize:'100% 100%',minHeight: 780,display:'flex',flexDirection:'column',justifyContent:'center'}}>
                <div className="wrap" style={{width: 1000}}>
                    <div style={{backgroundColor: '#fff',height: 650,width:998,border:'1px solid #e2e2e2'}}>
                        <div
                            style={{height: 48,borderBottom:'1px solid #e2e2e2',backgroundColor:'#FCFCFC',textIndent:'24px',lineHeight:'48px',fontSize:'16px'}}>
                            确认项目信息
                        </div>
                        <div style={{height:600,width:958,padding: 20}}>
                            <div style={{fontSize:'14px',fontWeight:'bolder',margin:'5px 0'}}>
                                项目信息
                            </div>
                            <table className="orderTable"
                                   style={{width: 958,border: '1px solid #eee',textAlign: 'center'}}>
                                <tbody>
                                <tr style={{height: 30}}>
                                    <th>
                                        项目名称
                                    </th>
                                    <th>
                                        价格
                                    </th>
                                    <th>
                                        数量
                                    </th>
                                    <th>
                                        总价
                                    </th>
                                </tr>
                                <tr style={{height: 60}}>
                                    <td>
                                        {this.order.orderName}
                                    </td>
                                    <td>
                                        {this.order.fenqiObj.shoufuId != 0 ? this.order.fenqiObj.shoufu*100/this.order.fenqiObj.shoufuId : this.order.orderAmount}
                                    </td>
                                    <td>
                                        1
                                    </td>
                                    <td>
                                        {this.order.fenqiObj.shoufuId != 0 ? this.order.fenqiObj.shoufu*100/this.order.fenqiObj.shoufuId : this.order.orderAmount}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            {
                                this.order.isInsuranceBuy ?
                                    <div>
                                        <div style={{backgroundColor:'#eee',height:1,width:958,margin: '20px 0'}}></div>
                                        <div style={{fontSize:'14px',fontWeight:'bolder',margin:'5px 0'}}>
                                            保险
                                        </div>
                                        <div>
                                            {this.order.insuranceAmount}元
                                        </div>
                                    </div>
                                    :
                                    ''
                            }
                            <div style={{backgroundColor:'#eee',height:1,width:958,margin: '20px 0'}}></div>
                            <div style={{fontSize:'14px',fontWeight:'bolder',margin:'5px 0'}}>
                                分期方式
                            </div>
                            <div>
                                <table className="orderTable" style={{width: 958,textAlign: 'center'}}>
                                    <tbody>
                                    <tr style={{height: 30}}>
                                        <th>
                                            首付比例
                                        </th>
                                        <th>
                                            首付金额(元)
                                        </th>
                                        <th>
                                            信用支付(元)
                                        </th>
                                        <th>
                                            分期数
                                        </th>
                                        <th>
                                            月供(元)
                                        </th>
                                    </tr>
                                    <tr style={{height: 100}}>
                                        <td>
                                            {this.order.fenqiObj.shoufuId}%
                                        </td>
                                        <td>
                                            {this.order.fenqiObj.shoufu}元
                                        </td>
                                        <td style={{color: '#25a9f4'}}>
                                            -{this.order.fenqiObj.shoufuId != 0 ? this.order.fenqiObj.shoufu*(100-this.order.fenqiObj.shoufuId)/(this.order.fenqiObj.shoufuId) : this.order.orderAmount}
                                        </td>
                                        <td>
                                            {this.order.fenqiObj.paymentId}月
                                        </td>
                                        <td>
                                            <p style={{color: '#ff6678'}}>{this.order.fenqiObj.yuefu}</p>
                                            <p style={{color: '#999'}}>(包含服务费{this.order.fenqiObj.interest}元/月)</p>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div style={{backgroundColor:'#eee',height:1,width:958,margin: '20px 0'}}></div>
                            <div style={{fontSize:'14px',fontWeight:'bolder',margin:'5px 0'}}>
                                分期计算器
                            </div>
                            <div style={{textAlign:'right'}}>
                                <div>
                                    自付金额：<span style={{color:'#ff6678'}}>{this.order.fenqiObj.shoufu+parseFloat(this.order.isInsuranceBuy ? this.order.insuranceAmount : 0)}</span>元
                                </div>
                                <div>
                                    信用支付金额：<span style={{color:'#25a9f4'}}>-{this.order.fenqiObj.shoufuId != 0 ? this.order.fenqiObj.shoufu*(100-this.order.fenqiObj.shoufuId)/(this.order.fenqiObj.shoufuId) : this.order.orderAmount}</span>元
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{float:'right'}}>
                        <div onClick={this.createOrderConfirm.bind(this)}
                            style={{padding: 10,backgroundColor: '#FD657A',color: 'white',fontSize:'16px',width:'80px',margin: '15px 0',textAlign:'center'}}>
                            确认支付
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
