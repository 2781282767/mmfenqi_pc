/**
 * Created by sheldon on 2016/8/8.
 */
'use strict';

class R_HotGoods extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sales: [],
            state: 0
        }
    }

    componentWillMount() {
        this.getPorpularGoods();
    }

    getPorpularGoods() {
        $.ajax({
            type: 'post',
            url: '/pc/computer/query_index_hot_category_goodsItem',
            dataType: 'json',
            success: (res)=> {
                console.log(res);
                if (res.result == 0) {
                    this.setState({sales: res.data.hotCategoryGoodsList})
                }
            }
        })
    }

    changeState(index) {
        this.setState({
            state: index
        })
    }

    render() {

        var _this = this;

        var title = this.state.sales.map(function (item, index) {
            return (
                <span onClick={_this.changeState.bind(_this, index)}
                      style={{padding: '0 20',color:index == (_this.state.state) ? '#FD657A' : '#666',cursor: 'pointer',fontSize:'16px'}} key={index}>
                    {item.categoryName}
                </span>
            )
        });

        var data = !!this.state.sales[this.state.state] ? this.state.sales[this.state.state] : {goodsItemList: []};

        var goods = data.goodsItemList.map(function (item, index) {

            if (index > 7) {
                return
            }

            return (
                <div key={index}
                     style={{marginBottom: 8,marginRight: 13,float: 'left',width: 218,height: 283,border: '1px solid #dfdfdf'}}>
                    <a href={'goods-detail.html?goodsId=' + item.goodsHerf} target="_blank">
                        <div style={{height: 200,width: 218}}>
                            <img src={item.goodsHerPic}
                                 style={{height: '190px',width: '190px',marginLeft:13,marginTop: 10}}/>
                        </div>
                        <div
                            style={{height: 73, width: 192,paddingTop: 10,paddingLeft: 13,paddingRight: 13}}>
                            <div style={{fontSize:'14px',color:'#333',height: 36,overflow: 'hidden'}}>
                                {item.hotItemName}
                            </div>
                            <div>
                            <span style={{float: 'left',color:'#FD657A',fontSize:'20px',marginTop: 5}}>
                                ￥{item.monthlyPrice}X{item.staging}
                            </span>
                            <span style={{float: 'right',marginTop: 12,fontSize: 14,color:'#a1a1a1',textDecoration:'line-through' }}>
                                ￥{item.marketPrice}
                            </span>
                            </div>
                        </div>
                     </a>
                </div>
            )
        });

        return (
            <div className="boxItem2 wrap clearfix hoverTab" style={{borderRight: 0,borderBottom: 0}}>
                <div style={{textAlign: 'center',color: '#666'}}>
                    {title}
                </div>
                <ul style={{display:'block',marginTop: 20}}>
                    <div style={{float: 'left',width:281,height:578,border: 0}}>
                        <a href={!!data.categoryActivities ? data.categoryActivities.linkHerf : ''} target="_blank">
                            <img src={!!data.categoryActivities ? data.categoryActivities.linkHerPic : ''}
                                 style={{width: '100%',height: '100%',border:0}} alt="活动图片"/>
                        </a>
                    </div>
                    <div style={{height:578,width:935,float:'left'}}>
                        {goods}
                    </div>
                </ul>
            </div>
        )
    }
}