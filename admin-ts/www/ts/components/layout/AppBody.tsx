import * as React from "react";
import {bindActionCreators} from 'redux';
import { Provider, connect} from 'react-redux';
import {AppHeader, AppMenu} from '../index';

import ComponentsConfig from "../ComponentsConfig";
import {changeActiveAction,switchMenu} from '../../redux/actions/MenuAction';
import {getAuthAction} from '../../redux/actions/HeaderAction';

import headerMenu from './header_menu';
import { Spin, Switch, Alert } from 'antd';

const css_prefix = ComponentsConfig.css_prefix;
let adCls =  `${css_prefix}-layout-pc-main`;

interface AppBodyProps{
    _flag:Boolean;
    MenuReducers?:any;
    Actions?:any;
    HeaderReducer?:any;
    children?:any,
    dispatch: Function;


}
class AppBody extends React.Component<any, any> {

    constructor(props){
        super(props);
        this.state={
            uiIndex:false,
        }
    }

    handleSearch(_flag){
        console.log(_flag);
        this.setState({
            uiIndex:_flag
        })
    }
    componentWillReceiveProps(nextProps):void {
            this.setState({
                uiIndex:nextProps._flag
            })
    }


    /**
     * body 主容器 包括头部和菜单 <AppHeader /> <AppMenu  />
     */
    render() {
        let {children,MenuReducers,HeaderReducer,Actions} = this.props;
        let Cls = MenuReducers.menuSwitch ? adCls : adCls + " off";
        return (<div className={`${css_prefix}-body`}>

                <div className="ui-index-none" style={{display:!!this.state.uiIndex? 'block':'none'}}>
                    <div className="ui-index">
                    </div>
                    <div className="ui-index-content">
                        <Spin size="large" />
                    </div>
                </div>


                    <AppHeader handleSearch={this.handleSearch.bind(this)}  menuComponent={headerMenu} meu_reducers={MenuReducers} hed_reducers={HeaderReducer} actions = {Actions}/>
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