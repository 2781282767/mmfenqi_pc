/**
 * Created by ChinaHp on 2016/8/28.
 */
'use strict';

import {HttpService, Toast}  from'../Http';

import * as types from '../constants/ActionTypes';


var list = [
    {
        img: '../../src/img/bind/baba.png',
        img1: '../../src/img/bind/baba1.png',
        familystatus: '爸爸',
        ds: '此称呼对应为设备按键'
    },
    {
        img: '../../src/img/bind/ma.png',
        img1: '../../src/img/bind/ma1.png',
        familystatus: '妈妈',
        ds: '此称呼对应为设备按键'
    },
    {
        img: '../../src/img/bind/family.png',
        img1: '../../src/img/bind/family1.png',
        familystatus: '家庭',
        ds: '此称呼对应为设备按键'
    },
    {
        img: '../../src/img/bind/gege.png',
        img1: '../../src/img/bind/gege1.png',
        familystatus: '哥哥',
        ds: '此称呼对应为家庭成员'
    },
    {
        img: '../../src/img/bind/jiejie.png',
        familystatus: '姐姐',
        img1: '../../src/img/bind/jiejie1.png',
        ds: '此称呼对应为家庭成员'
    },
    {
        img: '../../src/img/bind/tr.png',
        img1: '../../src/img/bind/tr1.png',
        familystatus: '班主任',
        ds: '仅作为添加班主任时使用'
    },
    {
        img: '../../src/img/bind/shu.png',
        img1: '../../src/img/bind/shu1.png',
        familystatus: '叔叔',
        ds: '此称呼对应为家庭成员'
    },
    {
        img: '../../src/img/bind/ye.png',
        img1: '../../src/img/bind/ye1.png',
        familystatus: '爷爷',
        ds: '此称呼对应为家庭成员'
    },
    {
        img: '../../src/img/bind/nai.png',
        img1: '../../src/img/bind/nai1.png',
        familystatus: '奶奶',
        ds: '此称呼对应为家庭成员'
    },
    {
        img: '../../src/img/bind/wai.png',
        img1: '../../src/img/bind/wai1.png',
        familystatus: '外公',
        ds: '此称呼对应为家庭成员'
    },
    {
        img: '../../src/img/bind/waipo.png',
        img1: '../../src/img/bind/waipo1.png',
        familystatus: '外婆',
        ds: '此称呼对应为家庭成员'
    }
];

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

function fetchUsers() {
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
    return {
        type: types.GET_TOKEN,
        res
    }
}

function GetDeviceList(res) {
    return {
        type: types.GetDeviceList,
        res
    }
}


function GetCurrentPower(res) {
    return {
        type: types.GetCurrentPower,
        res
    }
}

function Change(res) {
    return {
        type: types.Change,
        res
    }
}

function GetCurrentTrack(res) {
    return {
        type: types.GetCurrentTrack,
        res
    }
}


function AddDevice(res) {
    return {
        type: types.AddDevice,
        res
    }
}
function GetGuardians(res) {
    return {
        type: types.GetGuardians,
        res
    }
}

function ChangeDevice(res) {
    return{
        type:types.ChangeDevice,
        res
    }
}


