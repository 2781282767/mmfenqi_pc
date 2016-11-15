import * as React from "react";
import * as ReactDOM from "react-dom";
import {bindActionCreators} from 'redux';
import {Provider, connect} from 'react-redux';
//自己的第三方组件
import {
    AppBody,
    Panel,
    Echarts,
    Buttons,
    Row,
    Col,
    Icon, Dashboard, Label
} from '../components/index';
//自己书写的基类
import BaseContainer from '../components/pubController/BaseContainer';
import {BaseStore} from '../redux/store/BaseStore';

import Popup from '../components/modul'
import TableOne from './Table/TableOne';
import TableTwo from './Table/TableTwo';
import TableThree from './Table/TableThree';
import TableFour from './Table/TableFour';

import '../../styles/account/account.less'
//表单验证模块
import verifier from '../pub/Verifier';
const store = BaseStore({});
let divStyle = {
    marginBottom: '10px',
};
class IndexApp extends BaseContainer {
    constructor(props) {
        super(props);


        this.state = {
            info: {},
            admin: {}
        }


        this.config = {
            isSure: false,
            isCancel: true,
            no: '返回',
            yes: '确定',
            yes_cb: ()=> {


                this.setState({
                    admin: {
                        flag: false
                    }
                })
            },
            no_cb: ()=> {

            }
        };
    }

    handleButton() {
        //let {MenuReducers, dispatch} = this.props;
        alert('点击优惠码')
    }

    deviceCancel() {

        this.setState({
            admin: {
                flag: true
            }
        });


        console.log(this.state.info.isadmin);


        if (!this.state.info.isadmin) {

            var b = {
                content: '解绑设备,确定要解除绑定吗？',
            }

            this.config = Object.assign({}, this.config, b);

        } else {
            var a = {

                content: '解绑设备,解除管理员绑定后,其他监护成员将一同解除,且设备恢复出厂设置,只保留激活状态及设备有效期',

            };


            this.config = Object.assign({}, this.config, a);


        }


    }


    search(e) {
        let self = this;
        e.preventDefault();
    }

    render() {
        let {Actions} = this.props;
        const {info, admin} =this.state;

        const abc='李建彬';
        return (
            <AppBody>


                <Popup config={this.config} blockOrNone={admin.flag} _flag={admin.flag}>
                    <form action="#">

                        <div className="ui-form-input-content">

                            <label>姓名</label>
                            <input type="text" defaultValue={abc} placeholder="请输入姓名" id="name"/>
                        </div>

                        <div className="ui-form-input-content">

                            <label>隶属组织</label>
                            <input type="text" placeholder="请输入姓名" id="zuzhi"/>
                        </div>


                        <div className="ui-form-input-content">


                            <label>工号</label>
                            <input type="text" placeholder="请输入登录工号" id="gohao"/>
                        </div>
                        <div className="ui-form-input-content">
                            <label>手机号码</label>
                            <input type="text" placeholder="请输入手机号码" id="phone"/>
                        </div>

                        <div className="ui-form-input-content">
                            <label>邮箱</label>
                            <input type="text" placeholder="请输入邮箱" id="email"/>
                        </div>
                        <div className="ui-form-input-content">
                            <label>地址</label>
                            <input type="text" placeholder="请输入详细地址" id="email"/>
                        </div>

                        <div className="ui-form-input-content">
                            <label>地址</label>
                        </div>
                    </form>

                </Popup>

                <div className="ui-account">
                    <div className="ui-col2">
                        <div className="col1">组织管理</div>
                        <div className="col2">

                            <div style={{display:'flex',alignItems:'center',position:'relative'}}>
                                <form action="#" onSubmit={this.search.bind(this)}>
                                    <input type="search" placeholder="输入设备IMEI号"/>

                                    <i className="iconfont icon-search"></i>
                                </form>
                            </div>
                        </div>
                    </div>


                    <div className="ui-col2">
                        <div className="col1">全部</div>
                        <div className="col2">

                            <button type="primary" className="ui-btn ui-btn-primary">首选primary</button>
                        </div>
                    </div>

                    <div className="ui-col2">
                        <div className="col1">账户列表</div>
                        <div className="col2">

                            <button type="primary" className="ui-btn ui-btn-primary"
                                    onClick={this.deviceCancel.bind(this)}>+添加账户
                            </button>
                        </div>
                    </div>


                    <TableOne />

                </div>

            </AppBody>
        );
    }

    componentDidMount(): void {
        let {MenuReducers, Actions} = this.props;
    }

    componentWillUnmount(): void {

    }

    /*shouldComponentUpdate(){
     return false
     }*/
}

let mapStateToProps = (state) => {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        Actions: bindActionCreators({}, dispatch)
    };
}
/**
 * 添加监听数据
 */
const App = connect(mapStateToProps, mapDispatchToProps)(IndexApp);
const ElementContainer = document.getElementById("example");
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    ElementContainer
);



