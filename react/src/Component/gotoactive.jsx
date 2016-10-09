'usr strict';
import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import {R_header} from './common/index'



class Gotoactive extends React.Component{
    render(){
        return (

            <div>

                <R_header title="激活设备"/>

            <div className="container">

                    <div className="col-xs-12 app-content-title app-padding-zero">设备信息</div>
                    <div className="col-xs-12 app-white-input">
                        <label  className="app-white-input-label">设备IMEI号</label>
                        <input id="number" disabled type="text" placeholder="23764761536276"  required/>
                    </div>
                    <hr className="app-bootstrap-hr"/>
                        <div className="col-xs-12 app-white-input">
                            <label  className="app-white-input-label">设备手机号</label>
                            <input id="number2" type="text" disabled placeholder="请输入设备手机号"  required/>
                        </div>
                        <div className="col-xs-12 app-content-title app-padding-zero">学校监管</div>
                        <div className="col-xs-12 app-white-input">
                            <label  className="app-white-input-label">宝贝姓名</label>
                            <input id="number3" type="text" placeholder="请输入宝贝姓名" required/>
                        </div>
                        <hr className="app-bootstrap-hr" />
                            <div className="col-xs-12 app-white-input">
                                <label className="app-white-input-label">班主任手机号</label>
                                <input id="number4" type="text"  placeholder="请输入班主任手机号码"
                                       required/>
                            </div>


                            <label style={{dispaly:'block'}}>

                                <div className="col-xs-12 text-center app-pink-radius-button"
                                     style={{marginTop:'1.5rem'}}>激活设备
                                </div>
                                <button type="submit" style={{dispaly:'none'}}></button>
                            </label>



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
export default connect(mapStateToProps, mapDispatchToProps)(Gotoactive);