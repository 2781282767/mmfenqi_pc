webpackHotUpdate(0,{

/***/ 241:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	'usr strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TabIcon = exports.UserHeadImg = exports.TipMsgSignin = exports.Footer = exports.FooterInit = exports.DataNull = exports.Header = exports.R_header = exports.DataLoad = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(173);
	
	var _Tool = __webpack_require__(238);
	
	var _Tool2 = _interopRequireDefault(_Tool);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * (加载动画)
	 *
	 * @class DataLoad
	 * @extends {Component}
	 */
	var DataLoad = exports.DataLoad = function (_Component) {
	    _inherits(DataLoad, _Component);
	
	    function DataLoad() {
	        _classCallCheck(this, DataLoad);
	
	        return _possibleConstructorReturn(this, (DataLoad.__proto__ || Object.getPrototypeOf(DataLoad)).apply(this, arguments));
	    }
	
	    _createClass(DataLoad, [{
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var loadAnimation = _props.loadAnimation;
	            var loadMsg = _props.loadMsg;
	
	            return _react2.default.createElement(
	                'div',
	                { className: 'data-load data-load-' + loadAnimation },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'msg' },
	                    loadMsg
	                )
	            );
	        }
	    }]);
	
	    return DataLoad;
	}(_react.Component);
	
	DataLoad.defaultProps = {
	    loadAnimation: true, //默认显示加载动画
	    loadMsg: '正在加载中'
	};
	
	var R_header = exports.R_header = function (_Component2) {
	    _inherits(R_header, _Component2);
	
	    function R_header() {
	        _classCallCheck(this, R_header);
	
	        return _possibleConstructorReturn(this, (R_header.__proto__ || Object.getPrototypeOf(R_header)).apply(this, arguments));
	    }
	
	    _createClass(R_header, [{
	        key: 'render',
	        value: function render() {}
	    }]);
	
	    return R_header;
	}(_react.Component);
	
	/**
	 * 公共头部
	 *
	 * @export
	 * @class Header
	 * @extends {Component}
	 */
	
	var Header = exports.Header = function (_Component3) {
	    _inherits(Header, _Component3);
	
	    function Header() {
	        _classCallCheck(this, Header);
	
	        return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
	    }
	
	    _createClass(Header, [{
	        key: 'render',
	        value: function render() {
	            var _props2 = this.props;
	            var title = _props2.title;
	            var leftTo = _props2.leftTo;
	            var leftIcon = _props2.leftIcon;
	            var rightTo = _props2.rightTo;
	            var rightIcon = _props2.rightIcon;
	            var rightClick = _props2.rightClick;
	
	            var left = null;
	
	            if (leftTo && leftIcon) {
	                left = _react2.default.createElement(
	                    _reactRouter.Link,
	                    { to: leftTo },
	                    _react2.default.createElement('i', { className: 'iconfont icon-' + leftIcon })
	                );
	            } else if (leftIcon === 'fanhui') {
	                //返回上一页
	                left = _react2.default.createElement(
	                    'a',
	                    { onClick: this.context.router.goBack },
	                    _react2.default.createElement('i', { className: 'iconfont icon-' + leftIcon })
	                );
	            }
	
	            var right = null;
	            if (rightTo && rightIcon) {
	                right = _react2.default.createElement(
	                    _reactRouter.Link,
	                    { to: rightTo },
	                    _react2.default.createElement('i', { className: 'iconfont icon-' + rightIcon })
	                );
	            } else if (rightClick && rightIcon) {
	                right = _react2.default.createElement(
	                    'div',
	                    { onClick: rightClick },
	                    _react2.default.createElement('i', { className: 'iconfont icon-' + rightIcon })
	                );
	            }
	            return _react2.default.createElement(
	                'header',
	                { className: 'common-header', 'data-flex': true },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'icon', 'data-flex': 'main:center cross:center', 'data-flex-box': '0' },
	                    left
	                ),
	                _react2.default.createElement(
	                    'h2',
	                    { className: 'title', 'data-flex-box': '1' },
	                    title
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'icon', 'data-flex': 'main:center cross:center', 'data-flex-box': '0' },
	                    right
	                )
	            );
	        }
	    }]);
	
	    return Header;
	}(_react.Component);
	
	Header.contextTypes = {
	    router: _react2.default.PropTypes.object.isRequired
	};
	
	/**
	 * 暂无记录
	 *
	 * @export
	 * @class DataNull
	 * @extends {Component}
	 */
	
	var DataNull = exports.DataNull = function (_Component4) {
	    _inherits(DataNull, _Component4);
	
	    function DataNull() {
	        _classCallCheck(this, DataNull);
	
	        return _possibleConstructorReturn(this, (DataNull.__proto__ || Object.getPrototypeOf(DataNull)).apply(this, arguments));
	    }
	
	    _createClass(DataNull, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                null,
	                '暂无记录'
	            );
	        }
	    }]);
	
	    return DataNull;
	}(_react.Component);
	
	/**
	 * 底部导航菜单
	 *
	 * @export
	 * @class Footer
	 * @extends {Component}
	 */
	
	
	var FooterInit = exports.FooterInit = function (_Component5) {
	    _inherits(FooterInit, _Component5);
	
	    function FooterInit(props) {
	        _classCallCheck(this, FooterInit);
	
	        var _this5 = _possibleConstructorReturn(this, (FooterInit.__proto__ || Object.getPrototypeOf(FooterInit)).call(this, props));
	
	        _this5.state = {
	            messageCount: 0
	        };
	
	        _this5.getMessageCount = function () {
	            var accesstoken = _this5.props.User ? _this5.props.User.accesstoken : '';
	            if (accesstoken) {
	                _Tool2.default.get('/api/v1/message/count', { accesstoken: accesstoken }, function (res) {
	                    _this5.setState({
	                        messageCount: res.data
	                    });
	                });
	            }
	        };
	        return _this5;
	    }
	
	    _createClass(FooterInit, [{
	        key: 'render',
	        value: function render() {
	            var myUrl = this.props.User && this.props.User.loginname ? '/user/' + this.props.User.loginname : '/signin';
	            var arr = [];
	            arr[this.props.index] = 'on';
	            return _react2.default.createElement(
	                'footer',
	                { className: 'common-footer' },
	                _react2.default.createElement('div', { className: 'zhanwei' }),
	                _react2.default.createElement(
	                    'ul',
	                    { className: 'menu', 'data-flex': 'box:mean' },
	                    _react2.default.createElement(
	                        'li',
	                        { className: arr[0] },
	                        _react2.default.createElement(
	                            _reactRouter.Link,
	                            { to: '/' },
	                            _react2.default.createElement('i', { className: 'iconfont icon-shouye' }),
	                            '首页'
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'li',
	                        { className: arr[1] },
	                        _react2.default.createElement(
	                            _reactRouter.Link,
	                            { to: '/about' },
	                            _react2.default.createElement('i', { className: 'iconfont icon-fabu' }),
	                            '目录1'
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'li',
	                        { className: arr[2] },
	                        _react2.default.createElement(
	                            _reactRouter.Link,
	                            { to: '/my/messages' },
	                            _react2.default.createElement('i', { className: 'iconfont icon-xiaoxi' }),
	                            '目录2',
	                            this.state.messageCount > 0 ? _react2.default.createElement(
	                                'em',
	                                null,
	                                this.state.messageCount
	                            ) : ''
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'li',
	                        { className: arr[3] },
	                        _react2.default.createElement(
	                            _reactRouter.Link,
	                            { to: myUrl },
	                            _react2.default.createElement('i', { className: 'iconfont icon-wode' }),
	                            '目录3'
	                        )
	                    )
	                )
	            );
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.getMessageCount();
	        }
	    }, {
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate(np, ns) {
	            return this.props.index !== np.index || this.state.messageCount !== ns.messageCount; //防止组件不必要的更新
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	            this.getMessageCount();
	        }
	    }]);
	
	    return FooterInit;
	}(_react.Component);
	
	FooterInit.defaultProps = {
	    index: 0
	};
	
	var Footer = FooterInit;
	
	exports.Footer = Footer;
	/**
	 * 提示登录
	 *
	 * @export
	 * @class TipMsgSignin
	 * @extends {Component}
	 */
	
	var TipMsgSignin = exports.TipMsgSignin = function (_Component6) {
	    _inherits(TipMsgSignin, _Component6);
	
	    function TipMsgSignin() {
	        _classCallCheck(this, TipMsgSignin);
	
	        return _possibleConstructorReturn(this, (TipMsgSignin.__proto__ || Object.getPrototypeOf(TipMsgSignin)).apply(this, arguments));
	    }
	
	    _createClass(TipMsgSignin, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: 'tip-msg-signin' },
	                '你还未登录，请先',
	                _react2.default.createElement(
	                    _reactRouter.Link,
	                    { to: '/signin' },
	                    '登录'
	                )
	            );
	        }
	    }]);
	
	    return TipMsgSignin;
	}(_react.Component);
	
	/**
	 * 用户头像
	 *
	 * @export
	 * @class UserHeadImg
	 * @extends {Component}
	 */
	
	
	var UserHeadImg = exports.UserHeadImg = function (_Component7) {
	    _inherits(UserHeadImg, _Component7);
	
	    function UserHeadImg() {
	        _classCallCheck(this, UserHeadImg);
	
	        return _possibleConstructorReturn(this, (UserHeadImg.__proto__ || Object.getPrototypeOf(UserHeadImg)).apply(this, arguments));
	    }
	
	    _createClass(UserHeadImg, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement('div', { className: 'user-headimg', style: { backgroundImage: 'url(' + this.props.url + ')' } });
	        }
	    }]);
	
	    return UserHeadImg;
	}(_react.Component);
	
	/**
	 * 生成主题类型小图标
	 *
	 * @export
	 * @class tabIcon
	 * @extends {Component}
	 */
	
	
	var TabIcon = exports.TabIcon = function (_Component8) {
	    _inherits(TabIcon, _Component8);
	
	    function TabIcon() {
	        _classCallCheck(this, TabIcon);
	
	        return _possibleConstructorReturn(this, (TabIcon.__proto__ || Object.getPrototypeOf(TabIcon)).apply(this, arguments));
	    }
	
	    _createClass(TabIcon, [{
	        key: 'render',
	        value: function render() {
	            var _props3 = this.props;
	            var tab = _props3.tab;
	            var top = _props3.top;
	            var good = _props3.good;
	
	
	            if (top) {
	                tab = 'top';
	            } else if (good) {
	                tab = 'good';
	            }
	
	            return _react2.default.createElement('i', { className: 'iconfont icon-' + tab });
	        }
	    }]);
	
	    return TabIcon;
	}(_react.Component);

/***/ }

})
//# sourceMappingURL=0.6638cd6545de206fe9cf.hot-update.js.map