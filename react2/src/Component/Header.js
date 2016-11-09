'usr strict';
import React from 'react';
import ComponentsConfig from "./componentsConfig";
const css_prefix = ComponentsConfig.css_prefix;
export default class AppHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authSwitch: false
        };
    }
    /**
     * 点击切换菜单
     */
    handleSwitch(event) {
        let { meu_reducers, actions } = this.props;
        if (meu_reducers.menuSwitch) {
            actions.switchMenu(false);
            return false;
        }
        actions.switchMenu(true);
    }
    /**
     * 点击切换头部菜单
     */
    handleAuthSwitch(event) {
        if (this.state.authSwitch) {
            this.setState({ authSwitch: false });
        }
        else {
            this.setState({ authSwitch: true });
        }
    }
    /**
     * 点击退出
     */
    exit() {
        // loginOutAction();
    }
    render() {
        let { hed_reducers, actions, menuComponent } = this.props;
        let auchUserName = hed_reducers.LOGIN_ID;
        let cls = this.state.authSwitch ? `${css_prefix}-auth on` : `${css_prefix}-auth `;
        return (React.createElement("div", {className: `${css_prefix}-layout-header`}, 
            React.createElement("div", {className: `${css_prefix}-header-container`}, 
                React.createElement("div", {className: `${css_prefix}-logo`}, "广告系统"), 
                React.createElement("div", {className: `${css_prefix}-menu-switch`, onClick: (event) => this.handleSwitch(event)}, 
                    React.createElement("span", null)
                ), 
                React.createElement("div", {className: cls}, 
                    React.createElement("h3", {onClick: (event) => this.handleAuthSwitch(event)}, 
                        "欢迎您 : ", 
                        auchUserName), 
                    React.createElement("div", {className: `${css_prefix}-auth-menu`}, 
                        menuComponent, 
                        React.createElement("div", null, 
                            React.createElement("p", {onClick: this.exit.bind(this)}, "退出")
                        ))))
        ));
    }
    componentDidMount() {
        let { hed_reducers, actions } = this.props;
        actions.getAuthAction();
    }
}
//# sourceMappingURL=Header.js.map