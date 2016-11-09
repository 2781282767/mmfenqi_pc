"use strict";
var redux_1 = require('redux');
var redux_thunk_1 = require('redux-thunk');
exports.__esModule = true;
exports["default"] = function () {
    var store = redux_1.compose(redux_1.applyMiddleware(redux_thunk_1["default"]))(redux_1.createStore)();
    return store;
};
