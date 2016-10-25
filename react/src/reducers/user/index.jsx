'usr strict';

import * as types from '../../constants/ActionTypes';

const initialState = {
    users: [],
    user: {},
    token:[],
    list:[],
    babyName:'',
    babyid:'',
    babytelephone:'',
    headimg:'',
    values:'',
    lng:'',
    lat:'',
    getGuardiansList:[],
    getGuardiansLists:[],

    gpstime:'',

    checked:'false',


    abc:'false',
    addr:'',
    isLong:[],
    datasource:[]


};
export default function login (state = initialState, action) {
    switch(action.type) {
        case types.SET_USER:
            return {
                users: action.data.users,
            };

        case types.GET_TOKEN:
            return{
                token:action.res.token
            };

        case types.GetDeviceList:
            return{
                list:action.res,
                babyName:action.res[0].babyname,
                babyid:action.res[0].babyid,
                babytelephone:action.res[0].babytelephone,
                headimg:action.res[0].headimg,
                getGuardiansList:[],
                addr:''

            };

        case types.GetChecked:

            return Object.assign({},state, {
                checked: action.msg,
                getGuardiansList: [],
                addr:''

            });
        case  types.Change:
            return Object.assign({},state,{
                babyName:action.res.babyName,
                babyid:action.res.babyid,
                babytelephone:action.res.babytelephone,
                headimg:action.res.headimg,
                getGuardiansList:[],
                addr:''
            });
        case types.GetCurrentPower:
            return Object.assign({},state,{
                values:action.res,
                getGuardiansList:[],
                addr:''
            });



        case types.GetGuardians:
            return Object.assign({},state,{
                getGuardiansList:action.res
            });


        case types.GetGuardianss:
            return Object.assign({},state,{
                getGuardiansLists:action.res
            });
            //     return {
            //         getGuardiansList:action.res
            //     };

        case types.GetCurrentTrack:
            return Object.assign({},state,{
                lng:action.res.lng,
                lat:action.res.lat,
                gpstime:action.res.gpstime,
                addr:'',
                datasource:action.res.datasource

            });

        case types.AddDevice:
            return {

            };
        case types.GetAddr:
            return Object.assign({},state,{
                addr:action.msg
            });
        case types.aaa:
            return Object.assign({},state,{
                abc:action.msg
            });
        case types.isLogin:
            return Object.assign({},state,{
                isLogin:action.msg
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