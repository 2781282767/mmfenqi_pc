'usr strict';

import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';

import {R_header} from './common/index';

export default class DeviceList extends React.Component{
    constructor(props){
        super(props)

    }



    render(){
        return (
            <div>
                <R_header title="我的设备"/>

            </div>
        )
    }
}