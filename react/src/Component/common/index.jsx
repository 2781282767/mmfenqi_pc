'usr strict';
import React, {Component, PropTypes} from 'react';
import {Router, Route, IndexRoute, hashHistory,browserHistory, Link} from 'react-router';

import back from '../../img/back.png'










import Tool from '../../Tool'
/**
 * (加载动画)
 *
 * @class DataLoad
 * @extends {Component}
 */
export class DataLoad extends Component {
    render() {
        let {loadAnimation, loadMsg} = this.props;
        return (
            <div className={'data-load data-load-' + loadAnimation}>
                <div className="msg">{loadMsg}</div>
            </div>
        );
    }
}
DataLoad.defaultProps = {
    loadAnimation: true, //默认显示加载动画
    loadMsg: '正在加载中'
};


export  class R_header extends Component{

    render(){
        const {title,left,right} = this.props;



        return (
            <header style={{display:'flex',padding:'1rem 15px',zIndex: '100', fontSize:'1.6rem', borderBottom: '1px solid #eee',
                position: 'relative'}}>
                {
                    left==1?
                        <div style={{display:'flex',flex:1,alignItems:'center',justifyContent:'flex-start'}} onClick={this.context.router.goBack}>
                            <img src={back} style={{width: '1.7rem', height: '1.6rem',}}/>
                        </div>:
                        <div style={{display:'flex',flex:1,alignItems:'center',justifyContent:'flex-start'}} >

                        </div>
                }
                <div style={{display:'flex',flex:1,alignItems:'center',justifyContent:'center'}}>{title}</div>
                <div style={{display:'flex',flex:1}}>

                    {
                        right==1?
                            <div style={{display:'flex',flex:1,alignItems:'center',justifyContent:'flex-end'}} onClick={hashHistory.goBack}>
                                <img src={back} style={{width: '1.7rem', height: '1.6rem',}}/>
                            </div>:
                            <div style={{display:'flex',flex:1,alignItems:'center',justifyContent:'flex-end'}} >

                            </div>
                    }

                </div>
            </header>
        )

    }
}

R_header.contextTypes = {
    router: React.PropTypes.object.isRequired
};

/**
 * 公共头部
 *
 * @export
 * @class Header
 * @extends {Component}
 */



export class Header extends Component {
    render() {
        let {title, leftTo, leftIcon, rightTo, rightIcon, rightClick } = this.props;
        let left = null;

        if (leftTo && leftIcon) {
            left = (
                <Link to={leftTo}>
                    <i className={'iconfont icon-' + leftIcon}></i>
                </Link>
            );
        } else if (leftIcon === 'fanhui') { //返回上一页
            left = (
                <a onClick={this.context.router.goBack}>
                    <i className={'iconfont icon-' + leftIcon}></i>
                </a>
            );
        }

        let right = null;
        if (rightTo && rightIcon) {
            right = (
                <Link to={rightTo}>
                    <i className={'iconfont icon-' + rightIcon}></i>
                </Link>
            );
        } else if (rightClick && rightIcon) {
            right = (
                <div onClick={rightClick}>
                    <i className={'iconfont icon-' + rightIcon}></i>
                </div>
            );
        }
        return (
            <header className="common-header" data-flex>
                <div className="icon" data-flex="main:center cross:center" data-flex-box="0">
                    {left}
                </div>
                <h2 className="title" data-flex-box="1">{title}</h2>
                <div className="icon" data-flex="main:center cross:center" data-flex-box="0">
                    {right}
                </div>
            </header>
        );
    }
}
Header.contextTypes = {
    router: React.PropTypes.object.isRequired
}


/**
 * 暂无记录
 *
 * @export
 * @class DataNull
 * @extends {Component}
 */
export class DataNull extends Component {
    render() {
        return (
            <div>暂无记录</div>
        );
    }
}

/**
 * 底部导航菜单
 *
 * @export
 * @class Footer
 * @extends {Component}
 */
export class FooterInit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messageCount: 0
        };

        this.getMessageCount = () => {
            var accesstoken = this.props.User ? this.props.User.accesstoken : '';
            if (accesstoken) {
                Tool.get('/api/v1/message/count', { accesstoken }, (res) => {
                    this.setState({
                        messageCount: res.data
                    });
                });
            }
        }
    }
    render() {
        var myUrl = this.props.User && this.props.User.loginname ? '/user/' + this.props.User.loginname : '/signin';
        var arr = [];
        arr[this.props.index] = 'on';
        return (
            <footer className="common-footer">
                <div className="zhanwei"></div>
                <ul className="menu" data-flex="box:mean">
                    <li className={arr[0]}>
                        <Link to="/">
                            <i className="iconfont icon-shouye"></i>首页
                        </Link>
                    </li>
                    <li className={arr[1]}>
                        <Link to="/about">
                            <i className="iconfont icon-fabu"></i>目录1
                        </Link>
                    </li>
                    <li className={arr[2]}>
                        <Link to="/my/messages">
                            <i className="iconfont icon-xiaoxi"></i>目录2{this.state.messageCount > 0 ? <em>{this.state.messageCount}</em> : ''}
                        </Link>
                    </li>
                    <li className={arr[3]}>
                        <Link to={myUrl}>
                            <i className="iconfont icon-wode"></i>目录3
                        </Link>
                    </li>
                </ul>
            </footer>
        );
    }
    componentDidMount() {
        this.getMessageCount();
    }
    shouldComponentUpdate(np, ns) {
        return this.props.index !== np.index || this.state.messageCount !== ns.messageCount; //防止组件不必要的更新
    }
    componentDidUpdate() {
        this.getMessageCount();
    }
}
FooterInit.defaultProps = {
    index: 0
};


var Footer = FooterInit;

export {Footer}
/**
 * 提示登录
 *
 * @export
 * @class TipMsgSignin
 * @extends {Component}
 */
export class TipMsgSignin extends Component {
    render() {
        return (
            <div className="tip-msg-signin">
                你还未登录，请先<Link to="/signin">登录</Link>
            </div>
        );
    }
}

/**
 * 用户头像
 *
 * @export
 * @class UserHeadImg
 * @extends {Component}
 */
export class UserHeadImg extends Component {
    render() {
        return (<div className="user-headimg"  style={{ backgroundImage: 'url(' + this.props.url + ')' }}></div>)
    }
}

/**
 * 生成主题类型小图标
 *
 * @export
 * @class tabIcon
 * @extends {Component}
 */
export class TabIcon extends Component {
    render() {
        var {tab, top, good} = this.props;

        if (top) {
            tab = 'top';
        } else if (good) {
            tab = 'good';
        }

        return (
            <i className={'iconfont icon-' + tab}></i>
        );
    }
}