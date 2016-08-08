/**
 * Created by sheldon on 2016/7/11.
 */
'use strict';

class R_SaleGoods extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sales: []
        }
    }

    componentWillMount() {
        this.getFlashSale();
    }

    getFlashSale() {
        $.ajax({
            type: 'post',
            url: '/pc/computer/query_index_flash_sale_goodsItem',
            dataType: 'json',
            success: (res)=> {
                console.log(res);
                if (res.result == 0) {
                    this.setState({sales: res.data.flashSaleGoodsItemList})
                }
            }
        })
    }

    render() {


        return<div className="activity-main">



        <div className="activity-content">

            {
                this.state.sales.map(json=> {


                    return <div className="one" key={json.hotItemName}>
                        <ul>


                            {
                                (Date.parse(new Date()) < json.teamEndTime) && ( Date.parse(new Date()) >= json.teamBeginTime)
                                    ?


                                    <li>
                                        <a href={"goods-detail.html?goodsId=" + json.goodsHerf}>
                                            <div className="top-img">
                                                <img src="../static/images/goods/bit.png" alt=""/>
                                            </div>

                                            <div className="img">
                                                <img src={json.goodsHerPic} alt=""/>
                                            </div>
                                            <div className="goods-info">
                                                <p>{json.hotItemName}</p>
                                                <div>仅剩:{json.lastNumber}</div>
                                                <p style={{padding: '10px'}}>
                                                        <span
                                                            style={{marginRight: '30px'}}>限时价: <b>￥{json.temporaryPrice}</b> </span>
                                                    <del>原价:￥{json.marketPrice}</del>

                                                </p>

                                                {/*<div>{this.timeStamp4String(json.teamBeginTime)}</div>*/}
                                                {/*<div>{this.timeStamp4String(json.teamEndTime)}</div>*/}




                                                <div className="bg-img">
                                                    <div className="month-pay">
                                                        月供:￥{json.monthlyPrice}
                                                        <spna>x12</spna>
                                                    </div>


                                                    <div style={{color:'#fff'}}>

                                                        立即分期
                                                    </div>



                                                </div>


                                            </div>
                                        </a>
                                    </li>

                                    :

                                    <li>

                                        <div className="top-img">
                                            <img src="../static/images/goods/bit.png" alt=""/>
                                        </div>

                                        <div className="img">
                                            <img src={json.goodsHerPic} alt=""/>
                                        </div>
                                        <div className="goods-info">
                                            <p>{json.hotItemName}</p>
                                            <div>仅剩:{json.lastNumber}</div>
                                            <p style={{padding: '10px'}}>
                                                        <span
                                                            style={{marginRight: '30px'}}>限时价: <b>￥{json.temporaryPrice}</b> </span>
                                                <del>原价:￥{json.marketPrice}</del>

                                            </p>

                                            {/*<div>{this.timeStamp4String(json.teamBeginTime)}</div>*/}
                                            {/*<div>{this.timeStamp4String(json.teamEndTime)}</div>*/}




                                            <div className="bg-img2">
                                                <div className="month-pay">
                                                    月供:￥{json.monthlyPrice}
                                                    <spna>x12</spna>
                                                </div>

                                                <div className="active">
                                                    马上开始
                                                </div>


                                            </div>


                                        </div>

                                    </li>
                            }
                        </ul>

                    </div>

                })
            }

            </div>
        </div>


    }
}
