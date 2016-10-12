'usr strict';
import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import {R_header} from './common/index'

import {scanDevice} from '../action/index'



class AddDevice extends React.Component{
    constructor(props) {

        super(props);
        this.state = {
            val:''
        }
    }


    change(e){
        let val = e.target.value;
        this.setState({
            val:val
        })

    }

    next(val,e){
        e.preventDefault();
        this.props.scanDevice(val)
    }


    render(){
        return (
            <div style={{background:'#eee',   minHeight: '100%'}}>
                <R_header title="输入IMEI号" left="1" />


                <div className="container">

                    <form onSubmit={this.next.bind(this,this.state.val)} name="form">
                        <div className="col-xs-12 app-white-input margin-one">
                            <input type="number"  placeholder="请输入设备的IMEI号" style={{width:'100%'}} onChange={this.change.bind(this)} required/>
                        </div>

                        <label style={{display:'block'}}>
                            <div className="col-xs-12  text-center app-pink-radius-button">


                                激活设备
                            </div>
                            <button type="submit" style={{display:'none'}}></button>
                        </label>

                        <div className="col-xs-12" style={{marginTop:'1rem'}}>注：请输入设备背面、包装或说明书上的IMEI号的前14位数字、最后一位数字为核验码，不用输入！</div>
                    </form>

                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {


    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        scanDevice:scanDevice
    },dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(AddDevice);