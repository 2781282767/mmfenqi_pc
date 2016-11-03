/**
 * Created by next on 16/10/8.
 */
"use strict";

import { applyMiddleware, createStore ,compose} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';


export default () => {
    const store = compose(
        applyMiddleware(
            thunk
        )
    )(createStore)(rootReducer);

    return store;
}




