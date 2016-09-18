// /**
//  * Created by next on 16/9/18.
//  */
// function query(config) {
//     console.log();
//     config = config || {};
//     var params = formatParams(config.data);
//
//     var request = new XMLHttpRequest();
//     request.onreadystatechange = function () {
//         if (request.readyState == 4) {
//             var status = request.status;
//             if (status >= 200 && status < 300) {
//                 var res = JSON.parse(request.responseText);
//                 console.log(res);
//                 if (!!res.code) {
//                     config.success && config.success(res.data);
//                 } else if (res.code == 1013) {
//                     window.localStorage.referer = window.location.href;
//                     window.location.href = 'login.html'
//                 } else {
//                     Toast(res.msg,3000);
//                     return config.error && config.error(res.code, res.msg)
//                 }
//             } else {
//                 return config.fail && config.fail(status);
//             }
//         }
//     };
//     request.open('GET', config.url + "?" + params, true);
//     request.send(null);
// }
//
// function save(config) {
//     config = config || {};
//
//     var params = formatParams(config.data);
//
//     var request = new XMLHttpRequest();
//     request.onreadystatechange = function () {
//         if (request.readyState == 4) {
//             var status = request.status;
//             if (status >= 200 && status < 300) {
//                 var res = JSON.parse(request.responseText);
//                 console.log(res);
//                 if (res.code) {
//                     config.success && config.success(res.data);
//                 } else if (res.code == 1013) {
//                     window.localStorage.referer = window.location.href;
//                     window.location.href = 'login.html'
//                 } else {
//                     Toast(res.msg,3000);
//                     config.error && config.error(res.code, res.msg)
//                 }
//             } else {
//                 config.fail && config.fail(status);
//             }
//         }
//     };
//     request.open("POST", config.url, true);
//     request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//     request.send(params);
// }
//
// function  formatParams(data) {
//     var arr = [];
//     for (var name in data) {
//         arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
//     }
//     arr.push(("v=" + Math.random()).replace(".", ""));
//     return arr.join("&");
// }



// angular.module('myApp')
//     .service('scanDeviceService',['$resource',
//     function ($resource) {
//         return {
//             scanDeviceInfo: function () {
//                 return $resource('/app/device/scanDevice', {}, {
//                     query: {
//                         method: 'GET', params: {}
//                     }
//                 })
//             },
//             generateSMSCode: function () {
//                 return $resource('/app/device/generateSMSCode', {}, {
//                     save: {
//                         method: 'POST', params: {}
//                     }
//                 })
//             },
//         }}]);