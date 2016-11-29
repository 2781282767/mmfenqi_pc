/**
 * Created by ChinaHp on 2016/8/28.
 */
'use strict';

import {HttpService, Toast}  from'../Http';



import * as types from '../constants/ActionTypes';

import dian from '../../src/img/dian.png'


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
function GetGuardianss(res) {
    return {
        type: types.GetGuardianss,
        res
    }
}

function ChangeDevice(res) {
    return {
        type: types.ChangeDevice,
        res
    }
}

function GetAddr(msg) {
    return {
        type: types.GetAddr,
        msg
    }
}


function isLong(msg) {
    return {
        type: types.isLogin,
        msg
    }
}


function exportMap(res) {
    return {
        type: types.exportMap,
        res
    }
}


export function changeSaveBabyStatus(msg) {
    return (dispatch, getState)=> {
        //dispatch(ChangeDevice(data));
        dispatch(A(msg));
    }
}


export function change(res) {



    // window.localStorage.babyid = res.babyid;

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
        // dispatch(getCurrentPower(data.babyid));
        // dispatch(getCurrentTrack(data.babyid));
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

export function getSafeRegions1(res) {
    return {
        type: types.GetSafeRegions1,
        res
    }
}

export function A(msg) {
    return {
        type: types.aaa,
        msg
    }
}

/**
 * login
 * @param sid
 * @returns {Function}
 */
export function doLogin(sid) {
    return function (dispatch) {
        return HttpService.query({
            url: '/apph5/user/login',
            data: {sid: sid},
            success: (res=> {
                if (res.code == '30010') {
                    //dispatch(getToken(res.data));
                    window.localStorage.appToken = res.data.token;
                    window.localStorage.userid = res.data.userid;
                    dispatch(getDeviceList())

                } else {
                    dispatch(isLong(false))
                }
            })
        });

    }

}

/**
 * 获取位置
 * @param babyid
 * @returns {Function}
 */
export function getMap(babyid) {
    return function (dispatch) {
        return HttpService.query({
            url: '/app/map/getCurrentTrack',

            data: {token: localStorage.appToken, babyid: babyid},

            success: (res=> {

                console.log('来了')


                console.log(res);
                if (res.code == '10059') {

                    const data = {

                        lng: 0,
                        lat: 0

                    };

                    // dispatch(init(116.397428, 39.90923));

                    //  dispatch(getAddree(data.lng, data.lat));


                } else {

                    // dispatch(init(res.data.lng - 0.0065, res.data.lat - 0.0060));

                }
            })

        })
    }
}

/**
 * 选取成员关系
 * @returns {Function}
 */
export function getOneBabyid() {
    return function (dispatch) {
        return HttpService.query({
            url: '/app/object/getBabys',
            data: {token: localStorage.appToken},
            success: (res=> {

                console.log(res);


                if (res.code == 10020) {

                    dispatch(getA(res.data[0].babyid, res.data));



                    // dispatch(getCurrentPower(res.data[0].babyid));


                    // dispatch(getCurrentTrack(res.data[0].babyid));

                    dispatch(getChecked('false'));

                    dispatch(GetDeviceList(res.data));


                } else {

                    dispatch(getChecked('true'));
                }
            })
        })
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


                    //dispatch(getChecked('false'));


                    dispatch(GetDeviceList(res.data));

                    // dispatch(getCurrentPower(res.data[0].babyid));

                    //window.localStorage.babyid = res.data[0].babyid;

                    //alert(localStorage.babyid)

                    dispatch(getChecked('false'));


                    // dispatch(getCurrentTrack(res.data[0].babyid));


                } else {

                    dispatch(getChecked('true'));


                }
            })
        })
    }

}

/**
 * 是否含有家长
 * @param babyid
 * @param data
 * @returns {Function}
 */

function getA(babyid, data) {
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

                    //获取监护人
                    dispatch(_getGuardians(babyid));

                    var getGuardiansList = res.data;

                    for (var a in getGuardiansList) {
                        if (getGuardiansList[a].familystatus == '家长') {

                            //宝贝列表
                            dispatch(GetDeviceList(data));


                            // dispatch(GetDeviceList(data));
                             dispatch(A(true));

                            break;
                        } else {
                            dispatch(A(false))
                        }
                    }

                }

            })
        })
    }
}



