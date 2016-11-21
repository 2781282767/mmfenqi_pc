import * as React from "react";
import * as ReactDOM from "react-dom";
import {bindActionCreators} from 'redux';
import {Provider, connect} from 'react-redux';


import { Tooltip } from 'antd';
const text = <span>prompt text</span>;




//自己的第三方组件
import {
    AppBody,
} from '../components/index';
//自己书写的基类
import BaseContainer from '../components/pubController/BaseContainer';
import {BaseStore} from '../redux/store/BaseStore';

import Popup from '../components/modul'
import TableOne from './Table/TableOne';


import '../../styles/containerLess/account.less'
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
            admin: {},
            changeData:{

            },
            config:{
                isSure: false,
                isCancel: true,
                no: '返回',
                yes: '确定',
                yes_cb: ()=> {


                    this.setState({
                        admin: {
                            flag: false,

                        },
                        changeData:{

                        }
                    })
                },
                no_cb: ()=> {

                }
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




    }


    search(e) {
        let self = this;
        e.preventDefault();
    }

    onChildChanged(newState){
        this.setState({
            changeData:newState,
            admin:{
                flag:true
            }
        })
    }

    render() {
        let {Actions} = this.props;
        const { admin,changeData,config} =this.state;
        return (
            <AppBody>


                <Popup config={config} blockOrNone={admin.flag} _flag={admin.flag}>
                    <form action="#">

                        <div className="ui-form-input-content">

                            <label>姓名</label>


                            {
                                !!changeData.name?
                                    <input type="text"  value={changeData.name} placeholder="请输入姓名" id="name"/>:

                                    <input type="text"  placeholder="请输入姓名" id="name"/>
                            }
                        </div>

                        <div className="ui-form-input-content">

                            <label>隶属组织</label>
                            <input type="text" value={!!changeData.zuzhi?changeData.zuzhi:''} placeholder="请输入姓名" id="zuzhi"/>
                        </div>


                        <div className="ui-form-input-content">


                            <label>工号</label>
                            <input type="text"  placeholder="请输入登录工号" id="gohao"/>
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
                        <div className="col1">组织管理
                            <Tooltip placement="right" title={text}>
                                <img src="/dist/images/tooltip.png" style={{width:'30px',height:'30px',marginLeft:'10px'}}/>
                            </Tooltip>
                        </div>
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

                            <button type="primary" className="ui-btn ui-btn-primary">+添加分组</button>
                        </div>
                    </div>


                    <div className="organization" id="organization">

                        <button type="primary" className="ui-btn ui-btn-primary">随寻科技</button>
                        <button type="default" className="ui-btn ui-btn-default">1111</button>
                        <button type="default" className="ui-btn ui-btn-default">2222</button>

                    </div>







                    <div className="ui-col2" style={{border:0}}>
                        <div className="col1">账户列表
                            <Tooltip placement="right" title={text}>
                                <img src="/dist/images/tooltip.png" style={{width:'30px',height:'30px',marginLeft:'10px'}}/>
                            </Tooltip>
                        </div>

                        <div className="col2">
                            <button type="primary" className="ui-btn ui-btn-primary"
                                    onClick={this.deviceCancel.bind(this)}>+添加账户
                            </button>
                        </div>
                    </div>
                    <TableOne callbackParent={this.onChildChanged.bind(this)} />

                </div>

            </AppBody>
        );
    }

    componentDidMount(): void {
        let {MenuReducers, Actions} = this.props;


        // var oUl = document.getElementById('organization');
        // var aLi = oUl.getElementsByTagName("button");
        //
        // for(var i=0; i<aLi.length; i++){
        //
        //     // if(aLi[i]!=oli){
        //     //     aLi[i].style.color="";
        //     // }
        //
        //     // aLi[i].setAttribute('class', 'mar_l pad');
        //     aLi[i].onclick = function(){
        //
        //         this.style.backgroundColor='#01b4ee';
        //
        //
        //     };
        //
        //
        // }
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



