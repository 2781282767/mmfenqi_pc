'usr strict';

import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';

import {R_header} from './common/index';
import {Router, Route, IndexRoute, hashHistory, browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';

import {bindActionCreators} from 'redux';

import {getDeviceList, change} from '../action/index'

import '../less/deviceList.less'

class DeviceList extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.getDeviceList();
    }

    _change(babyname, babyid, headimg, babytelephone, e) {
        e.preventDefault();

        this.setState({
            checked: false,
        });

        const data = {
            babyname: babyname,
            babyid: babyid,
            babytelephone: babytelephone,
            headimg: headimg,
        };


        this.props.change(data);
        hashHistory.goBack()


    }


    render() {

        const {list} =this.props;
        console.log(list);
        return (
            <div>
                <R_header title="我的设备" left="0" right="1"/>


                {
                    list.map((json, index)=> {
                        return (
                            <div className="device-info" key={index}
                                 onClick={this._change.bind(this, json.babyname, json.babyid, json.headimg, json.babytelephone)}>
                                <div className="headimg"><img src={"/media" + json.headimg}
                                                              style={{width: '3.4rem', height: '3.4rem'}}/></div>
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

        list: state.change.list,
        babyName: state.change.babyName,
        babyid: state.change.babyid,
        babytelephone: state.change.babytelephone,
        headimg: state.change.headimg,

    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getDeviceList: getDeviceList,
        change: change
    }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(DeviceList);