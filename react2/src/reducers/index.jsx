/**
 * Created by ChinaHp on 2016/8/28.
 */
'use strict';

import { combineReducers } from 'redux';
import login from './user';
import safe from './safetyarea';


// import HeaderReducer from '../redux/reducers/HeaderReducer'
// import MenuReducers from '../redux/reducers/MenuReducer';


const rootReducer = combineReducers({
    login,safe
});
export default rootReducer;
