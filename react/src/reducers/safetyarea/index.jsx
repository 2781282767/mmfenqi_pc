'usr strict';

import * as types from '../../constants/ActionTypes';


const initialState = {



    list:[]





};
export default function safe (state = initialState, action) {
    switch (action.type) {
        case types.Safetyarea:
            return {
                list: action.res,
            };

        case types.ChangeDevice:

        default:
            return state;

    }
}