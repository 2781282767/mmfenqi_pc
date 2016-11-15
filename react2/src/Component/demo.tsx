'usr strict';

import * as React from "react";

import {connect} from 'react-redux';




import ComponentsConfig from "./ComponentsConfig";


const css_prefix = ComponentsConfig.css_prefix;


const now_url = window.location.href.match(/(?:\w*)(?=.html)/);


import '../less/app.less'


import {getMenuAction, saveParentActive, saveChildActive, changeActiveAction} from '../redux/actions/MenuAction';


export interface AppMenuProps {
    active: number;
    MenuReducers: any;
    dispatch: Function;
    parentActive?: any;
    childActive?: any;
}




class Demo extends React.Component<any, {}> {

    constructor(props) {
        super(props);

        console.log(this.props)
        let {MenuReducers, dispatch} = this.props;
        //让当前函数this 指向到类本身
        this.createItem = this.createItem.bind(this);
        this.state = {
            parentActive: MenuReducers.active.parent,
            childActive: MenuReducers.active.child
        }
    }

    componentDidMount() {

        let {MenuReducers, dispatch} = this.props;
        /**
         * 读取菜单数据
         */
        dispatch(getMenuAction());

    }

    push(event, childIndex, childName, URL) {
        // let {MenuReducers, dispatch} = this.props;
        // dispatch(changeActiveAction())
        // let active_Json = { childkey: childIndex, childvalue: childName };
        // saveChildActive(active_Json);
        // Tool.goPush(URL);
        // //防止冒泡多次触发
        // event.preventDefault();
        // event.stopPropagation();
    }


    handleOrderTabClick(event, parentIndex, parentName, URL) {

        console.log(event)
    }

    createItem(item, index) {
        let {MenuReducers, dispatch} = this.props;
        //判断是否存在子菜单
        let hasChild = item.subMunu.length > 0 ? true : false;
        let parentActive = MenuReducers.active.parent == index ? `${css_prefix}-menu-parent-item active` : `${css_prefix}-menu-parent-item`;
        let ParentUrl = item.url;
        return (
            <li key={index} className={ parentActive }
                onClick = {(event) => this.handleOrderTabClick(event, index, item.name, ParentUrl) }
            >
                <h3 className = {hasChild ? 'on' : 'off'} data-href = {ParentUrl}>
                    {/*{item.icon ? <Icon type={item.icon}/> : false}*/}
                    {item.name}
                </h3>
                { hasChild ? (
                    <ul className={`${css_prefix}-menu-child`}>
                        {item.subMunu.map((childItem, childIndex) => {
                            let ChildUrl = childItem.url;
                            let childActive = ChildUrl == now_url[0] ? `${css_prefix}-menu-child-item chd-active` : `${css_prefix}-menu-child-item`;
                            return (<li key = {childIndex} className={childActive}>
                                    <a href={URL} onClick = {(event) => this.push(event, childIndex, childItem.name, ChildUrl) }>
                                        {/*{childItem.icon ? <Icon type={childItem.icon}/> : false}*/}
                                        {childItem.name}
                                    </a>
                                </li>
                            )
                        }) }
                    </ul>) : null}
            </li>
        )
    }
    render() {

        let {MenuReducers,dispatch}=this.props;
        console.log(MenuReducers)
        return (
            <div className={`${css_prefix}-menu`}>
                <ul className={`${css_prefix}-menu-parent`}>
                    {MenuReducers.menuList.map(this.createItem) }
                </ul>
            </div>
        );
    }
}


let mapStateToProps = (state) => {
    return {
        MenuReducers: state.MenuReducers
    }
}


export default connect(mapStateToProps)(Demo)