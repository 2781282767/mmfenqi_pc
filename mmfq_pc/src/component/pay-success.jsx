/**
 * Created by sheldon on 2016/7/11.
 */
'use strict';

class R_PaySuccess extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orderId: ''
        }
    }

    getUrl(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }


    componentDidMount() {
        var orderId=this.getUrl('orderId');
        this.setState({
            orderId:orderId,
        })
    }


    render(){
        return (
            <div className="wrap-content">
                <div className="main">
                    <img src="../static/images/pay-success.jpg" alt=""/>
                </div>

                <div className="_foot">
                    <a href="index.html"><div className="_btn btn_btn" style={{padding:'10px',borderRadius:'0'}}>返回首页</div></a>
                    <a href="my-order.html"><div className="_btn btn_btn" style={{padding:'10px',borderRadius:'0'}}>查看订单</div></a>
                </div>
            </div>
        )
    }
}
