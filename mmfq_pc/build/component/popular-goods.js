"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var _createClass=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),R_PopularGoods=function(e){function t(e){_classCallCheck(this,t);var a=_possibleConstructorReturn(this,Object.getPrototypeOf(t).call(this,e));return a.state={sales:[]},a}return _inherits(t,e),_createClass(t,[{key:"componentWillMount",value:function(){this.getPorpularGoods()}},{key:"getPorpularGoods",value:function(){var e=this;$.ajax({type:"post",url:"/pc/computer/query_index_popular_goodsItem",dataType:"json",success:function(t){console.log(t),0==t.result&&e.setState({sales:t.data.goodsItemList})}})}},{key:"render",value:function(){var e=this.state.sales.map(function(e,t){return React.createElement("li",{key:t},React.createElement("a",{href:"goods-detail.html?goodsId="+e.goodsHerf,target:"_blank"},React.createElement("p",{className:"infoImg left"},React.createElement("img",{alt:"",src:e.goodsHerPic})),React.createElement("div",{className:"right"},React.createElement("p",{className:"infoItem2"},e.hotItemName),React.createElement("p",{className:"infoItem3 "},React.createElement("i",null)," ",e.hospitalName," "),React.createElement("p",{className:"price"},React.createElement("span",{className:"left"},React.createElement("i",{className:"ft18"},"￥"),React.createElement("i",{className:"ft24"},e.monthlyPrice,"x",e.staging))))))});return React.createElement("div",{className:"boxItem2 wrap clearfix hoverTab"},React.createElement("ul",{style:{display:"block"},className:"hoverCont"},e))}}]),t}(React.Component);