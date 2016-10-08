/**
 * Created by ChinaHp on 2016/8/28.
 */
'use strict';

import { combineReducers } from 'redux';
import login from './user';


const rootReducer = combineReducers({
    login,
});
export default rootReducer;
