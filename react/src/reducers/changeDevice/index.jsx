'usr strict';

import * as types from '../../constants/ActionTypes';


const initialState = {

    list:[],
    babyName:'',
    babyid:'',
    babytelephone:'',
    headimg:''




};
export default function change (state = initialState, action) {
    switch (action.type) {
        case types.GetDeviceList:
            return {
                list: action.res,
            };


        case types.ChangeDevice:
            return {
                babyName:action.res.babyName,
                babyid:action.res.babyid,
                babytelephone:action.res.babytelephone,
                headimg:action.res.headimg,
            };

        default:
            return state;

    }
}