export function change(res) {


    const data = {
        babyName: res.babyname,
        babyid: res.babyid,
        babytelephone: res.babytelephone,
        headimg: res.headimg
    };
    console.log(data);

    return (dispatch, getState)=> {
        //dispatch(ChangeDevice(data));
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
export function setSnackbar(message) {
    return {
        type: types.SET_SNACKBAR,
        message
    }
}

export function getChecked(msg) {
    return {
        type: types.GetChecked,
        msg
    }
}


export function doLogin(sid) {

    return function (dispatch) {
        return HttpService.query({
            url: '/apph5/user/login',
            data: {sid: sid},


            //O5QaeMlrCNPI91Ux016a1IOKub3DeOowT9EugDMYn4L7jOxTD2E-sY6V9Tgpk0uoiQk4DX2WP2qyFOllkciZXYg_ObvxmG6niYR3_DMF728Ul0HRb5qd2cDZdLwinOeZVL6BROmg-V0W5BcCRJvGhg

            //data:{sid:'QusMWEX0Wki87l0_HL6hFbew9-lbUeHFloIXooR0r22qwgrBVf-x5YxRXmeotmirgAiCgENkGVZuH26yuDA6ydM6tqmy_zCp3afmoOct4y5MeaRXCLtteY_eH_Ac9RqfEtVx3k0VrZ8jX0ijad4eRA'},
            success: (res=> {
                if (res.code == '30010') {
                    //dispatch(getToken(res.data));
                    window.localStorage.appToken = res.data.token;
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
            url: '/app/object/getBabys',
            data: {token: localStorage.appToken},
            success: (res=> {

                console.log(res);
                if (res.code == 10020) {


                    dispatch(GetDeviceList(res.data));

                    dispatch(getCurrentPower(res.data[0].babyid));


                    dispatch(getCurrentTrack(res.data[0].babyid));
                } else {

                    dispatch(getChecked('true'));


                }
            })
        })
    }

}


//获取设备电量
function getCurrentPower(babyid) {
    return function (dispatch) {

        return HttpService.query({
            url: '/app/alarm/getCurrentPower',
            data: {token: localStorage.appToken, babyid: babyid},
            success: (res=> {

                console.log(res);

                dispatch(getGuardians(babyid));
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


function getGuardians(babyid) {

    return function (dispatch) {
        return HttpService.query({
            url: '/app/object/getGuardians',
            data: {
                token: localStorage.appToken,
                babyid: babyid
            },
            success: (res=> {
                console.log(res);

                if (res.code == '10068') {

                    console.log(res.data);

                    var checked = false;


                    var getGuardiansList = res.data;

                    for (var a in getGuardiansList) {
                        if (getGuardiansList[a].familystatus == '家长') {
                            // guardianid = getGuardiansList[a].guardianid;

                            checked = true;

                            break;
                        } else {
                            checked = false;
                        }
                    }


                    console.log('++' + list);


                    for (var y in list) {

                        var ab = 'isOpen';
                        var status = 'check';
                        var id = 'guardianid';
                        list[y][status] = false;
                        list[y][id] = '';
                        for (var x in getGuardiansList) {


                            if (getGuardiansList[x].familystatus == list[y].familystatus) {
                                list[y][status] = true;
                                list[y][id] = getGuardiansList[x].guardianid;
                                list[y][ab] = checked;
                                console.log(list);

                                break;
                            }
                        }
                    }

                    dispatch(GetGuardians(list));


                }
            })
        })
    }

}


//获取设备坐标
function getCurrentTrack(babyid) {
    return function (dispatch) {
        return HttpService.query({
            url: '/app/map/getCurrentTrack',

            data: {token: localStorage.appToken, babyid: babyid},

            success: (res=> {

                console.log(res);
                if (res.code == '10059') {

                    const data = {
                        lng: 0,
                        lat: 0
                    };
                    dispatch(GetCurrentTrack(data));
                    init(data.lng, data.lat);


                } else {
                    dispatch(GetCurrentTrack(res.data));
                    //dispatch(init(res.data.lng,res.data.lat))
                    init(res.data.lng, res.data.lat);
                }
            })

        })
    }
}


function init(lng, lat) {
    // console.log('2222');
    var mapObj, marker;
    mapObj = new AMap.Map('container', {
        zoom: 15,
        center: [lng, lat],
        resizeEnable: true,
    });


    marker = new AMap.Marker({
        icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
    });
    marker.setMap(mapObj);
}


export function scanDevice(mdtcode) {
    return function (dispatch) {


        return HttpService.query({
            url: '/app/device/scanDevice',

            data: {token: localStorage.appToken, mdtcode: mdtcode, mdtid: mdtcode,},


            success: (res=> {


                if (res.code == 100783) {

                    const telephone = res.data.telephone;
                    const mdtid = res.data.mdtid;

                    window.location.href = '/#Gotoactive/' + telephone + '/' + mdtid + '';


                } else if (res.code == 10078) {

                    const admintelephone = res.data.admintelephone;
                    const mdtid = res.data.mdtid;
                    const deviceid = res.data.deviceid;
                    const telephone = res.data.telephone;

                    window.location.href = '/#VerifyText/' + admintelephone + '/' + mdtid + '/' + deviceid + '/' + telephone + '';

                } else {

                    //window.location.href = '/#Gotoactive/13657086451/111';
                    Toast.toast(res.msg, 3000);
                }


            })
        })
    }
}