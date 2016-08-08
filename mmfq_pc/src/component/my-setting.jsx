
'use strict';
class R_MySetting extends React.Component{


    constructor(){
        super()
        this.state={
            data:[]
        }
    }

    user_info(){

        $.ajax({
            type: 'post',
            url: '/pc/computer/user_info',
            data: '',
            dataType: 'json',
            success: (res)=> {
                console.log(res)
                if (res.result == 1013){
                    window.location.href = 'login.html'
                }
                console.log(res);
                this.setState({
                    data:res.data
                });
            }
        });

    }

    componentDidMount() {
        this.user_info()
    }
    render(){
        var creditType = '实名认证';
        switch (this.state.data.creditStatus){
            case '0':
                creditType = '初始状态';
                break;
            case '1':
                creditType = '已实名认证';
                break;
            case '2':
                creditType = '实名认证失败';
                break;
            case '3':
                creditType = '实名审核中';
                break;
            default:
                break;
        }
        return(
            <div style={{float:'left'}}>
                <div className="wrap-content">
                    <div className="wrap-content-right">
                        <div>
                            <div className="top">
                                <ul>
                                    <li><h3>账户设置</h3></li>
                                </ul>
                            </div>
                            <div className="phone">
                                <ul>
                                    <li>
                                        <p className="left">
                                            <div>
                                                <img src="../static/images/phone.png" alt=""/>
                                            </div>
                                        </p>
                                        <div className="right">
                                            <p><b style={{fontSize:'16px'}}>手机号码</b> <span className="bg_b8">{creditType}</span></p>
                                            <p className="bg_b8">你绑定的手机号码是:{this.state.data.telePhone}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="pwd">
                                <ul>
                                    <li>
                                        <p className="left">
                                            <div>
                                                <img src="../static/images/pwd.png" alt=""/>
                                            </div>
                                        </p>
                                        <div className="right">
                                            <p><b style={{fontSize:'16px'}}>登录密码</b></p>
                                            <p className="bg_b8">如账号出现异常，请及时修改密码</p>
                                        </div>
                                    </li>
                                    <li>
                                        <p>
                                           <span>修改</span><img src="../static/images/pwd-right.png" alt=""/>
                                        </p>
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
