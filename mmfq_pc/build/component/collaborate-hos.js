/**
 * Created by ChinaHp on 2016/8/3.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_Coll_hos = function (_React$Component) {
    _inherits(R_Coll_hos, _React$Component);

    function R_Coll_hos() {
        _classCallCheck(this, R_Coll_hos);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(R_Coll_hos).call(this));

        _this.state = {
            ProvinceList: [],
            cityList: [],
            proviceId: '',
            hospitalList: []
        };
        return _this;
    }

    _createClass(R_Coll_hos, [{
        key: 'query_Allprovince',
        value: function query_Allprovince() {
            var _this2 = this;

            HttpService.query({
                url: '/pc/computer/query_Allprovince',
                success: function success(res) {
                    _this2.setState({ ProvinceList: res.provinceVOList });
                }
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.query_Allprovince();
        }
    }, {
        key: 'handleMouseout',
        value: function handleMouseout(id) {
            var _this3 = this;

            console.log(id);

            this.setState({
                proviceId: id
            });
            HttpService.query({
                url: '/pc/computer/queryCity_ByProId',
                data: { proId: id },
                success: function success(res) {
                    console.log(res);
                    _this3.setState({ cityList: res.cityList });
                }

            });
        }
    }, {
        key: 'handleClick',
        value: function handleClick(id) {
            var _this4 = this;

            HttpService.query({
                url: '/pc/computer/queryHospitalByCityIdPage',
                data: { cityId: id, currentPage: 1 },
                success: function success(res) {
                    console.log(res);
                    _this4.setState({ hospitalList: res.hospitalList });
                }

            });
        }
    }, {
        key: 'render',
        value: function render() {

            var nodes = this.state.ProvinceList.map(function (item, index) {
                return React.createElement(
                    'li',
                    { key: index },
                    React.createElement(
                        'span',
                        null,
                        item.proname
                    ),
                    React.createElement(
                        'div',
                        { className: 'itemCity' },
                        this.state.ProvinceList[index].cityList.map(function (item, index2) {
                            return React.createElement(
                                'span',
                                { key: index2, onClick: this.handleClick.bind(this, item.cityid) },
                                item.cityname
                            );
                        }.bind(this))
                    )
                );
            }.bind(this));

            return React.createElement(
                'div',
                { className: 'wrap-hos' },
                React.createElement(
                    'div',
                    { className: 'Allprovince' },
                    React.createElement(
                        'div',
                        { className: '_left' },
                        React.createElement(
                            'div',
                            null,
                            '地区:'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'right' },
                        React.createElement(
                            'ul',
                            null,
                            nodes
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'provinceContent' },
                    React.createElement(
                        'div',
                        { className: 'c_left' },
                        React.createElement('img', { src: '', alt: '' })
                    ),
                    React.createElement(
                        'div',
                        { className: 'c_right' },
                        React.createElement(
                            'p',
                            null,
                            'ssss'
                        ),
                        React.createElement(
                            'div',
                            { className: 'c_div' },
                            'ssss'
                        ),
                        React.createElement(
                            'div',
                            { className: 'c_addr' },
                            '地址:'
                        )
                    )
                )
            );
        }
    }]);

    return R_Coll_hos;
}(React.Component);