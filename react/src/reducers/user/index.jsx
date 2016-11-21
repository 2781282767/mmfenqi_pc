'usr strict';

import * as types from '../../constants/ActionTypes';

import {Tool} from '../../Tool'

const initialState = {
    users: [],
    user: {},
    token: [],
    list: [],
    babyName: '',
    babyid: '',
    babytelephone: '',
    headimg: '',
    values: '',
    lng: '',
    lat: '',
    getGuardiansList: [],
    getGuardiansLists: [],

    gpstime: '',

    checked: 'false',


    abc: false,
    addr: '',
    isLong: [],
    datasource: [],
    GetSafeRegions:[],
    exportMap:[]


};
export default function login(state = initialState, action) {
    switch (action.type) {
        case types.SET_USER:
            return {
                users: action.data.users,
            };

        case types.GET_TOKEN:
            return {
                token: action.res.token
            };

        case types.GetDeviceList:

            return Tool.assign({}, state, {
                list: action.res,
                babyName: action.res[0].babyname,
                babyid: action.res[0].babyid,
                babytelephone: action.res[0].babytelephone,
                headimg: action.res[0].headimg,
                getGuardiansList: [],
                addr: ''
            });

        case types.GetChecked:

            return Tool.assign({}, state, {
                checked: action.msg,
                getGuardiansList: [],
                addr: ''

            });
        case  types.Change:
            return Tool.assign({}, state, {
                babyName: action.res.babyName,
                babyid: action.res.babyid,
                babytelephone: action.res.babytelephone,
                headimg: action.res.headimg,
                getGuardiansList: [],
                addr: ''
            });



        case types.GetGuardians:
            return Tool.assign({}, state, {
                getGuardiansList: action.res
            });


        case types.GetGuardianss:
            return Tool.assign({}, state, {
                getGuardiansLists: action.res
            });
        //     return {
        //         getGuardiansList:action.res
        //     };

        case types.GetCurrentTrack:
            return Tool.assign({}, state, {
                lng: action.res.lng,
                lat: action.res.lat,
                gpstime: action.res.gpstime,
                addr: '',
                datasource: action.res.datasource

            });
        case types.GetAddr:
            return Tool.assign({}, state, {
                addr: action.msg
            });
        case types.aaa:
            return Tool.assign({}, state, {
                abc: action.msg
            });
        case types.isLogin:
            return Tool.assign({}, state, {
                isLogin: action.msg
            });


        case types.GetCurrentPower:
            return Tool.assign({}, state, {
                values: action.res,
                getGuardiansList: [],
                addr: ''
            });
        case types.GetSafeRegions1:
            return Tool.assign({}, state, {
                GetSafeRegions: action.res,
            });
        case types.exportMap:
            return Tool.assign({}, state, {
                exportMap: action.res,
            });



        // case types.ADD_USER :
        //     return Object.assign({},state,{
        //         users: [
        //             action.user,
        //             ...state.users
        //         ],
        //         postForm: Object.assign({}, initialState.user) // clear form
        //     });
        default:
            return state;
    }
}