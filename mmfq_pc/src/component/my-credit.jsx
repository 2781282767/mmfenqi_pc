'use strict';
class RMy_credit extends React.Component{

    constructor(){
        super();
        this.state={
            data:{},
            rate:''
        }
    }

    user_info(){
        $.ajax({
            type: 'post',
            url: '/pc/computer/user_info',
            data: '',
            dataType: 'json',
            success: (res)=> {
                if (res.result == 1013){
                    window.location.href = 'login.html'
                }
                console.log(res);
                this.setState({
                    data:res.data,
                    rate:res.data.remainMoney/res.data.realloanMoney
                });
            }
        })

    }

    componentDidMount() {
       this.user_info()
    }

    render(){

        console.log(this.state.rate);

        var rate=this.state.rate*100+"%";

        console.log(rate)


        var a = 1,b = 2;
        var c = (a/b)*100+"%";

        console.log(c)

        return (
            <div style={{float:'left'}}>
                <div className="wrap-content">
                    <div className="wrap-content-right">
                        <div>
                            <div className="top">
                                <ul className="_a">
                                    <li>
                                        可用额度(元)
                                    </li>
                                    <li style={{textAlign:'right'}}>
                                        总信用额度(元)
                                    </li>

                                </ul>
                                <ul className="_money">
                                    <li>￥{this.state.data.remainMoney}</li>
                                    <li>￥{this.state.data.realloanMoney}</li>
                                </ul>
                                <ul>
                                    <div className="progress" style={{backgroundColor:'#ff8c9d',width:'90%'}}>
                                        <div className="progress-bar progress-bar-success" role="progressbar"
                                             aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width:rate,backgroundColor:"#fd657a"}}>
                                            <span className="sr-only">{rate} 完成（成功）</span>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                            <div className="pseudo">
                                <ul>
                                    <li>
                                        <p className="left">
                                            <div>
                                                <img src="../static/images/credit/credit_p.png" alt=""/>
                                            </div>
                                        </p>
                                        <div className="right">
                                            <p><img src="../static/images/credit/credit_t.png" alt=""/></p>
                                            <p className="two-dimension">
                                                <div><img src="../static/images/credit/gong.jpg" alt=""/></div>
                                                <div><img src="../static/images/credit/app.jpg" alt=""/></div>
                                            </p>
                                            <p className="two_btn">
                                                <img src="../static/images/credit/credit_g.png" alt=""/>
                                                <img src="../static/images/credit/app.png" alt=""/>
                                            </p>
                                        </div>
                                    </li>
                                    <li style={{marginTop:'50px',marginLeft:'40px'}}>
                                        <img src="../static/images/credit/credit_step.png" alt=""/>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
