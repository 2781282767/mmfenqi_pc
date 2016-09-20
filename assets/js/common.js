function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

function getJsonValue(url){
    var result;
    $.ajax({
        type : "post",
        async:false,
        url : url,
        scriptCharset: 'utf-8',
        dataType : "json",
        success : function(data){
            result = data;
            console.log(data);
        },
        error:function(){
            return;
        }
    });
    return result;
}


function getJson(url) {
    $.ajax({url : url, async : true}).success( function (data) {
        console.log(data);
    }).error(function (data) {
        console.log(data)
    });
}

//登录
function doLogin(sid){
    return getJsonValue("/router/login?sid=" + sid);
}

function getDeviceList(token){
    return getJsonValue("/router/devices?token=" + token);
}

function getDevice(token,babyid){
    return getJsonValue("/app/object/getBaby?token=" + token+"&babyid="+babyid);
}

function getTrack(token,babyid){
    return getJsonValue("/router/track?token=" + token+"&babyid="+babyid);
}

function getHomes(token,babyid){
    return getJsonValue("/app/object/getGuardians?token=" + token+"&babyid="+babyid)
}



