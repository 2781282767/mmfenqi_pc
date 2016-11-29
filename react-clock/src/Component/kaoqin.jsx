'usr strict';
import React, {Component, PropTypes} from 'react';

import {HttpService, Toast}  from'../Http';


import kaoqin from '../../src/img/kaoqin.png'
import xiandian from '../../src/img/xiandian.png'


import yichang from '../img/yichangss.png'
import chidao from '../../src/img/chidao.png'
import zaodui from '../../src/img/zaodui.png'

import DatePicker2 from '../Component/DatePicker/DatePicker2'


import '../less/date-picker.less'


export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            data: new Date(),
            list: [],
            value: null,
            babyid: []
        };
    }

    handleValChange(value) {

        this.setState({
            value
        });


        this.getHistoryTracks(this.state.babyid, value, value.substring(0, 8).concat(parseInt(value.substring(8, 10)) + 1).toString())
    }

    componentWillMount() {

        if (!!this.state.babyid) {


            this.getHistoryTracks(this.state.babyid, this.timeStamp2String(0), this.timeStamp2String(1))
        }


    }

    componentWillReceiveProps(nextProps) {

        console.log(nextProps.babyid)


        if (!!nextProps.babyid) {

            this.setState({
                babyid: nextProps.babyid,
            })
        }


    }


    getHistoryTracks(babyid, time1, time2) {
        HttpService.query({
            url: '/app/object/getAttendanceLogs',
            data: {
                token: localStorage.appToken,
                babyid: babyid,
                starttime: time1,
                endtime: time2,

            },
            success: (res=> {
                if (res.code == 10144) {
                    this.setState({
                        list: res.data
                    });

                    console.log(res.data)
                }

            })
        })
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


    render() {

        const comparetime = this.timeStamp2String(0);
        const value = this.state.value;
        console.log(comparetime);
        console.log(value);

        return <div className="kaoqing" id="kaoqing">

            {/*<R_header title="考勤" left="1"/>*/}


            <div className="abc">
                <div>

                    <DatePicker2 onChange={this.handleValChange.bind(this)}/>


                </div>
            </div>

            <div style={{height: '1rem', background: '#eee'}}></div>


            <div className="kaoqinginfo">
                <div className="info">
                    <div className="left"><img src={kaoqin} style={{width: '2.2rem', height: '2.2rem'}}/></div>
                    <div className="right">

                        {
                            value == null || value == comparetime ?
                                <spna>今日考勤</spna> :
                                <span>{value}</span>
                        }

                    </div>
                </div>

                {
                    this.state.list.map((json, index)=> {
                        return (
                            <div className="detail" key={index}>
                                <div className="img">


                                    <img src={xiandian} style={{width: '0.6rem', height: '3.1rem'}}/>

                                </div>
                                <div className="time">

                                    {
                                        json.type == 1 ?
                                            <span>到校时间</span> :
                                            json.type == 2 ?
                                                <span>离校时间</span> :
                                                json.type == 3 ?
                                                    <span></span> :
                                                    null
                                    }

                                    {json.attendancetime}

                                    {
                                        json.type2 == 1 ?
                                            <img src={chidao} style={{width: '4rem', height: '1.5rem'}}/> :
                                            json.type2 == 2 ?
                                                <img src={zaodui} style={{width: '4rem', height: '1.5rem'}}/> :
                                                json.type2 == 4 ?
                                                    null :
                                                    json.type2 == 5 ?
                                                        <img src={yichang} style={{width: '4rem', height: '1.5rem'}}/> :
                                                        null
                                    }


                                </div>
                            </div>
                        )

                    })
                }

                {
                    this.state.list.length == 0 ?
                        <div className="detail">
                            <div className="img"><img src={xiandian} style={{width: '0.6rem', height: '3.1rem'}}/></div>
                            <div className="time">暂无考勤信息</div>
                        </div> :
                        null
                }

            </div>


        </div>
    }
}

