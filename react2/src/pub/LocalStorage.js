"use strict";
/**
 * 本地缓存 类
 */
var LocalStorage = (function () {
    function LocalStorage() {
    }
    /**
     * 默认获取是否支持本地缓存
     * @returns {Storage}
     */
    LocalStorage.getLocalStorage = function () {
        if (!localStorage) {
            throw new Error('Need localStorage');
        }
        return localStorage;
    };
    /**
     * 添加本地缓存
     */
    LocalStorage.add = function (key, value, expired) {
        if (value === undefined) {
            value = null;
        }
        var localStorage = this.getLocalStorage();
        var _expired = this.getExp(key, expired);
        var obj = {
            data: value,
            expired: _expired,
            time: +new Date().getTime()
        };
        localStorage.setItem(key, JSON.stringify(obj));
    };
    /**
     * 获取本地缓存的KEY,过期的回调函数,返回过期前的数据.
     * @param key
     * @param callback
     * @returns {null}
       */
    LocalStorage.get = function (key, callback) {
        var localStorage = this.getLocalStorage();
        var _value = localStorage.getItem(key);
        if (_value) {
            var JSON_VALUE = JSON.parse(_value);
            var now = new Date().getTime();
            //如果过期执行的方法
            if (JSON_VALUE.expired && JSON_VALUE.expired != 0 && JSON_VALUE.expired - now < 0) {
                callback ? callback(JSON_VALUE) : function () { };
                this.remove(key);
            }
            else {
                return JSON_VALUE.data;
            }
        }
        return null;
    };
    /**
    * d更新本地缓存,存在就更新 不存在就返回NULL;
    * @param key
    * @param value
    * @param expired
      * @returns {null}
      */
    LocalStorage.update = function (key, value, expired) {
        var json = JSON.parse(localStorage.getItem(key));
        console.log(json);
        if (json != null) {
            var _expired = this.getExp(expired, key);
            var obj = {
                data: value,
                expired: _expired,
                time: +new Date().getTime()
            };
            localStorage.setItem(key, JSON.stringify(obj));
        }
        else {
            return null;
        }
    };
    /**
      * 删除相对应KEY的本地缓存
      * @param key
        */
    LocalStorage.remove = function (key) {
        var localStorage = this.getLocalStorage();
        localStorage.removeItem(key);
    };
    /**
     * 清除所有本地缓存
     */
    LocalStorage.clear = function () {
        var localStorage = this.getLocalStorage();
        localStorage.clear();
    };
    LocalStorage.getExp = function (key, expired) {
        //当过期
        if (expired == 0) {
            var _this_1 = this;
            window.onbeforeunload = function () {
                _this_1.remove(key);
            };
        }
        else if (typeof expired == 'number' || !isNaN(Number(expired))) {
            //expired = 1455033600000;
            expired = new Date(new Date().getTime() + expired * (24 * 60 * 60 * 1000)).getTime();
        }
        return expired;
    };
    return LocalStorage;
}());
exports.__esModule = true;
exports["default"] = LocalStorage;
