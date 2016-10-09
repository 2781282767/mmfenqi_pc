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
    value:'',
    lng:'',
    lat:'',


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
                headimg:action.res[0].headimg

            };
        case  types.Change:
            return Object.assign({},state,{
                babyName:action.res.babyName,
                babyid:action.res.babyid,
                babytelephone:action.res.babytelephone,
                headimg:action.res.headimg
            });
        case types.GetCurrentPower:
            return Object.assign({},state,{
                value:action.res
            });

        case types.GetCurrentTrack:
            return Object.assign({},state,{
                lng:action.res.lng,
                lat:action.res.lat,
                gpstime:action.res.gpstime
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