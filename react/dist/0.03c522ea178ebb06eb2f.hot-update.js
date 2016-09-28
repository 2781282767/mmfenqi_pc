webpackHotUpdate(0,{

/***/ 236:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(173);
	
	var _map = __webpack_require__(237);
	
	var _map2 = _interopRequireDefault(_map);
	
	var _about = __webpack_require__(246);
	
	var _about2 = _interopRequireDefault(_about);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //首页
	
	/**
	 * (路由根目录组件，显示当前符合条件的组件)
	 * 
	 * @class Roots
	 * @extends {Component}
	 */
	var Roots = function (_Component) {
	    _inherits(Roots, _Component);
	
	    function Roots() {
	        _classCallCheck(this, Roots);
	
	        return _possibleConstructorReturn(this, (Roots.__proto__ || Object.getPrototypeOf(Roots)).apply(this, arguments));
	    }
	
	    _createClass(Roots, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                null,
	                this.props.children
	            );
	        }
	    }]);
	
	    return Roots;
	}(_react.Component);
	
	var history = process.env.NODE_ENV !== 'production' ? _reactRouter.browserHistory : _reactRouter.hashHistory;
	
	var RouteConfig = _react2.default.createElement(
	    _reactRouter.Router,
	    { history: history },
	    _react2.default.createElement(
	        _reactRouter.Route,
	        { path: '/', component: Roots },
	        _react2.default.createElement(_reactRouter.IndexRoute, { component: _map2.default }),
	        _react2.default.createElement(_reactRouter.Route, { path: 'about', component: _about2.default })
	    )
	);
	
	exports.default = RouteConfig;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },

/***/ 237:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	'usr strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(35);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _Http = __webpack_require__(255);
	
	var _Http2 = _interopRequireDefault(_Http);
	
	var _Tool = __webpack_require__(238);
	
	var _Tool2 = _interopRequireDefault(_Tool);
	
	var _index = __webpack_require__(241);
	
	__webpack_require__(242);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MapIndex = function (_React$Component) {
	    _inherits(MapIndex, _React$Component);
	
	    function MapIndex(props) {
	        _classCallCheck(this, MapIndex);
	
	        var _this = _possibleConstructorReturn(this, (MapIndex.__proto__ || Object.getPrototypeOf(MapIndex)).call(this, props));
	
	        _this.state = {
	            lng: '120.153576',
	            lat: '30.287459',
	            babyid: '',
	            token: '',
	            babyName: '',
	            babytelephone: ''
	
	        };
	        return _this;
	    }
	
	    _createClass(MapIndex, [{
	        key: 'doLogin',
	        value: function doLogin() {
	            _Http2.default.query({
	                url: '/apph5/user/login',
	                data: { sid: 'O5QaeMlrCNPI91Ux016a1IOKub3DeOowT9EugDMYn4L7jOxTD2E-sY6V9Tgpk0uoiQk4DX2WP2qyFOllkciZXYg_ObvxmG6niYR3_DMF728Ul0HRb5qd2cDZdLwinOeZVL6BROmg-V0W5BcCRJvGhg' },
	                success: function success(res) {
	                    console.log(res);
	                }
	            });
	        }
	    }, {
	        key: 'getDeviceList',
	        value: function getDeviceList() {}
	    }, {
	        key: 'getCurrentPower',
	        value: function getCurrentPower() {}
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	
	            _Http2.default.query({
	                url: '/apph5/user/login',
	                data: { sid: 'O5QaeMlrCNPI91Ux016a1IOKub3DeOowT9EugDMYn4L7jOxTD2E-sY6V9Tgpk0uoiQk4DX2WP2qyFOllkciZXYg_ObvxmG6niYR3_DMF728Ul0HRb5qd2cDZdLwinOeZVL6BROmg-V0W5BcCRJvGhg' },
	                success: function success(res) {
	                    console.log(res);
	                }
	            });
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.init();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var lng = this.state.lng;
	            var lat = this.state.lat;
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement('div', { id: 'container', style: { width: '100%', height: '30rem' } }),
	                _react2.default.createElement(
	                    'a',
	                    { href: 'tel:13657086451' },
	                    '电话'
	                ),
	                _react2.default.createElement(
	                    'button',
	                    { className: 'demo', onClick: this.getLocation.bind(this, lng, lat) },
	                    '定位'
	                ),
	                _react2.default.createElement(_index.FooterInit, { index: '0' })
	            );
	        }
	    }, {
	        key: 'getLocation',
	        value: function getLocation(lng, lat) {
	
	            this.setState({
	                lag: lng,
	                lat: lat
	            });
	            this.init();
	        }
	    }, {
	        key: 'init',
	        value: function init() {
	            var mapObj, marker;
	            mapObj = new AMap.Map('container', {
	                zoom: 15,
	                center: [this.state.lng, this.state.lat],
	                resizeEnable: true
	            });
	
	            marker = new AMap.Marker({
	                icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
	                position: [120.153576, 30.287459]
	            });
	            marker.setMap(mapObj);
	        }
	    }]);
	
	    return MapIndex;
	}(_react2.default.Component);
	
	exports.default = MapIndex;

