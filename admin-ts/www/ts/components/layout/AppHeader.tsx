import * as React from "react";
import {Select} from 'antd';

import {loginOutAction} from '../../redux/actions/HeaderAction';

import ComponentsConfig from "../ComponentsConfig";

const css_prefix = ComponentsConfig.css_prefix;

const Option = Select.Option;


export default class AppHeader extends React.Component<any, any> {

    meu_reducers?: any;
    hed_reducers?: any;
    actions?: any;
    menuComponent?: any;
    handleSearch:any;


    constructor(props) {
        super(props);
        this.state = {
            authSwitch: false
        }
    }

    /**
     * 点击切换菜单
     */
    handleSwitch(event) {
        let {meu_reducers, actions} = this.props;
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
            this.setState({authSwitch: false})
        } else {
            this.setState({authSwitch: true})
        }
    }

    /**
     * 点击退出
     */
    exit() {
        loginOutAction();
    }

    search(e) {

        let self = this;
        e.preventDefault();

        let flag = true;


        self.props.handleSearch(flag);

        setTimeout(abc, 2000);

        function abc() {
            flag = false;
            self.props.handleSearch(flag);
        }
    }

    handleChange(val) {

    }

    render() {
        let {hed_reducers, actions, menuComponent} = this.props;
        let auchUserName = hed_reducers.LOGIN_ID;
        let cls = this.state.authSwitch ? `${css_prefix}-auth on` : `${css_prefix}-auth `;


        const list = [
            {name: '输入设备IMEI号'},
            {name: '输入设备IMEI号2'}
        ]


        return (


            <div className={`${css_prefix}-layout-header`}>


                <div className={`${css_prefix}-header-container`}>
                    <div className={`${css_prefix}-logo`}>
                        <img src='/dist/images/logo.png' style={{width:'148px',height:'40px'}} alt=""/>
                    </div>
                    {/*<div className={`${css_prefix}-menu-switch`} onClick = {(event) => this.handleSwitch(event)}>*/}
                    {/*<span></span>*/}
                    {/*</div>*/}


                    <div className="ui-search">

                        <Select size="large" defaultValue="输入设备IMEI号" style={{ width: 140 }}
                                onChange={this.handleChange}>

                            {
                                list.map((json, index)=> {


                                    return (

                                        <Option  value={json.name}>{json.name}</Option>
                                    )
                                })
                            }

                        </Select>


                        <div style={{display:'flex',alignItems:'center',position:'relative'}}>
                            <form action="#" onSubmit={this.search.bind(this)}>
                                <input type="search" placeholder="输入设备IMEI号"/>

                                <i className="iconfont icon-search"></i>
                            </form>
                        </div>


                        <div>

                        </div>


                    </div>


                    <div className={cls}>

                        <div className="operator">
                            <div className="operator">
                                <img src="/dist/images/user.png"/>
                                <li style={{marginRight:'40px'}}>某某某</li>
                            </div>


                            <div className="operator" onClick={this.exit.bind(this)}>
                                <img src="/dist/images/exit.png"/>
                                <li style={{marginRight:'40px'}}>退出</li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }

    componentDidMount() {

        console.log('222');

        console.log(this.props);
        let {hed_reducers, actions} = this.props;
        actions.getAuthAction();
    }
}