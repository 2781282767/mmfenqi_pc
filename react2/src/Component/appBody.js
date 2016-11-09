'usr strict';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AppMenu from './appMenu';
import AppHeader from './Header';
import Detect from '../pub/Detect';
import ComponentsConfig from "./ComponentsConfig";
import { changeActiveAction, switchMenu } from '../redux/actions/MenuAction';
import { getAuthAction } from '../redux/actions/HeaderAction';
// import headerMenu from './header_menu';
// console.log(headerMenu)
const css_prefix = ComponentsConfig.css_prefix;
let detect = new Detect();
let adCls = detect.os.phone ? `${css_prefix}-layout-mobile-main` : `${css_prefix}-layout-pc-main`;
class AppBody extends React.Component {
    constructor(props) {
        super(props);
    }
    /**
     * body 主容器 包括头部和菜单 <AppHeader /> <AppMenu  />
     */
    render() {
        let { children, MenuReducers, HeaderReducer, Actions } = this.props;
        let Cls = MenuReducers.menuSwitch ? adCls : adCls + " off";
        return (React.createElement("div", {className: `${css_prefix}-body`}, 
            React.createElement(AppHeader, {meu_reducers: MenuReducers, hed_reducers: HeaderReducer, actions: Actions}), 
            React.createElement("div", {className: Cls}, 
                React.createElement(AppMenu, null), 
                React.createElement("div", {className: `${css_prefix}-container`}, children))));
    }
    componentDidMount() {
        let { MenuReducers, Actions } = this.props;
        Actions.changeActiveAction();
    }
}
let mapStateToProps = (state) => {
    return {
        HeaderReducer: state.HeaderReducer,
        MenuReducers: state.MenuReducers
    };
};
function mapDispatchToProps(dispatch) {
    return {
        Actions: bindActionCreators({
            changeActiveAction,
            switchMenu,
            getAuthAction
        }, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(AppBody);
//# sourceMappingURL=appBody.js.map