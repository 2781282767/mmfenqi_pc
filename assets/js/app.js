/**
 * Created by hellmash on 6/4/16.
 */
var positionBar = $("#lblPosition");
var btnCall = $("#btnCall");
var isLoggedIn = true;

var nobindingContent = $(".nobinding");
var bindingContent = $(".binding");

var bubble = $(".bubble");

if(!isMap){
    if(isLoggedIn){
        nobindingContent.hide();
        bindingContent.show();
        positionBar.html("个人中心");
    }else{
        nobindingContent.show();
        bindingContent.hide();
        positionBar.html("未绑定");
    }
}

positionBar.on("click", function(){
    if(isMap){
        if(bubble.hasClass('hide')){
            bubble.removeClass('hide');
        }else{
            bubble.addClass("hide");
        }
    }
});

btnCall.on("click", function(){
    btnCall.href = 'tel:13958076240';
});


function setBattery(level){
    var icon = $(".btn-battery").find("i")[0];
    if(icon){
        icon.className = "fa fa-battery-" + level;
    }

}
setBattery(3);