//获取设备电量
export function getCurrentPower(babyid) {
    return function (dispatch) {


        return HttpService.query({
            url: '/app/alarm/getCurrentPower',
            data: {token: localStorage.appToken, babyid: babyid},
            success: (res=> {

                console.log(res);

                //dispatch(_getGuardians(babyid));





                if (res.code == 10011) {
                    //$scope.powervalue = 0;
                    // dispatch(GetCurrentPower('0'));

                    window.localStorage.powerValue = '0';
                } else {



                    // dispatch(GetCurrentPower(res.data.powerValue));

                    window.localStorage.powerValue = res.data.powerValue;
                }
            })
        })

    }

}


/**
 * 获取监护人
 * @param babyid
 * @returns {Function}
 */
export function getGuardianss(babyid) {
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
                                console.log(list);

                                break;
                            }
                        }
                    }

                    dispatch(GetGuardianss(list));


                }
            })
        })
    }
}

/**
 * 获取监护人
 * @param babyid
 * @returns {Function}
 * @private
 */
function _getGuardians(babyid) {

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

                    console.log('++' + list);


                    var getGuardiansList = res.data;


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
                    // dispatch(GetCurrentTrack(data));
                    // dispatch(init(116.397428, 39.90923));

                    //  dispatch(getAddree(data.lng, data.lat));


                } else {
                    // dispatch(GetCurrentTrack(res.data));
                    //dispatch(init(res.data.lng,res.data.lat))
                    // dispatch(init(res.data.lng - 0.0065, res.data.lat - 0.0060))
                    // dispatch(getAddree(res.data.lng - 0.0065, res.data.lat - 0.0060))
                }
            })

        })
    }
}

/**
 * 获取地理
 * @param lng
 * @param lat
 * @returns {Function}
 */
function getAddree(lng, lat) {
    return function (dispatch) {
        console.log(lng);

        var lnglatXY = [lng, lat]; //已知点坐标


        var geocoder = new AMap.Geocoder(
            {
                radius: 1000,
                extensions: "all"
            }
        );
        geocoder.getAddress(lnglatXY, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {

                console.log(result);

                var address = result.regeocode.formattedAddress; //返回地址描述
                dispatch(GetAddr(address))
            }
        });
    }
}

/**
 * 初始化地图
 * @param lng
 * @param lat
 * @returns {Function}
 */
function init(lng, lat) {
    return function (dispatch) {

        var map, marker;
        map = new AMap.Map('container', {
            zoom: 15,
            center: [lng, lat],
            resizeEnable: true,
        });


        dispatch(exportMap(map));

        if (lng == 116.397428 && lat == 39.90923) {
            return;
        }

        marker = new AMap.Marker({
            map: map,
            icon: dian,
            // icon: new AMap.Icon({  //复杂图标
            //     // size: new AMap.Size(27, 36),//图标大小
            //     //  image: '../../src/img/dian.png', //大图地址
            //   //  imageOffset: new AMap.Pixel(-28, 0)//相对于大图的取图位置
            // }),
            position: [lng, lat],
        });


        marker.setMap(map);


        var circle = new AMap.Circle({
            center: new AMap.LngLat(lng, lat),// 圆心位置
            radius: 200, //半径
            strokeColor: "#00b4ed", //线颜色
            strokeOpacity: 1, //线透明度
            fillColor: "#00b4ed", //填充颜色
            strokeWeight: 1,    //线宽
            fillOpacity: 0.2//填充透明度
        });
        circle.setMap(map);


    }


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


export function getSafeRegions(babyid) {
    return function (dispatch) {
        return HttpService.query({
            url: '/app/map/getSafeRegions',
            data: {
                token: localStorage.appToken,
                babyid: babyid,
                pageindex: 1,
                pagesize: 50
            },
            success: (res=> {

                if (res.code == '10048') {

                    // this.setState({
                    //     list: res.data.safeRegions,
                    //
                    // });


                    console.log('------' + res.data.safeRegions);

                    dispatch(getSafeRegions1(res.data.safeRegions));


                    // this.props._list=res.data.safeRegions;


                    // /    localStorage.setItem("json_data",JSON.stringify(res.data.safeRegions));

                    //this.S_init(this.state.list);

                    // this.inits();


                }
            })
        })
    }
}