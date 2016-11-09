"use strict";
var MenuAction_1 = require('../actions/MenuAction');
var Tool_1 = require('../../pub/Tool');
/**
 * 菜单父键和值,二级菜单键和值,菜单切换状态,菜单数据
 * @type {{parentActive: {parentkey: number, parentvalue: string}, childActive: {childkey: number, childvalue: string}, menuSwitch: boolean, menuList: Array}}
 */
var MenuState = {
    active: { parent: -1, child: -1 },
    menuSwitch: true,
    menuList: []
};
function MenuReducers(state, action) {
    if (state === void 0) { state = MenuState; }
    switch (action.type) {
        case MenuAction_1.BASE_MENU:
            return Tool_1["default"].assign({}, state, action.state);
        case MenuAction_1.SWITCH_MENU:
            return Tool_1["default"].assign({}, state, { menuSwitch: action.menuSwitch });
        case MenuAction_1.CHANGE_ACTIVE:
            return Tool_1["default"].assign({}, state, { active: action.active });
        default:
            return state;
    }
}
exports.__esModule = true;
exports["default"] = MenuReducers;
