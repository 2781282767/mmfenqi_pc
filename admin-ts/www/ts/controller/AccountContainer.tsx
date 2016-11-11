import * as React from "react";
import * as ReactDOM from "react-dom";
import {bindActionCreators} from 'redux';
import { Provider, connect} from 'react-redux';
//自己的第三方组件
import {
    AppBody,
    Panel,
    Echarts,
    Buttons,
    Row,
    Col,
    Icon,Dashboard,Label} from '../components/index';
//自己书写的基类
import BaseContainer from '../components/pubController/BaseContainer';
import {BaseStore} from '../redux/store/BaseStore';
//表单验证模块
import verifier from '../pub/Verifier';
const store = BaseStore({  });
let divStyle = {
    marginBottom: '10px',
};
class IndexApp extends BaseContainer {
    constructor(props) {
        super(props);
    }

    handleButton(){
        //let {MenuReducers, dispatch} = this.props;
        alert('点击优惠码')
    }

    render() {
        let {Actions} = this.props;
        return (
            <AppBody>
                <input type="text"/>
            </AppBody>
        );
    }

    componentDidMount():void {
        let {MenuReducers, Actions} = this.props;
    }

    componentWillUnmount():void {

    }

    /*shouldComponentUpdate(){
     return false
     }*/
}

let mapStateToProps = (state) => {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        Actions: bindActionCreators({

        }, dispatch)
    };
}
/**
 * 添加监听数据
 */
const App = connect(mapStateToProps,mapDispatchToProps)(IndexApp);
const ElementContainer = document.getElementById("example");
ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>,
    ElementContainer
);



