"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var ReactDOM = require("react-dom");
var BaseStore_1 = require('../redux/store/BaseStore');
var store = BaseStore_1["default"]();
var Hello = (function (_super) {
    __extends(Hello, _super);
    function Hello() {
        _super.apply(this, arguments);
    }
    Hello.prototype.render = function () {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    };
    return Hello;
}(React.Component));
exports.Hello = Hello;
var ElementContainer = document.getElementById("content");
ReactDOM.render(<Hello compiler="TypeScript" framework="React"/>, ElementContainer);
