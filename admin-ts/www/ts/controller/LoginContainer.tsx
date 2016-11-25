import * as React from "react";
import * as ReactDOM from "react-dom";
import Config from '../pub/Config';
import {LoginAction} from '../redux/LoginAction';

//自己的第三方组件
import {

    InputText,
    Buttons,
    Tips,
} from '../components/index';
//表单验证模块
import Verifier from '../pub/Verifier';
//数据流向
//验证的表单配置
let Verifier_Config = {
    accout: {
        name: '用户',
        require: true
    },
    password: {
        name: '密码',
        require: true
    }
};
class LoginApp extends React.Component<any, any> {
    submitDate: any;

    constructor(props) {
        super(props);
        //验证的表单
        this.submitDate = {
            accout: '',
            password: ''
        };

        this.state = {
            type: 1
        }
    }

    sublimeButton(e) {

        e.preventDefault();


        //提交数据表单
        let verifyResult = Verifier.verifyConfig(this.submitDate, Verifier_Config, true);
        if (verifyResult.length > 0) {
            Tips({
                message: verifyResult[0].tips,
                type: 2
            });
            return false;
        }
        let accout = this.submitDate.accout;
        let password = this.submitDate.password;
        LoginAction(accout, password);
    }

    valueChange(name, value) {
        this.submitDate[name] = value;
    }

    createLogin() {
        return <div className="login-content-input">

            <div style={{padding:'30px 0'}}><img src="/dist/images/logo2.png"/></div>
            <div className="login-item">
                <span className="item-icon"><img src="/dist/images/zhanghu.png" /></span>
                <InputText type="test" placeholder="请输入账号"
                           onChange={(event) => this.valueChange('accout', event.target.value) }/>
            </div>
            <form action="#" onSubmit={this.sublimeButton.bind(this)}>
                <div className="login-item">
                    <span className="item-icon"><img src="/dist/images/mima.png"/></span>
                    <InputText type="password" placeholder="请输入密码"
                               onChange={(event) => this.valueChange('password', event.target.value) }/>
                </div>
                <div className="login-btn-box">

                    <Buttons type="primary" display="block">
                        登录
                    </Buttons>

                </div>

                <div style={{paddingTop:'10px',color:'#ff5a5a'}}>忘记密码?</div>
            </form>
        </div>
    }

    createRegistered() {
        return <div>
            我是注册面板
        </div>
    }

    changeType(type) {
        this.setState({
            type: type
        })
    }

    render() {
        let stateType = ()=> {
            if (this.state.type == 1) {
                return this.createLogin()
            } else {
                return this.createRegistered();
            }
        }
        return (
            <div>

                    <div className="login-log">
                        <img src="/dist/images/tu.png" />
                    </div>
                    <div className="login-header">

                        {stateType()}
                    </div>


            </div>

        );
    }

    componentDidMount(): void {

    }

    componentWillUnmount(): void {

    }
}

const ElementContainer = document.getElementById("example");
ReactDOM.render(
    <LoginApp />,
    ElementContainer
);



