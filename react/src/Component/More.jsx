'usr strict';

import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';
import {R_header} from './common/index';
import {HttpService, Toast}  from'../Http';


import endtime from '../img/more/endtime.png'
import phone from '../img/more/phone.png'
import deletes from '../img/more/delete.png'




export default class More extends React.Component {


    constructor(props){
        super(props);

        this.state={
            info:{}
        }
    }

    componentWillMount(){


        HttpService.query({
            url:'/app/object/getBaby',
            data:{
                token: localStorage.appToken,
                babyid: this.props.params.babyid,
            },
            success:(res=>{
                console.log(res)
                if(res.code=='10038'){
                    this.setState({
                        info:{
                            url:'http://qr.liantu.com/api.php?&w=200&text='+res.data.mdtid+'',
                            mdtid:res.data.mdtid,
                            telephone:res.data.telephone,
                            endTime:res.data.endtime,
                            userid:res.data.userid
                        }
                    })
                }
            })
        })

    }


    deviceCancel(){
        HttpService.query({
            url:'/app/object/cancelBaby2',
            data:{
                token: localStorage.appToken,
                babyid: this.props.params.babyid,
                guardianid:this.state.info.userid
            },

            success:(res=>{
                console.log(res)
            })

        });

    }

    render(){

        const {info} =this.state;
        return(
            <div className="more">
                <R_header left="1" title="更多"/>
                

                <div className="more-content">
                    <div className="barcode">
                        <img src={info.url}/>

                        <div className="mdtid" style={{color:'#333'}}>扫描二维码关注宝贝的设备</div>

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


                    {/*<div className="endtime" onClick={this.deviceCancel.bind(this)}>*/}
                        {/*<div className="img">*/}
                            {/*<img src={deletes} alt=""/>*/}
                        {/*</div>*/}

                        {/*<div className="input">解绑设备</div>*/}

                        {/*<div className="select">*/}



                        {/*</div>*/}

                    {/*</div>*/}




                </div>

            </div>
        )
    }



}
