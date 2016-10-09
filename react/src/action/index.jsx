/**
 * Created by ChinaHp on 2016/8/28.
 */
'use strict';

import HttpService from'../Http';

import * as types from '../constants/ActionTypes';


const dataUser = {
    "users": [{
        "id": 1,
        "name": "小撸1",
        'email': '11@qq.com'
    }, {
        "id": 2,
        "name": "小撸2",
        'email': '22@qq.com'
    }, {
        "id": 3,
        "name": "小撸3",
        'email': '33@qq.com'
    }]
};

function fetchUsers () {
    return dataUser;
}

function get() {

    const dataUser = {
        "token": [{
            "id": 1,
            "name": "2222",
            'email': '333'
        }]
    };
    return dataUser


}



function setUsers(data) {
    return {
        type: types.SET_USER,
        data
    };
}




function getToken(res) {
    return{
        type:types.GET_TOKEN,
        res
    }
}

function GetDeviceList(res) {
    return{
        type:types.GetDeviceList,
        res
    }
}


function GetCurrentPower(res) {
    return{
        type:types.GetCurrentPower,
        res
    }
}

function Change(res) {
    return{
        type:types.Change,
        res
    }
}

function GetCurrentTrack(res) {
    return{
        type:types.GetCurrentTrack,
        res
    }
}




export function change(res) {


    const data={
        babyName:res.babyname,
        babyid:res.babyid,
        babytelephone:res.babytelephone,
        headimg:res.headimg
    };
    console.log(data);

    return (dispatch,getState)=>{
        dispatch(Change(data));
        dispatch(getCurrentPower(data.babyid));
        dispatch(getCurrentTrack(data.babyid));
    }
}

export function getUsers() {
    return function (dispatch) {

        dispatch(setUsers(fetchUsers()));
    };
}
export function setSnackbar (message){
    return {
        type:types.SET_SNACKBAR,
        message
    }
}


export function doLogin() {

    return function (dispatch) {
        return HttpService.query({
            url: '/apph5/user/login',
            data: {sid: 'O5QaeMlrCNPI91Ux016a1IOKub3DeOowT9EugDMYn4L7jOxTD2E-sY6V9Tgpk0uoiQk4DX2WP2qyFOllkciZXYg_ObvxmG6niYR3_DMF728Ul0HRb5qd2cDZdLwinOeZVL6BROmg-V0W5BcCRJvGhg'},
            success: (res=> {
                if(res.code=='30010'){
                    //dispatch(getToken(res.data));
                    window.localStorage.appToken=res.data.token;
                    dispatch(getDeviceList())

                }
            })
        });

    }

}
//获取设备list
 export function getDeviceList() {

    return function (dispatch) {
        return HttpService.query({
            url:'/app/object/getBabys',
            data:{token:localStorage.appToken},
            success:(res=>{
                if(res.code==10020){
                    dispatch(GetDeviceList(res.data));

                    dispatch(getCurrentPower(res.data[0].babyid));



                    dispatch(getCurrentTrack(res.data[0].babyid));
                }
            })
        })
    }
    
}
//获取设备电量
 function getCurrentPower(babyid) {
    return function (dispatch) {

        return HttpService.query({
            url:'/app/alarm/getCurrentPower',
            data:{token:localStorage.appToken,babyid:babyid},
            success:(res=>{

                console.log(res);
                if (res.code == 10011) {
                    //$scope.powervalue = 0;
                    dispatch(GetCurrentPower('0'));
                } else {
                    dispatch(GetCurrentPower(res.data.powerValue));
                }
            })
        })

    }

}


//获取设备坐标
function getCurrentTrack(babyid) {
    return function(dispatch){
        return HttpService.query({
            url:'/app/map/getCurrentTrack',

            data:{token:localStorage.appToken,babyid:babyid},

            success:(res=>{

                console.log(res);
                if(res.code=='10059'){

                    const data={
                        lng:0,
                        lat:0
                    };
                    dispatch(GetCurrentTrack(data));
                    init(data.lng,data.lat);


                }else{
                    dispatch(GetCurrentTrack(res.data));
                    //dispatch(init(res.data.lng,res.data.lat))
                    init(res.data.lng,res.data.lat);
                }
            })

        })
    }
}


 function init(lng,lat) {
    // console.log('2222');
    var mapObj,marker;
    mapObj = new AMap.Map('container',{
        zoom: 15,
        center: [lng,lat],
        resizeEnable:true,
    });


    marker = new AMap.Marker({
        icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
    });
    marker.setMap(mapObj);
}