"use strict";
var LocalStorage_1 = require('../../pub/LocalStorage');
var menu_1 = require('./menu');
var now_url = window.location.href.match(/(?:\w*)(?=.html)/);
/**
 * 菜单初始化获取值
 */
var BASE_MENU = 'BASE_MENU';
exports.BASE_MENU = BASE_MENU;
/**
 * 切换菜单状态
 */
var SWITCH_MENU = 'SWITCH_MENU';
exports.SWITCH_MENU = SWITCH_MENU;
/**
 * 菜单热点
 */
var GET_ACTIVE = 'GET_ACTIVE';
exports.GET_ACTIVE = GET_ACTIVE;
/**
    高亮菜单
**/
var ACTIVE_MENU = 'ACTIVE_MENU';
exports.ACTIVE_MENU = ACTIVE_MENU;
/**
    动态修改菜单高亮部分
**/
var CHANGE_ACTIVE = 'CHANGE_ACTIVE';
exports.CHANGE_ACTIVE = CHANGE_ACTIVE;
/**
 * 显示菜单视图
 */
var OnGetMenu = function (state) {
    return { type: BASE_MENU, state: state };
};
/**
 * 切换菜单视图
 */
var switchMenu = function (menuSwitch) {
    return { type: SWITCH_MENU, menuSwitch: menuSwitch };
};
exports.switchMenu = switchMenu;
var OnchangeActive = function (active) {
    return { type: CHANGE_ACTIVE, active: active };
};
/**
 * 保存当前父热点状态
 */
var saveParentActive = function (saveData) {
    LocalStorage_1["default"].add('cw_parent_active', saveData);
};
exports.saveParentActive = saveParentActive;
/**
 * 保存当前子热点状态
 */
var saveChildActive = function (saveData) {
    //console.log(saveData);
    LocalStorage_1["default"].add('cw_child_active', saveData);
};
exports.saveChildActive = saveChildActive;
/**
 * 获取本地存储的状态
 */
var changeActiveAction = function () {
    return function (dispatch, getState) {
        var parentActive = LocalStorage_1["default"].get('cw_parent_active');
        var childActive = LocalStorage_1["default"].get('cw_child_active');
        var menuActivea = {};
        if (parentActive && childActive) {
            menuActivea.parent = parentActive.parentkey;
            menuActivea.child = childActive.childkey;
            dispatch(OnchangeActive(menuActivea));
        }
        else {
            menu_1["default"].menuList.map(function (v, i) {
                /**
                 * 处理一级菜单
                 */
                if (now_url[0] === v.url) {
                    menuActivea.parent = i;
                    menuActivea.child = -1;
                    dispatch(OnchangeActive(menuActivea));
                }
                /**
                 * 处理二级菜单
                 */
                if (v.url == '#' && v.subMunu.length > 0) {
                    v.subMunu.map(function (j, index) {
                        if (now_url[0] === j.url) {
                            menuActivea.parent = i;
                            menuActivea.child = index;
                            dispatch(OnchangeActive(menuActivea));
                        }
                    });
                }
            });
        }
    };
};
exports.changeActiveAction = changeActiveAction;
/**
 * 获取菜单数据，如果存在读取本地数据。
 */
function getMenuAction(reddit) {
    return function (dispatch, getState) {
        var _data = LocalStorage_1["default"].get('cw_menu');
        /**
         * 如果本地存在就取本地数据，否则获取服务器数据。
         */
        /*if (_data) {
            dispatch(OnGetMenu(_data));
            return false;
        }*/
        LocalStorage_1["default"].add('cw_menu', menu_1["default"]);
        dispatch(OnGetMenu(menu_1["default"]));
    };
}
exports.getMenuAction = getMenuAction;