/***/ },

/***/ 242:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 255:
/***/ function(module, exports) {

	'use strict';
	'usr strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var HttpService = function () {
	    function HttpService() {
	        _classCallCheck(this, HttpService);
	    }
	
	    _createClass(HttpService, null, [{
	        key: 'query',
	        value: function query(config) {
	            console.log();
	            config = config || {};
	            var params = HttpService.formatParams(config.data);
	
	            var request = new XMLHttpRequest();
	            request.onreadystatechange = function () {
	                if (request.readyState == 4) {
	                    var status = request.status;
	                    if (status >= 200 && status < 300) {
	                        var res = JSON.parse(request.responseText);
	
	                        if (res) {
	                            config.success && config.success(res);
	                        }
	                        // if (res.result == 0) {
	                        //     config.success && config.success(res.data);
	                        // } else if (res.result == 1013) {
	                        //     window.localStorage.referer = window.location.href;
	                        //     window.location.href = 'login.html'
	                        // } else {
	                        //     return config.error && config.error(res.result, res.msg)
	                        // }
	                    } else {
	                        return config.fail && config.fail(status);
	                    }
	                }
	            };
	            request.open('GET', config.url + "?" + params, true);
	            request.send(null);
	        }
	    }, {
	        key: 'save',
	        value: function save(config) {
	            config = config || {};
	
	            var params = HttpService.formatParams(config.data);
	
	            var request = new XMLHttpRequest();
	            request.onreadystatechange = function () {
	                if (request.readyState == 4) {
	                    var status = request.status;
	                    if (status >= 200 && status < 300) {
	                        var res = JSON.parse(request.responseText);
	                        toast.toaster(res.msg);
	                        if (res.result == 0) {
	                            config.success && config.success(res.data);
	                        } else if (res.result == 1013) {
	                            window.localStorage.referer = window.location.href;
	                            window.location.href = 'login.html';
	                        } else {
	                            config.error && config.error(res.result, res.msg);
	                        }
	                    } else {
	                        config.fail && config.fail(status);
	                    }
	                }
	            };
	            request.open("POST", config.url, true);
	            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	            request.send(params);
	        }
	    }, {
	        key: 'formatParams',
	        value: function formatParams(data) {
	            var arr = [];
	            for (var name in data) {
	                arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
	            }
	            arr.push(("v=" + Math.random()).replace(".", ""));
	            return arr.join("&");
	        }
	    }]);
	
	    return HttpService;
	}();
	
	exports.default = HttpService;

/***/ }

})
//# sourceMappingURL=0.03c522ea178ebb06eb2f.hot-update.js.map