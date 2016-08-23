'use strict';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';

import './css/app.less'




export class R_c extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <div>
                <div>22233</div>
                <div><img src='/dist/start.png' alt=""/></div>
            </div>
        )
    }
}
ReactDOM.render(
    <div>
        <R_c/>
    </div>
    , document.getElementById("content"));

