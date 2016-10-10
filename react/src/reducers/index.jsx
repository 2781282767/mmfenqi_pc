/**
 * Created by ChinaHp on 2016/8/28.
 */
'use strict';

import { combineReducers } from 'redux';
import login from './user';
import change from './changeDevice';


const rootReducer = combineReducers({
    login,change
});
export default rootReducer;
