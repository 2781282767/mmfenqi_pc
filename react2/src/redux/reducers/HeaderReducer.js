'usr strict';
"use strict";
// import  GET_AUTH from '../actions/HeaderAction';
var Tool_1 = require('../../pub/Tool');
/**
 * 菜单父键和值,二级菜单键和值,菜单切换状态,菜单数据
 * @type {{parentActive: {parentkey: number, parentvalue: string}, childActive: {childkey: number, childvalue: string}, menuSwitch: boolean, menuList: Array}}
 */
var HeaderState = {
    LOGIN_ID: ''
};
function HeaderReducer(state, action) {
    if (state === void 0) { state = HeaderState; }
    switch (action.type) {
        case 'GET_AUTH':
            return Tool_1["default"].assign({}, state, action.state);
        default:
            return state;
    }
}
exports.__esModule = true;
exports["default"] = HeaderReducer;
