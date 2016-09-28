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
	
	var _map = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./Component/map\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
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

/***/ }

})
//# sourceMappingURL=0.e0e60259409a3e74e178.hot-update.js.map