'usr strict';


import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';

import {R_header} from './common/index'

import codes from '../../src/img/code.png'
import {HttpService, Toast}  from'../Http';


export default class VerifyText extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            disabled: false,
            text: '获取验证码',
            timer: 120,
            val: '',
            bg: 'app-blue-radius-button',
            bg2: 'app-little-pink-radius-button'
        };
        this.countdown = []
    }

    componentWillMount() {

    }

    componentWillUnmount() {
        clearInterval(this.countdown);
    }


    getCode() {

        var self = this;

        if (this.state.disabled) {
            return;
        }

        HttpService.query({
            url: '/app/device/generateSMSCode',
            data: {
                token: localStorage.appToken,
                telephone: this.props.params.telephone,
                admintelephone: this.props.params.admintelephone,
                module: 'scandevice',
                mdtid: this.props.params.mdtid
            },
            success: (res)=> {

                console.log(res);

                if (res.code == 10004) {

                    console.log(2222)

                    console.log(self)

                    self.setState({
                        disabled: true,
                        text: '119s后重新获取',
                        timer: 119,
                        bg: 'app-blue-radius-check-button'
                    });

                    this.countdown = setInterval(function () {
                        var tt = self.state.timer - 1;
                        if (tt <= 0) {
                            self.setState({
                                disabled: false,
                                text: '获取验证码',
                                timer: 120,
                                bg: 'app-blue-radius-button'
                            });
                            clearInterval(this.countdown);
                            return;
                        }
                        self.setState({
                            disabled: true,
                            text: tt + 's后重新获取',
                            timer: tt,
                            bg: 'app-blue-radius-check-button'
                        })
                    }, 1000);

                } else {
                    Toast.toast(res.msg);
                    // $scope.verifyStatus = true;
                }

            }
        })


    }

    changeValue(e) {

        var val = e.target.value;
        this.setState({
            val: val,
            bg2: 'app-pink-radius-button'
        })

    }

    go() {

        if (!this.state.val) {
            Toast.toast('请先获取验证码', 3000);
            return;
        }
        HttpService.save({
            url: '/app/device/addGuardian',
            data: {
                token: localStorage.appToken,
                admintelephone: this.props.params.admintelephone,
                smscode: this.state.val,
                deviceid: this.props.params.deviceid
            },
            success: (res=> {
                console.log(res);

                if (res.code == 10080) {

                    window.localStorage.delDevice = 1;

                    window.location.href = '/#/map/' + localStorage.sid1 + '';
                } else {

                    Toast.toast(res.msg, 3000);
                }
            })
        })
    }


    render() {

        const phone = this.props.params.admintelephone.substr(0, 3) + '****' + this.props.params.admintelephone.substr(7, 11);
        const {bg2} =this.state;

        return (

            <div style={{background: '#eee', minHeight: '100%'}}>
                <R_header left="1" title='填写验证码'/>


                <div className="container" style={{background: '#eee', minHeight: '100%'}}>


                    {/*<form onSubmit={this.next.bind(this,)} name="form">*/}
                    <div className="col-xs-12 text-center"
                         style={{padding: '2rem 0 1.5rem 0', fontSize: '1.4rem', color: '#333333'}}>
                        请向设备管理员({phone})索取验证码
                    </div>
                    <div className="col-xs-12 app-white-input" style={{lineHeight: '3rem'}}>
                        <div className="col-xs-2 text-right" style={{paddingLeft: 0}}>

                            <img src={codes} style={{width: '2.2rem'}}/>


                        </div>
                        <div className="col-xs-6" style={{paddingLeft: 0}}><input id="number" type="text"
                                                                                  placeholder="请输入验证码"
                                                                                  onChange={this.changeValue.bind(this)}
                                                                                  required
                                                                                  style={{
                                                                                      width: '100%',
                                                                                      verticalAlign: 'middle'
                                                                                  }}/></div>
                        <div className="col-xs-4 text-right" style={{padding: '0'}}>
                            <div className={this.state.bg} style={{textAlign: 'center'}}
                                 onClick={this.getCode.bind(this)}>
                                {this.state.text}
                            </div>
                        </div>
                    </div>

                    <label style={{display: 'block'}}>

                        <div className={"col-xs-12  text-center " + bg2} onClick={this.go.bind(this)}
                             style={{marginTop: '1.5rem', fontSize: '1.6rem'}}>添加
                        </div>
                        <button type="submit" style={{display: 'none'}}></button>
                    </label>

                </div>


            </div>
        )
    }


}