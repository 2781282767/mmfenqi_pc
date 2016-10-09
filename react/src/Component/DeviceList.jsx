'usr strict';

import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';

import {R_header} from './common/index';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import {doLogin,getDeviceList,change} from '../action/index'

import '../less/deviceList.less'

class DeviceList extends React.Component{
    constructor(props){
        super(props)
    }

    componentWillMount(){
        this.props.getDeviceList();
    }

    _change(babyname,babyid,headimg,babytelephone,e){
        e.preventDefault();

        this.setState({
            checked:false,
        });

        const data={
            babyname:babyname,
            babyid:babyid,
            babytelephone:babytelephone,
            headimg:headimg,
        };


        this.props.change(data);



    }



    render(){

        const {list} =this.props;
        console.log(list);
        return (
            <div>
                <header style={{display:'flex',height:'2.5rem'}}>
                    <div style={{display:'flex',flex:1}}>
                    </div>
                    <div style={{display:'flex',flex:1,alignItems:'center',justifyContent:'center'}}>我的设备</div>
                    <div style={{display:'flex',flex:1}}>

                    </div>
                </header>


                {
                    list.map((json,index)=>{
                        return (
                            <div className="device-info" key={index} onClick={this._change.bind(this,json.babyname,json.babyid,json.headimg,json.babytelephone)}>
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
        getDeviceList:getDeviceList,
        change:change
    },dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(DeviceList);