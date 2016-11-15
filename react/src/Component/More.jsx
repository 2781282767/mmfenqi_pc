'usr strict';

import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';
import {R_header} from './common/index';
import {HttpService, Toast}  from'../Http';


import endtime from '../img/more/endtime.png'
import phone from '../img/more/phone.png'
import deletes from '../img/more/delete.png'

import Popup  from './common/popup'


export default class More extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            info: {},
            admin: {}
        };

        this.config = {
            isSure: false,
            isCancel: false,
            no: '返回',
            yes: '确定',
            yes_cb: ()=> {

                //  alert(this.state.info.isadmin)


                if (!!this.state.info.isadmin) {
                    this.delDevice2()
                } else {

                    this.delDevice()
                }


            },
            no_cb: ()=> {
                this.context.router.goBack()
            }
        };


    }

    componentWillMount() {


        HttpService.query({
            url: '/app/object/getBaby',
            data: {
                token: localStorage.appToken,
                babyid: this.props.params.babyid,
            },
            success: (res=> {
                console.log(res)
                if (res.code == '10038') {
                    this.setState({
                        info: {
                            url: 'http://qr.liantu.com/api.php?&w=200&text=' + res.data.mdtid + '',
                            mdtid: res.data.mdtid,
                            telephone: res.data.telephone,
                            endTime: res.data.endtime,
                            userid: res.data.userid,
                            isadmin: res.data.isadmin
                        }
                    })
                }
            })
        })

    }


    deviceCancel() {

        this.setState({
            admin: {
                flag: true
            }
        });


        console.log(this.state.info.isadmin);


        if (!this.state.info.isadmin) {

            var b = {
                content: '解绑设备,确定要解除绑定吗？',
            }

            this.config = Object.assign({}, this.config, b);

        } else {
            var a = {

                content: '解绑设备,解除管理员绑定后,其他监护成员将一同解除,且设备恢复出厂设置,只保留激活状态及设备有效期',

            };


            this.config = Object.assign({}, this.config, a);


        }


    }

    delDevice2() {
        HttpService.query({
            url: '/app/object/cancelBaby2',
            data: {
                token: localStorage.appToken,
                babyid: this.props.params.babyid,
            },

            success: (res=> {
                console.log(res)
                if (res.code == '10112') {

                    window.localStorage.delDevice = true;

                    window.location.href = '/#/map/' + localStorage.sid1 + '';
                }
            })

        });
    }


    delDevice() {
        HttpService.query({
            url: '/app/object/cancelBaby',
            data: {
                token: localStorage.appToken,
                babyid: this.props.params.babyid,
            },

            success: (res=> {
                console.log(res);
                if (res.code == '10070') {

                    window.localStorage.delDevice = 1;
                    window.location.href = '/#/map/' + localStorage.sid1 + '';
                }

            })

        });
    }

    render() {

        const {info, admin} =this.state;
        return (
            <div className="more" style={{background: '#eee', minHeight: '100%'}}>

                <Popup config={this.config} blockOrNone={admin.flag} _flag={admin.flag}/>
                <R_header left="1" title="更多"/>

                <div className="more-content">
                    <div className="barcode">
                        <img src={info.url}/>

                        <div className="mdtid" style={{color: '#333'}}>扫描二维码关注宝贝的设备</div>

                        <div className="mdtid">设备IMEI号:{info.mdtid}</div>
                    </div>

                    <div className="phone" style={{borderTop: '1px solid #EEEEEE'}}>

                        <div className="img">
                            <img src={phone} alt=""/>
                        </div>

                        <div className="input">设备手机号</div>

                        <div className="select">

                            {info.telephone}
                        </div>
                    </div>
                    <div className="endtime">
                        <div className="img">
                            <img src={endtime} alt=""/>
                        </div>

                        <div className="input">设备有效期</div>

                        <div className="select">

                            {info.endTime}

                        </div>

                    </div>


                    <div className="endtime" onClick={this.deviceCancel.bind(this)}
                         style={{marginTop: '1rem', borderTop: '1px solid #eee'}}>
                        <div className="img">
                            <img src={deletes} alt=""/>
                        </div>

                        <div className="input">解绑设备</div>

                        <div className="select">


                        </div>

                    </div>


                </div>

            </div>
        )
    }


}

More.contextTypes = {
    router: React.PropTypes.object.isRequired
};
