import React, {Component, PropTypes} from 'react';
import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router';

import MapIndex from './Component/map'; //首页

import About from  './Component/about'
import DeviceList from  './Component/DeviceList'

import AddDevice from './Component/AddDevice'

import Gotoactive from './Component/gotoactive'


/**
 * (路由根目录组件，显示当前符合条件的组件)
 * 
 * @class Roots
 * @extends {Component}
 */
class Roots extends Component {
    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}


var history = browserHistory;

const RouteConfig = (
    <Router history={history}>
        <Route path="/" component={Roots}>
            <IndexRoute component={MapIndex} />
            <Route path="about" component={About} />
            <Route path="/deviceList" component={DeviceList} />
            <Route path="/addDevice" component={AddDevice} />
            <Route path="/Gotoactive" component={Gotoactive} />
        </Route>
    </Router>
);

export default RouteConfig;

// var history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;