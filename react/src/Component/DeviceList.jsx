'usr strict';

import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';

import {R_header} from './common/index';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {doLogin} from '../action/index'

import '../less/deviceList.less'

class DeviceList extends React.Component{
    constructor(props){
        super(props)
    }

    componentWillMount(){
        this.props.doLogin();
    }

    change(babyname){
        alert(babyname)
    }



    render(){

        const {list} =this.props;
        console.log(list);
        return (
            <div>
                <R_header title="我的设备"/>


                {
                    list.map((json,index)=>{
                        return (
                            <div className="device-info" key={index} onClick={this.change.bind(this,json.babyname)}>
                                <div className="headimg"><img src={"/media"+json.headimg} style={{width:'3.4rem',height:'3.4rem'}} /></div>
                                <div className="info">
                                    <div className="name">{json.babyname}</div>
                                    <div className="time">{json.starttime}</div>
                                </div>

                            </div>
                        )
                    })
                }



            </div>
        )
    }
}


const mapStateToProps = state => {
    return {

        list:state.login.list,

    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        doLogin:doLogin,
    },dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(DeviceList);