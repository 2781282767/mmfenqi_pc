webpackHotUpdate(0,{

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
	        key: 'getCurrentPower',
	        value: function getCurrentPower() {}
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            MapIndex.doLogin(function () {});
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
	    }], [{
	        key: 'doLogin',
	        value: function doLogin(_success) {
	            var _this2 = this;
	
	            _Http2.default.query({
	                url: '/apph5/user/login',
	                data: { sid: 'O5QaeMlrCNPI91Ux016a1IOKub3DeOowT9EugDMYn4L7jOxTD2E-sY6V9Tgpk0uoiQk4DX2WP2qyFOllkciZXYg_ObvxmG6niYR3_DMF728Ul0HRb5qd2cDZdLwinOeZVL6BROmg-V0W5BcCRJvGhg' },
	                success: function success(res) {
	                    console.log(res);
	                    if (res.code == 30010) {
	                        _this2.setState({
	                            token: res.data.token
	                        });
	
	                        return _success();
	                    }
	                }
	            });
	        }
	    }, {
	        key: 'getDeviceList',
	        value: function getDeviceList() {
	            _Http2.default.query({
	                url: '/app/object/getBabys',
	                data: { token: this.state.token },
	                success: function success(res) {
	                    console.log(res);
	                }
	            });
	        }
	    }]);
	
	    return MapIndex;
	}(_react2.default.Component);
	
	exports.default = MapIndex;

/***/ }

})
//# sourceMappingURL=0.d80f8c74f4b8e167ff14.hot-update.js.map