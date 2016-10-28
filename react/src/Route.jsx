import React, {Component, PropTypes} from 'react';
import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router';

import MapIndex from './Component/map'; //首页

import About from  './Component/about'
import DeviceList from  './Component/DeviceList'

import AddDevice from './Component/AddDevice'

import Gotoactive from './Component/gotoactive'
import VerifyText from './Component/verifyText'
import Success from './Component/success'
import App from './Component/kaoqin'
import Safetyarea from './Component/Safetyarea'
import Addarea from './Component/Addarea'
import Demo from './Component/demo'
import Demo2 from './Component/demo2'
import Guardian from './Component/guardian'
import AddGuardian from './Component/guardian/addGuardian'
import More from './Component/More'


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


var history = hashHistory;

const RouteConfig = (
    <Router history={history}>
        <Route path="/" component={Roots}>
            <Route path="/about/:babyid/:lng/:lat" component={About} />
            <Route path="/map/:sid" component={MapIndex} />
            <Route path="/deviceList" component={DeviceList} />
            <Route path="/addDevice" component={AddDevice} />
            <Route path="/Gotoactive/:telephone/:mdtid" component={Gotoactive} />
            <Route path="/VerifyText/:admintelephone/:mdtid/:deviceid/:telephone" component={VerifyText} />
            <Route path="/Success/:time" component={Success} />
            <Route path="/App/:babyid" component={App} />
            <Route path="/Safetyarea/:babyid" component={Safetyarea}/>
            <Route path="/Addarea/:regionid/:radius/:centerlng/:centerlat/:name" component={Addarea}/>
            <Route path="/demo" component={Demo}/>
            <Route path="/demo2" component={Demo2}/>
            <Route path="/Guardian/:babyid" component={Guardian}/>
            <Route path="/AddGuardian/:babyid/:guardianid/:familystatus" component={AddGuardian}/>
            <Route path="/More/:babyid" component={More}/>
        </Route>
    </Router>
);

export default RouteConfig;

// var history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;