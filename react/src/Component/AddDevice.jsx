'usr strict';
import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import {R_header} from './common/index'



class AddDevice extends React.Component{
    render(){
        return (
            <div>
                <R_header title="输入IMEI号" />


                <div className="container">

                    <form  name="form">
                        <div className="col-xs-12 app-white-input margin-one">
                            <input type="number"  placeholder="请输入设备的IMEI号" style={{width:'100%'}} required/>
                        </div>

                        <label style={{dispaly:'block'}}>
                            <div className="col-xs-12  text-center app-pink-radius-button">


                                激活设备
                            </div>
                            <button type="submit" style={{dispaly:'none'}}></button>
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

    },dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(AddDevice);