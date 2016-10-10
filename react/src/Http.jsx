'usr strict';
export  class HttpService {
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

                    if(res){
                        config.success && config.success(res);
                    }
                    // if (res.result == 0) {
                    //     config.success && config.success(res.data);
                    // } else if (res.result == 1013) {
                    //     window.localStorage.referer = window.location.href;
                    //     window.location.href = 'login.html'
                    // } else {
                    //     return config.error && config.error(res.result, res.msg)
                    // }
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

                    if(res){
                        config.success && config.success(res);
                    }

                   //  console.log(res.msg)
                   // // Toast.toaster(res.msg);
                   //  if (res.result == 0) {
                   //      config.success && config.success(res.data);
                   //  } else if (res.result == 1013) {
                   //      window.localStorage.referer = window.location.href;
                   //      window.location.href = 'login.html'
                   //  } else {
                   //      config.error && config.error(res.result, res.msg)
                   //  }
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

export  class Toast{
    static toast(msg,duration){
        duration=isNaN(duration)?3000:duration;
        var m = document.createElement('div');
        m.innerHTML = msg;
        m.style.cssText="width:20rem;opacity:0.5; height:40px; color:#fff; line-height:40px; " +
            "text-align:center; border-radius:1rem; position:fixed; bottom:5rem; left:50%; z-index:999999; " +
            "font-weight:bold; filter: alpha(opacity=80); background: #000;margin-left: -10rem;";
        document.body.appendChild(m);
        setTimeout(function() {
            var d = 0.5;
            m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
            m.style.opacity = '0';
            setTimeout(function() { document.body.removeChild(m) }, d * 1000);
        }, duration);
    }
}