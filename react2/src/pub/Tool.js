"use strict";
// import Toast from '../components/toast/Toast';
// const TelBaseUrl = Config.TelBaseUrl;
/*--服务类AJAX--*/
function likeArray(obj) { return typeof obj.length == 'number'; }
/*-工具类-*/
var Tool = (function () {
    function Tool() {
    }
    /**
     * 实现跳转功能，参数为跳转的路径 exLinks 为true 需传入整个URL 如:http://www.baidu.com
     */
    Tool.goPush = function (path) {
        console.log(path);
        if (path.indexOf('http') != -1) {
            window.location.href = path;
            return false;
        }
        // window.location.href = TelBaseUrl + path + '.html';
    };
    /**
     * 多个对象合并
     */
    Tool.assign = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        /*if(Object.assign){
         return Object.assign({},...args)
         }*/
        var from, target = args[0] || {}, length = args.length;
        for (var i = 0; i < length; i++) {
            if ((from = args[i]) != null) {
                for (var key in from) {
                    target[key] = from[key];
                }
            }
        }
        return target;
    };
    Tool.each = function (elements, callback) {
        var i, key;
        //如果是数组
        if (likeArray(elements)) {
            for (i = 0; i < elements.length; i++) {
                if (callback.call(elements[i], i, elements[i]) === false)
                    return elements;
            }
        }
        else {
            for (key in elements)
                if (callback.call(elements[key], key, elements[key]) === false)
                    return elements;
        }
        return elements;
    };
    /**
     * 判断否个对象是否存在这个键值
     */
    Tool.hasPrototype = function (object, name) {
        return object.hasOwnProperty ? object.hasOwnProperty(name) : (name in object);
    };
    /**
     * 判断一个样式是否存在
     * @param ele
     * @param cls
     * @returns {RegExpMatchArray}
     */
    Tool.hasClass = function (ele, cls) {
        return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    };
    /**
     * 添加样式
     * @param ele
     * @param cls
     */
    Tool.addClass = function (ele, cls) {
        if (!this.hasClass(ele, cls))
            ele.className += " " + cls;
    };
    /**
     * 删除样式
     * @param ele
     * @param cls
     */
    Tool.removeClass = function (ele, cls) {
        if (this.hasClass(ele, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            ele.className = ele.className.replace(reg, ' ');
        }
    };
    /**
     * 添加删除样式
     * @param ele
     * @param cls
     */
    Tool.toggleClass = function (ele, cls) {
        if (this.hasClass(ele, cls)) {
            this.removeClass(ele, cls);
        }
        else {
            this.addClass(ele, cls);
        }
    };
    /**
     * 获取?后面所有参数
     */
    Tool.getUrlParams = function () {
        var url = window.location.search;
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    };
    /**
     * 简易的内置验证
     */
    Tool.verifier = function (verifier) {
        var key = { isOk: true, tips: '' };
        verifier.forEach(function (item, index) {
            if (item.value.toString().trim().length <= 0) {
                key = { isOk: false, tips: item.tips };
                return false;
            }
        });
        return key;
    };
    //返回?后面指定的参数
    Tool.getQueryString = function (Paras) {
        return this.getUrlParams()[Paras];
    };
    return Tool;
}());
exports.__esModule = true;
exports["default"] = Tool;
