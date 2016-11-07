'usr strict';

import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';

import {connect} from 'react-redux';

import {bindActionCreators} from 'redux';

import {R_header} from './common/index'

import {HttpService, Toast}  from'../Http';


import one from '../../src/img/1.png'
import two from '../../src/img/2.png'
import three from '../../src/img/3.png'

import DatePicker from '../Component/datepicker/DatePicker'

import '../less/date-picker.less'


export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            map: []
        }

    }

    componentWillMount() {
        this.getHistoryTracks(this.props.params.babyid, this.timeStamp2String(0), this.timeStamp2String(1))


    }

    componentWillUnmount() {

        this.state.map.clearMap()
    }


    handleValChange(value) {

        this.setState({
            value
        });

        //  this.getHistoryTracks(this.props.params.babyid,this.timeStamp2String(0),this.timeStamp2String(1))


        this.getHistoryTracks(this.props.params.babyid, value, value.substring(0, 8).concat(parseInt(value.substring(8, 10)) + 1).toString())
    }


    map(map) {

        let lng;
        let lat;


        //const lng=this.props.params.lng;

        if (this.props.params.lng == 0) {
            lng = 116.397428;
        } else {
            lng = this.props.params.lng - 0.0065
        }

        if (this.props.params.lat == 0) {
            lat = 39.90923
        } else {
            lat = this.props.params.lat - 0.0060;
        }


        var mapObj, markers;
        mapObj = new AMap.Map('abc', {
            zoom: 15,
            center: [lng, lat],
            resizeEnable: true,
        });

        this.setState({
            map: mapObj
        });


        if (this.props.params.lng == 0 && this.props.params.lat == 0) {
            return
        }


        map.forEach(function (marker) {

            // console.log(marker.lng)
            markers = new AMap.Marker({
                map: mapObj,
                icon: marker.img,
                position: [marker.lng, marker.lat]
                // offset: new AMap.Pixel(-12, -36)
            });


            markers.setMap(mapObj);
        });

    }

    timeStamp2String(time) {
        var datetime = new Date();
        datetime.setDate(datetime.getDate() + time);
        var year = datetime.getFullYear();
        var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
        var hour = '00';
        var minute = '00';
        var second = '00';
        return year + "-" + month + "-" + date;
    }

    getHistoryTracks(babyid, time1, time2) {
        HttpService.query({
            url: '/app/map/getHistoryTracks',
            data: {
                token: localStorage.appToken,
                babyid: babyid,
                starttime: time1,
                endtime: time2,

            },
            success: (res=> {
                if (res.code == '10062') {
                    var list = res.data;

                    console.log(list);

                    var markers = [];

                    var lng = {};
                    var lat = {};

                    var _arry = [];
                    var json = {};

                    var listLenght = list.length;


                    list.forEach(function (item, index) {


                        if (index == 0) {
                            _arry.push({lng: item.lng - 0.0065, lat: item.lat - 0.0060, img: three});
                        } else if (listLenght == index + 1) {

                            _arry.push({lng: item.lng - 0.0065, lat: item.lat - 0.0060, img: two});
                        } else {
                            _arry.push({lng: item.lng - 0.0065, lat: item.lat - 0.0060, img: one});
                        }


                    });
                    this.map(_arry);


                } else {
                    Toast.toast('无轨迹信息', 3000);
                    var _arry2 = [];

                    _arry2.push({lng: 0, lat: 0, img: ''});
                    this.map(_arry2)
                }
            })
        })
    }

    render() {
        const time = this.timeStamp2String(0);

        return (
            <div>
                <R_header title="历史轨迹" left="1"/>
                <div id="abc" style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    bottom: '0',
                    overflow: 'hidden',
                    margin: '0'
                }}></div>


                <div className="cde">
                    <div>
                        <DatePicker onChange={this.handleValChange.bind(this)}/>
                    </div>
                </div>
            </div>
        )
    }
}