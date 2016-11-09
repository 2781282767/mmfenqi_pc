/**
 * Created by next on 16/10/8.
 */
"use strict";

import { applyMiddleware, createStore ,compose} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';


export default () => {
    const BaseStore = compose(
        applyMiddleware(
            thunk
        )
    )(createStore)(rootReducer);

    return BaseStore;
}




//
// import { createStore, combineReducers, applyMiddleware} from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import Tool from '../../pub/Tool';
// //公用头部，菜单数据监听
// // import HeaderReducer from '../reducers/HeaderReducer';
//
// import HeaderReducer from '../redux/reducers/HeaderReducer'
// import MenuReducers from '../redux/reducers/MenuReducer';
// let store;
// export function BaseStore(reducers) {
//     if (store){
//         return store;
//     }
//     let _reducers = Tool.assign(reducers, { HeaderReducer, MenuReducers });
//     //合并所有要监听reducers 派生器
//     const Reducers = combineReducers(_reducers);
//     store = createStore(
//         Reducers,
//         applyMiddleware(thunkMiddleware)
//     );
//     return store;
// }

