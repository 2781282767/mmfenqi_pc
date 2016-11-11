import * as React from "react";
import {bindActionCreators} from 'redux';
import { Provider, connect} from 'react-redux';
import {AppHeader, AppMenu} from '../index';
import Detect from '../../pub/Detect';
import ComponentsConfig from "../ComponentsConfig";
import {changeActiveAction,switchMenu} from '../../redux/actions/MenuAction';
import {getAuthAction} from '../../redux/actions/HeaderAction';

import headerMenu from './header_menu';
import { Spin, Switch, Alert } from 'antd';
// import '../../../styles/less/app.less';
// require('../../../styles/app.css')
// require('../../../styles/app.css.map')

console.log(headerMenu)
const css_prefix = ComponentsConfig.css_prefix;
let detect = new Detect();
let adCls = detect.os.phone ? `${css_prefix}-layout-mobile-main` : `${css_prefix}-layout-pc-main`;
interface AppBodyProps {
    MenuReducers?: any;
    children?: any;
    component?:symbol;
}
class AppBody extends React.Component<any,any> {
    
    constructor(props){
        super(props);
        this.state={
            uiIndex:false,
        }
    }

    handleSearch(flag){
        console.log(flag);
        this.setState({
            uiIndex:flag
        })
    }
    /**
     * body 主容器 包括头部和菜单 <AppHeader /> <AppMenu  />
     */
    render() {
        let {children,MenuReducers,HeaderReducer,Actions} = this.props;
        console.log(111)
        console.log(children)
        let Cls = MenuReducers.menuSwitch ? adCls : adCls + " off";
        return (<div className={`${css_prefix}-body`}>

                <div className="ui-index-none" style={{display:!!this.state.uiIndex? 'block':'none'}}>
                    <div className="ui-index">
                    </div>
                    <div className="ui-index-content">
                        <Spin size="large" />
                    </div>
                </div>


                    <AppHeader handleSearch={this.handleSearch.bind(this)} menuComponent={headerMenu} meu_reducers={MenuReducers} hed_reducers={HeaderReducer} actions = {Actions}/>
                    <div className = { Cls }>
                        <AppMenu />
                        <div className={`${css_prefix}-container`}>
                            {children}
                        </div>
                    </div>
                </div>
                    );
    }

    componentDidMount():void {

        console.log('222');
        console.log(this.props)

        let {MenuReducers, Actions} = this.props;
        Actions.changeActiveAction();
    }
}

let mapStateToProps = (state) => {
    return {
        HeaderReducer: state.HeaderReducer,
        MenuReducers: state.MenuReducers
    }
}

function mapDispatchToProps(dispatch) {
    return {
        Actions: bindActionCreators({
                changeActiveAction,
                 switchMenu,
                 getAuthAction
             }, dispatch)
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(AppBody);