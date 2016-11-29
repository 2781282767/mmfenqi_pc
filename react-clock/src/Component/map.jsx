'usr strict';
import React, {Component, PropTypes} from 'react';

import App from './kaoqin'


import {HttpService, Toast, GetCurrentDate} from'../Http';

import {doLogin, change, getOneBabyid, changeSaveBabyStatus, getMap, getCurrentPower, exportMap} from '../action/index'


import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


import '../less/index.less'

import '../less/deviceList.less'

import qiehuan from '../../src/img/qiehuan.png'

import touxiang from '../../src/img/touxiang.png'


import guanbi from '../../src/img/guanbi.png'

import lsb from '../../src/img/bind/lsb.png'


class MapIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lng: '120.153576',
            lat: '30.287459',
            isOpen: false,
            mapHeight: '100%',
            mapBottom: '4.5rem',
            checked: false,
            babyname: '',
            babyid: '',

        };


    }


    componentWillMount() {

        // window.localStorage.delDevice=false;//是否解绑过设备

        window.localStorage.sid1 = this.props.params.sid.replace("+", "%2B").replace(" ", "%20").replace(/\//g, "%2F");

        if (!this.props.babyid) {
            //   alert('没值')

            this.props.doLogin(this.props.params.sid);

        } else {
            //是否改变过宝贝 1改了 0没改变

            if (localStorage.delDevice != 1) {

                this.props.getMap(this.props.babyid)

            } else {
                this.props.getOneBabyid();
            }

        }


        if (this.state.isOpen == false) {
            this.isOpen()
        }


    }

    componentWillUnmount() {

        console.log(this.props.exportMap);

        this.props.exportMap.clearMap();
        var node = document.getElementById('container');
        if (!!node.parentNode) {
            console.log(22);
            node.parentNode.removeChild(node);
        }

        window.localStorage.delDevice = 0;
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


    }

    more() {
        this.setState({
            checked: true
        })
    }

    guanbi() {
        this.setState({
            checked: false
        })
    }


    changeAge(f) {
        HttpService.query({
            url: '/app/object/saveBaby',
            data: {
                familystatus: f,
                babyid: this.props.babyid,
                token: localStorage.appToken
            },
            success: (res=> {


                if (res.code == '10042') {

                    console.log(res);


                    this.props.changeSaveBabyStatus(false);


                    //window.location.href = '/#/map/' + localStorage.sid1 + '';

                } else {
                    Toast.toast(res.msg, 3000);
                }
            })
        })


    }

    getLocation() {

        this.props.getMap(this.props.babyid);

        // this.init(116.397428, 39.90923)
    }


    isOpen() {


        if (!this.state.isOpen) {
            this.setState({
                isOpen: true,
                mapBottom: '13.5rem'
            });

        } else {
            this.setState({
                isOpen: false,
                mapBottom: '4.5rem'
            });
        }

    }

    render() {

        const getCurrenttime = GetCurrentDate.time();

        const {babyName, babytelephone, list, babyid, headimg, values, lng, lat, gpstime, getGuardiansList, _checked, abc, address, isLogin, datasource}=this.props;

        console.log(this.props.exportMap);


        const checked = this.state.checked;




        let listItem = list.map((json, index)=> {
            return (
                <div className="device-info" key={index}
                     onClick={this._change.bind(this, json.babyname, json.babyid, json.headimg, json.babytelephone)}>
                    <div className="headimg">

                        {
                            !json.headimg ?
                                <img src={touxiang} style={{
                                    width: '3.4rem',
                                    height: '3.4rem'
                                }}/> :
                                <img src={"/media" + json.headimg} style={{
                                    width: '3.4rem',
                                    height: '3.4rem'
                                }}/>
                        }
                    </div>
                    <div className="info">
                        <div className="name">{json.babyname}</div>
                        <div className="time">设备有效日期{json.starttime}</div>
                    </div>

                </div>
            )
        })


        return (
            <div>


                {/*我的设备*/}
                {/*<div style={{display: checked == true ? 'block' : 'none'}}>*/}

                {
                    checked == true ?

                        <div>
                            <div className="_z"></div>
                            <div className="layer_content">
                                <div className="header">
                                    <div className="left"></div>
                                    <div className="title">我的设备</div>
                                    <div className="guanbi"><img src={guanbi}
                                                                 style={{width: '2.2rem', height: '2.2rem'}}
                                                                 onClick={this.guanbi.bind(this)}/></div>
                                </div>
                                <div className="layer_content2">
                                    {
                                        listItem
                                    }

                                </div>
                            </div>
                        </div> :
                        null
                }


                {
                    isLogin == false ?
                        <div>

                            <div className="add-device">

                            </div>
                            <div className="add-device-content">
                                <div className="content">
                                    <div style={{width: '20rem', height: '25rem', position: 'relative'}}>

                                        <img src={lsb} style={{width: '20rem', height: '25rem'}}/>
                                        {/*<img src={dian} alt=""/>*/}

                                        {/*<Link to="/AddDevice">*/}
                                        <div className="_btn btn_btn" style={{bottom: '3rem'}}><a style={{textDecoration:'none'}}
                                            href="tel:400-655-3588">电话咨询</a></div>
                                        {/*</Link>*/}

                                    </div>


                                </div>

                            </div>
                        </div> :
                        null

                }




                <div className="box">
                    <div className="box1">


                        {/*<img src={"/media" + headimg} style={{width: '3.4rem', height: '3.4rem'}}/>*/}

                        {
                            !headimg ?
                                <img src={touxiang} style={{
                                    width: '3.4rem',
                                    height: '3.4rem'
                                }}/> :
                                <img src={"/media" + headimg} style={{
                                    width: '3.4rem',
                                    height: '3.4rem'
                                }}/>
                        }
                    </div>
                    <div className="box2">

                        <div>{babyName}</div>


                    </div>

                    <div className="box3" onClick={this.more.bind(this)}>
                        <img src={qiehuan} style={{width: '2.2rem', height: '3rem'}}/>
                    </div>

                </div>

                <div style={{height: '1rem', background: '#eee'}}></div>

                {
                    !this.state.checked?<App babyid={this.props.babyid}/>:null
                }




            </div>
        )
    }


}


const mapStateToProps = state => {
    return {
        list: state.login.list,
        babyName: state.login.babyName,
        babyid: state.login.babyid,
        babytelephone: state.login.babytelephone,
        headimg: state.login.headimg,
        values: state.login.values,
        lng: state.login.lng,
        lat: state.login.lat,
        gpstime: state.login.gpstime,
        getGuardiansList: state.login.getGuardiansList,
        _checked: state.login.checked,
        abc: state.login.abc,
        address: state.login.addr,
        datasource: state.login.datasource,
        isLogin: state.login.isLogin,
        exportMap: state.login.exportMap

    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        doLogin: doLogin,
        change: change,
        getOneBabyid: getOneBabyid,
        changeSaveBabyStatus: changeSaveBabyStatus,
        getMap: getMap,
        getCurrentPower: getCurrentPower,
        exportMap: exportMap,
    }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(MapIndex);


