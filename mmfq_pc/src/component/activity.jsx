/**
 * Created by sheldon on 2016/8/9.
 */
'use strict';

class R_ActivityComponet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowMore: (this.props.goods.length < 6)
        }
    }

    showMore() {
        this.setState({
            isShowMore: true
        })
    }

    render() {
        var goods = this.props.goods.map((item, index)=>{

            if (!this.state.isShowMore){
                if (index > 5){
                    return
                }
            }

            return (
                <div key={index} style={{paddingBottom: 20,display: 'inline-block',marginLeft: 20}}>
                    <a href={'goods-detail.html?goodsId='+item.goodsHerf}>
                        <div style={{height:414,width:360,border:'2px solid #e7bff0',borderRadius:'5px'}}>
                            <div style={{width:'100%',height:224}}>
                                <img src={item.goodsHerPic} style={{width:'100%',height: '100%'}}/>
                            </div>
                            <div
                                style={{height: 72,width: '100%',backgroundColor:'#eee',overflow: 'hidden',fontSize: 24,color: '#333'}}>
                                {item.hotItemName}
                            </div>
                            <div style={{height: 62, width:'100%',fontSize:18,backgroundColor: '#fff'}}>
                                <div style={{float: 'left',width:'50%'}}>
                                    <div style={{paddingTop: 10,paddingLeft: 10,color: '#666'}}>
                                        原价:￥{item.marketPrice}
                                    </div>
                                    <div style={{paddingLeft: 10,color: '#000',fontWeight: 'bolder'}}>
                                        现价:￥{item.presentPrice}
                                    </div>
                                </div>
                                <div style={{float: 'left',width:'50%',fontWeight:'bolder',color: '#FE2275'}}>
                                    <div style={{paddingTop: 10,paddingLeft: 10}}>
                                        分期价
                                    </div>
                                    <div style={{paddingLeft: 10}}>
                                        ￥{item.monthlyPrice}X{item.staging}期
                                    </div>
                                </div>
                            </div>
                            <div
                                style={{height: 56,width: '100%',backgroundColor:'#fe2275',borderBottomRightRadius:'3px',borderBottomLeftRadius: '3px',textAlign: 'center',fontSize: 30,color: '#fff',lineHeight: '50px'}}>
                                立即分期
                            </div>
                        </div>
                    </a>
                </div>
            )
        });

        return (
            <div>
                <div style={{paddingTop: 48,marginBottom: 48,textAlign: 'center'}}>
                    <img src={this.props.banner} style={{width:'938px',height: 'auto'}}/>
                </div>
                <div style={{width: 1130,margin: 'auto'}}>
                    <div style={{marginBottom: 20,textAlign: 'left'}}>
                        <div
                            style={{width: 210,height: 58,lineHeight:'55px',backgroundColor: '#0199c5',borderRadius:'10px',textAlign: 'center',fontSize:'40px',color: '#fff'}}>
                            {this.props.title}
                        </div>
                    </div>
                    <div style={{marginBottom: 20,backgroundColor:'#0199c5',width: 1128,height: 2}}>
                    </div>
                </div>
                <div style={{width: 1172,margin: 'auto',minHeight: 40}}>
                    {goods}
                </div>
                {
                    this.state.isShowMore ?
                        ''
                        :
                        <div
                            style={{textAlign : 'center',fontSize: 20,paddingBottom: 30,textDecoration:'underline',cursor: 'pointer'}}
                            onClick={this.showMore.bind(this)}>
                            查看更多
                        </div>
                }

            </div>
        )
    }
}

R_ActivityComponet.defaultProps = {
    goods: [
        {
            pic: '',
            title: '',
            oldPrice: '',
            nowPrice: '',
            monthPay: '',
            staging: '',
            id: ''
        }
    ],
    title: '',
    banner: ''
};

class R_Activity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            banner: '',
            goods: []
        }
    }

    componentWillMount() {
        this.getActivityInfo();
    }

    getActivityInfo() {
        HttpService.query({
            url: '/appinterface/queryGoods_activity_number',
            data: {index: !!CommonService.getUrlParams('index') ? CommonService.getUrlParams('index') : 1},
            success: res=> {
                this.setState({
                    banner: res.activityThemeImage,
                    goods: res.activityTempInfoList
                })
            }
        })
    }

    render() {

        var columns = this.state.goods.map(function (item, index) {
            return (
                <div className="wrap" style={{background:item.backgroundColor,minHeight:50}} key={index}>
                    <R_ActivityComponet title={item.moduleTitle} banner={item.moduleIcon} goods={item.goodsItemList}/>
                </div>
            )
        });

        return (
            <div>
                <div
                    style={{width: '100%', height: '800px', background: ('url(' + this.state.banner + ') center center / auto 100%'), minWidth: 1200,backgroundSize: '100% 100%',backgroundRepeat:'no-repeat'}}>
                </div>
                {columns}
            </div>
        )
    }
}