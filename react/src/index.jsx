/**
 * Created by ChinaHp on 2016/8/11.
 */
import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';


export class R_c extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <div>
                <div>asb</div><div>ssssss</div><div>asb</div><div>333333</div>
            </div>
        )
    }
}
ReactDOM.render(
    <div>
        <R_c/>
    </div>
    , document.getElementById("content"));
