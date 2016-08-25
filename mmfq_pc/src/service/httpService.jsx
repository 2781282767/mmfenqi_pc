/**
 * Created by sheldon on 2016/8/2.
 */
'use strict';

class HttpService {
    static query(config) {
        console.log();
        config = config || {};
        var params = HttpService.formatParams(config.data);

        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                var status = request.status;
                if (status >= 200 && status < 300) {
                    var res = JSON.parse(request.responseText);
                    if (res.result == 0) {
                        config.success && config.success(res.data);
                    } else if (res.result == 1013) {
                        window.localStorage.referer = window.location.href;
                        window.location.href = 'login.html'
                    } else {
                        return config.error && config.error(res.result, res.msg)
                    }
                } else {
                    return config.fail && config.fail(status);
                }
            }
        };
        request.open('GET', config.url + "?" + params, true);
        request.send(null);
    }

    static save(config) {
        config = config || {};

        var params = HttpService.formatParams(config.data);

        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                var status = request.status;
                if (status >= 200 && status < 300) {
                    var res = JSON.parse(request.responseText);
                    toast.toaster(res.msg);
                    if (res.result == 0) {
                        config.success && config.success(res.data);
                    } else if (res.result == 1013) {
                        window.localStorage.referer = window.location.href;
                        window.location.href = 'login.html'
                    } else {
                        config.error && config.error(res.result, res.msg)
                    }
                } else {
                    config.fail && config.fail(status);
                }
            }
        };
        request.open("POST", config.url, true);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send(params);
    }

    static formatParams(data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        arr.push(("v=" + Math.random()).replace(".", ""));
        return arr.join("&");
    }

}
