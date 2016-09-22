/**
 * Created by sheldon on 2016/7/19.
 */
'use strict';

class R_AllOrder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            myOrderResponse: [],
            abc: [],
            paid_number: '',// 待支付数量
            completed_number: '',// 已支付数量
            using_number: '', //已完成数量
            cancel_number: '', //已取消数量
            refund_number: '',//refund_number
            id: '',
            pic_img: [],

            length: '-1',
            index: 1,//上传所需

            blockOrnone: false


        };


        this.config = {
            width: '400px',
            height: '400px',
            position: 'fixed',
            zIndex: 10,
            marginLeft: '-200px',
            left: '50%',
            top: '50%',
            marginTop: '-200px',
        };

        this.content = {
            position: 'relative',
            backgroundColor: '#FFFFff',
            minHeight: 100,
            textAlign: 'left'
        };


    }

    loadComments(orderStatus) {
        if (orderStatus == '-1') {
            $('.top ul li').eq(0).addClass('color_fd').siblings('li').removeClass('color_fd')
        } else {

            $('.top ul li').eq(orderStatus).addClass('color_fd').siblings('li').removeClass('color_fd');
        }

        let jsonData = {
            orderStatus: orderStatus
        };
        $.ajax({
            type: 'post',
            url: '/pc/computer/query_my_order',
            data: jsonData,
            dataType: 'json',
            success: (data)=> {
                console.log(data);
                this.setState({
                    data: data,
                    myOrderResponse: data.data.myOrderResponse,
                    paid_number: data.data.paid_number,
                    completed_number: data.data.completed_number,
                    using_number: data.data.using_number,
                    cancel_number: data.data.cancel_number,
                    refund_number: data.data.refund_number,
                    length: data.data.myOrderResponse.length
                });
            }

        });
    }

    detail(id) {
        window.open('my-detail.html?id=' + id + '');
    }

    componentDidMount() {
        this.loadComments('-1');
    }

    getType(orderStatus) {
        switch (orderStatus) {
            case '1':
                return '待支付';
                break;
            case '2':
                return '已支付';
                break;
            case '3':
                return '已完成';
                break;
            case '4':
                return '已取消';
            case '5':
                return '退款审核中';
            case '6':
                return '退款成功'
        }
    }


    /*取消订单*/

    cancel_order(id) {

        this.setState({
            blockOrnone: true
        });
        this.config = {
            issure: false,
            iscancle: false,
            img: '../../build/static/images/ca_od.jpg',
            text: '确认取消订单?',
            yescb: ()=> {
                var jsonData = {
                    orderId: id,
                };

                $.ajax({
                    url: '/pc/computer/cancel_order',
                    type: 'post',
                    data: jsonData,
                    dataType: 'json',
                    success: (res)=> {
                        if (res.result == '0') {
                            this.setState({
                                blockOrnone: false
                            });

                            window.location.reload();
                        }
                    }
                })
            },
            nocb: (blockOrnone)=> {
                this.setState({
                    blockOrnone: blockOrnone
                });
            }
        };

    }

    /*去支付*/
    toPay(id) {
        $.ajax({
            url: '/pc/computer/to_pay_order',
            type: 'post',
            data: {orderId: id},
            dataType: 'json',
            success: function (res) {
                if (res.result == '0') {
                    console.log(res);

                    window.location.target="_blank";
                    window.location.href='my-order-detail.html?orderId=' + res.data.orderInfo.orderId + '&orderNo=' + res.data.orderInfo.orderNo + '&orderName=' + res.data.orderInfo.orderName + '&downpayAmount=' + res.data.orderInfo.downpayAmount + '&creditPay=' + res.data.orderInfo.creditPay + '&telephone=' + res.data.orderInfo.telephone + '&startPhone=' + res.data.orderInfo.starPhone + '';
                }
            }.bind(this)
        })

    }

    render() {
        console.log(this.state.pic_img);
        console.log(this.state.blockOrnone);
        var length = this.state.length;
        return (

            <div style={{float: 'left'}}>

                <R_Flex config={this.config} blockOrnone={this.state.blockOrnone}/>

                <div className="wrap-content">
                    <div className="wrap-content-right">
                        <div>
                            <div className="top">
                                <ul>
                                    <li className="color_fd" onClick={this.loadComments.bind(this, '-1')}>所有订单</li>
                                    <li onClick={this.loadComments.bind(this, '1')}>待支付 <span
                                        style={{display: this.state.paid_number == 0 ? 'none' : 'inline-block'}}>({this.state.paid_number})</span>
                                    </li>
                                    <li onClick={this.loadComments.bind(this, '2')}>已支付 <span
                                        style={{display: this.state.completed_number == 0 ? 'none' : 'inline-block'}}>({this.state.completed_number})</span>
                                    </li>
                                    <li onClick={this.loadComments.bind(this, '3')}>已完成 <span
                                        style={{display: this.state.using_number == 0 ? 'none' : 'inline-block'}}>({this.state.using_number})</span>
                                    </li>
                                    <li onClick={this.loadComments.bind(this, '4')}>已取消 <span
                                        style={{display: this.state.cancel_number == 0 ? 'none' : 'inline-block'}}>({this.state.cancel_number})</span>
                                    </li>
                                    <li onClick={this.loadComments.bind(this, '5')}>退款/售后 <span
                                        style={{display: this.state.refund_number == 0 ? 'none' : 'inline-block'}}>({this.state.refund_number})</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="top-content">


                                {
                                    length == -1
                                        ?

                                        <div></div>

                                        :

                                        length == 0

                                            ?

                                            <div>
                                                <div style={{width: '150px', float: 'left', 'minHeight': 500}}>
                                                    <ul>
                                                        <li style={{'paddingTop': 10}}>亲，暂还没有订单哦！</li>

                                                    </ul>
                                                </div>
                                            </div>

                                            :

                                            <div>

                                                <table cellSpacing="0" cellPadding="0" width="100%"
                                                       style={{border: '0'}}>
                                                    <thead>
                                                    <tr>
                                                        <th style={{width: 346}}>商品</th>
                                                        <th style={{width: 108}}>首付金额(元)</th>
                                                        <th style={{width: 80}}>分期数</th>
                                                        <th style={{width: 128}}>信用支付(元)</th>
                                                        <th style={{width: 123}}>订单状态</th>
                                                        <th style={{width: 133}}>操作</th>
                                                    </tr>
                                                    </thead>

                                                    {
                                                        this.state.myOrderResponse.map((data)=> {
                                                            return <tbody key={data.orderId}>
                                                            <tr>
                                                                <td style={{collapse: 6}} className="_order">
                                                                    <div className="order-no">订单号:{data.orderNo}</div>
                                                                </td>
                                                            </tr>
                                                            <tr className="bg_bd">
                                                                <td>
                                                                    <div className="goods-info">
                                                                        <div className="goods-info-left">
                                                                            <img src={data.goodsPic} width="100%"
                                                                                 height="100%"/></div>
                                                                        <div className="goods-info-right">
                                                                            <li>{data.goodsName}</li>
                                                                            <li>{data.hospital}</li>
                                                                            <li>单价:￥{data.orderPrice}</li>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <li>{data.downpayAmount}</li>
                                                                </td>
                                                                <td>
                                                                    <li>{data.staging}</li>
                                                                </td>
                                                                <td>
                                                                    <li>{data.creditPay}</li>
                                                                </td>
                                                                <td>
                                                                    <li>{this.getType(data.orderStatus)}</li>

                                                                    <li className="color_999"
                                                                        onClick={this.detail.bind(this, data.orderId)}>
                                                                        订单详情
                                                                    </li>
                                                                </td>
                                                                <td>
                                                                    {/*<li><a className="pay">上传知情同意书</a></li>*/}

                                                                    <li className={data.orderStatus == '2'}>
                                                                        {/*<a href="#" className="pay" style={{display:data.projectReviewStatus==0? 'inline':'none'}} onClick={this._uploadBtn.bind(this,data.orderId)}>上传知情同意书</a>*/}

                                                                        <R_Upload
                                                                            projectReviewStatus={data.projectReviewStatus}
                                                                            orderId={data.orderId}/>


                                                                        <a href="#" className=""
                                                                           style={{display: data.projectReviewStatus == 1 ? 'inline' : 'none'}}>知情同意书待审核</a>

                                                                        <a href="#" className=""
                                                                           style={{display: data.projectReviewStatus == 3 ? 'inline' : 'none'}}>知情同意书审核不通过</a>

                                                                        <a href="#" className=""
                                                                           style={{display: data.projectReviewStatus == 2 ? 'inline' : 'none'}}>知情同意书审核通过</a>
                                                                    </li>


                                                                    <li className={data.orderStatus == '3' && data.isCanBuy == true}>
                                                                        <a href={"goods-detail.html?goodsId=" + data.goodsId}
                                                                           target="_blank">再去购买</a>
                                                                    </li>
                                                                    {/*<li className ={data.orderStatus == '3'}>*/}
                                                                    {/*<a href="my-evaluate.html">去评价</a>*/}
                                                                    {/*</li>*/}


                                                                    <li className={ data.orderStatus == '4' && data.isCanBy == true}>
                                                                        <a href={"goods-detail.html?goodsId=" + data.goodsId}
                                                                           target="_blank">重新购买</a>
                                                                    </li>


                                                                    <li className={ data.orderStatus == '1'}>
                                                                        <a href="#" className="pay"
                                                                           onClick={this.toPay.bind(this, data.orderId)}>去支付</a>
                                                                    </li>

                                                                    <li className={ data.orderStatus == '1'}>
                                                                        <a href="#"
                                                                           onClick={this.cancel_order.bind(this, data.orderId)}>取消订单</a>
                                                                    </li>
                                                                </td>
                                                            </tr>
                                                            </tbody>


                                                        })
                                                    }

                                                </table>

                                            </div>

                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
