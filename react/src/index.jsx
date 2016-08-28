/**
 * Created by ChinaHp on 2016/8/11.
 */

import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';


import {connect} from 'react-redux';


import * as action from './action/index'

import '../src/less/index.less';



export class R_c extends React.Component{
    constructor(){
        super()
    }

    render(){
        return (
            <div>
                <div>李建彬222</div>

                <div className="abc">
                    <div className="cs">452444</div>
                </div>

            </div>
        )
    }
}
ReactDOM.render(
    <div>
        <R_c/>
    </div>
    , document.getElementById("content"));
