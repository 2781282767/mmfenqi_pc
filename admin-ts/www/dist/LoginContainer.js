webpackJsonp([3],{0:function(t,e,n){(function(t){!function(){var e=n(13),a=n(14),o=n(7),r=n(1);t.makeHot=t.hot.data?t.hot.data.makeHot:e(function(){return a.getRootInstances(o)},r)}();try{(function(){"use strict";function t(t){return t&&t.__esModule?t:{default:t}}function e(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(e,n,a){return n&&t(e.prototype,n),a&&t(e,a),e}}(),u=n(1),c=e(u),s=n(16),l=e(s),f=n(238),p=t(f),m=n(1272),d=n(89),h=n(1271),v=t(h),g=(p.default.TelBaseUrl,{accout:{name:"用户",require:!0},password:{name:"密码",require:!0}}),y=function(t){function e(t){a(this,e);var n=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.submitDate={accout:"",password:""},n.state={type:1},n}return r(e,t),i(e,[{key:"sublimeButton",value:function(t){t.preventDefault();var e=v.default.verifyConfig(this.submitDate,g,!0);if(e.length>0)return(0,d.Tips)({message:e[0].tips,type:2}),!1;var n=this.submitDate.accout,a=this.submitDate.password;(0,m.LoginAction)(n,a)}},{key:"valueChange",value:function(t,e){this.submitDate[t]=e}},{key:"createLogin",value:function(){var t=this;return c.createElement("div",null,c.createElement("div",{className:"login-item"},c.createElement("span",{className:"item-icon"},c.createElement(d.Icon,{type:"zh"})),c.createElement(d.InputText,{type:"test",placeholder:"请输入您的用户名",onChange:function(e){return t.valueChange("accout",e.target.value)}})),c.createElement("form",{action:"#",onSubmit:this.sublimeButton.bind(this)},c.createElement("div",{className:"login-item"},c.createElement("span",{className:"item-icon"},c.createElement(d.Icon,{type:"mm"})),c.createElement(d.InputText,{type:"password",placeholder:"请输入您的用户名",onChange:function(e){return t.valueChange("password",e.target.value)}})),c.createElement("div",{className:"login-btn-box"},c.createElement(d.Buttons,{type:"primary",display:"block"},"登录"))))}},{key:"createRegistered",value:function(){return c.createElement("div",null,"我是注册面板")}},{key:"changeType",value:function(t){this.setState({type:t})}},{key:"render",value:function(){var t=this,e=function(){return 1==t.state.type?t.createLogin():t.createRegistered()};return c.createElement("div",null,c.createElement("div",{className:"login-header"},c.createElement("span",{className:1==this.state.type?"on":"",onClick:function(){t.changeType(1)}}," 登录"),c.createElement("b",{className:"line"}),c.createElement("span",{className:2==this.state.type?"on":"",onClick:function(){t.changeType(2)}}," 注册")),e())}},{key:"componentDidMount",value:function(){}},{key:"componentWillUnmount",value:function(){}}]),e}(c.Component),b=document.getElementById("example");l.render(c.createElement(y,null),b)}).call(this)}finally{!function(){var e=t.hot.data&&t.hot.data.foundReactClasses||!1;if(t.exports&&t.makeHot){var a=n(15);a(t,n(1))&&(e=!0);var o=e;o&&t.hot.accept(function(t){t&&console.error("Cannot not apply hot update to LoginContainer.tsx: "+t.message)})}t.hot.dispose(function(n){n.makeHot=t.makeHot,n.foundReactClasses=e})}()}}).call(e,n(12)(t))},1271:function(t,e,n){(function(t){!function(){var e=n(13),a=n(14),o=n(7),r=n(1);t.makeHot=t.hot.data?t.hot.data.makeHot:e(function(){return a.getRootInstances(o)},r)}();try{(function(){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t={require:{test:function(t,e){return!e||!!t&&t.toString().trim().length>0},tip:"不能为空"},password:{test:function(t,e){return!e||!!t&&t.toString().trim().length>0},tip:"不能为空"},minLength:{test:function(t,e){return t&&t.toString().trim().length>=e},tip:"长度不能小于{value}位"},maxLength:{test:function(t,e){return t&&t.toString().trim().length<e},tip:"长度不能大于{value}位"},number:{test:function(t){return/^\d+$/.test(t.toString().trim())},tip:"只能为数字"},mobile:{test:function(t){return t&&/^((1[378][0-9]{9})|(15[89][0-9]{8}))$/.test(t.toString().trim())},tip:"手机号码格式不正确"},email:{test:function(t){return t&&/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(t.toString().trim())},tip:"格式不对"},select:{test:function(t,e){return t!=e},tip:"不能为空"},group:{test:function(t,e){return parseInt(t.length)+1>e},tip:"选择不能小于{value}个"},bank:{test:function(t){return t&&/^\d{16}|\d{19}$/.test(t.toString().trim())},tip:"格式不对"}},n=function(e,n,a){if("test"===e)return!(a.test&&!a.test(n))||a.tip||"fail";var o=t[e];if(o&&o.test){var r=o.test(n,a);if(!r)return o.tip.replace("{value}",a)}return!0},a=function(t,e){var a=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=[];for(var r in e){var i=e[r];for(var u in i){var c=i[u],s=n(u,t[r],c);if("string"==typeof s){var l=i.name+s;if(l={name:r,tips:l},a)return[l];o.push(l)}}}return o},o={verifyConfig:a,verify:n};e.default=o}).call(this)}finally{!function(){var e=t.hot.data&&t.hot.data.foundReactClasses||!1;if(t.exports&&t.makeHot){var a=n(15);a(t,n(1))&&(e=!0);var o=e;o&&t.hot.accept(function(t){t&&console.error("Cannot not apply hot update to Verifier.ts: "+t.message)})}t.hot.dispose(function(n){n.makeHot=t.makeHot,n.foundReactClasses=e})}()}}).call(e,n(12)(t))},1272:function(t,e,n){(function(t){!function(){var e=n(13),a=n(14),o=n(7),r=n(1);t.makeHot=t.hot.data?t.hot.data.makeHot:e(function(){return a.getRootInstances(o)},r)}();try{(function(){"use strict";function t(t){return t&&t.__esModule?t:{default:t}}function a(t,e){if("admin"==t&&"123456"==e){var n={AdvAccount_ID:35,CityID:115,LOGIN_ID:"admin",ROLE_ID:17,USER_ID:154,pass:!0};return u.default.add("cw_auth",n),console.log(22),r.default.goPush("api"),!1}(0,c.Tips)({message:"账号或者密码错误",type:2})}Object.defineProperty(e,"__esModule",{value:!0}),e.LoginAction=void 0;var o=n(46),r=t(o),i=n(128),u=t(i),c=n(89);e.LoginAction=a}).call(this)}finally{!function(){var e=t.hot.data&&t.hot.data.foundReactClasses||!1;if(t.exports&&t.makeHot){var a=n(15);a(t,n(1))&&(e=!0);var o=e;o&&t.hot.accept(function(t){t&&console.error("Cannot not apply hot update to LoginAction.ts: "+t.message)})}t.hot.dispose(function(n){n.makeHot=t.makeHot,n.foundReactClasses=e})}()}}).call(e,n(12)(t))}});