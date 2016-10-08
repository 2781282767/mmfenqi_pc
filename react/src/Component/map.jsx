'usr strict';
import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';


import HttpService from'../Http';

import {doLogin,getCurrentPower,change} from '../action/index'


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import {Router, Route, IndexRoute, browserHistory, Link} from 'react-router';

import '../less/index.less'

import '../less/deviceList.less'

import usrimg from '../../src/img/user.png'

import qiehuan from '../../src/img/qiehuan.png'

import dian2 from '../../src/img/dianliang1.png'
import dian3 from '../../src/img/dianliang2.png'
import dian4 from '../../src/img/dianliang3.png'
import dian1 from '../../src/img/didianliang.png'
import dian from '../../src/img/lixian.png'

import wifi from '../../src/img/wifi.png'

import touxiang from '../../src/img/touxiang.png'

import shouqi from '../../src/img/shouqi.png'


import dingweixiao  from '../../src/img/dingweixiao.png'

import tonghuaxiao from '../../src/img/tonghuaxiao.png'

import zhankai from '../../src/img/zhankai.png'

import tonghua from '../../src/img/tonghua.png'

import anquan from '../../src/img/anquan.png'

import tianjia from '../../src/img/tianjia.png'

import more from '../../src/img/more.png'


import jianhuchengyuan  from '../../src/img/jianhuchengyuan.png'


import  genghuan from '../../src/img/genghuan.png'

import  jiebang from '../../src/img/jiebang.png'

 class MapIndex extends React.Component{
    constructor(props){
        super(props);

        this.state={
            lng:'120.153576',
            lat:'30.287459',
            isOpen:false,
            mapHeight:'100%',
            mapBottom:'13.5rem',
            checked:false,
            babyname:'',
            babyid:''
        };
    }

    componentWillMount(){

        this.props.doLogin();


       // this.props.getCurrentPower(this.props.babyid);

    }

    componentDidMount(){
        this.init();


    }

     componentWillReceiveProps(){


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

     more(){
         this.setState({
             checked:true
         })
     }

    render(){


        const {babyName,babytelephone,list,babyid,headimg,value}=this.props;


        const lng=this.state.lng;
        const lat=this.state.lat;
        var isOpen=this.state.isOpen;

        var mapHeight=this.state.mapHeight;
        const mapBottom=this.state.mapBottom;


        const checked=this.state.checked;


        return (
            <div className="container">

                {
                    checked==true?
                        <div>
                            <div className="_z"></div>
                            <div className="layer_content">
                                <div className="header">
                                    <div className="title">李</div>
                                </div>
                                <div className="layer_content2">
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
                            </div>
                        </div>
                        :
                        null
                }



                {/*<div className="box">*/}
                    {/*<div className="userImg"></div>*/}
                    {/*<div className="info">*/}
                        {/*<div>李建彬</div>*/}
                        {/*<div>设置主题曲</div>*/}
                    {/*</div>*/}
                    {/*<div className="other"></div>*/}
                {/*</div>*/}

                <div className="box">
                    <div className="box1">
                        <img src={"/media"+headimg} style={{width:'3.4rem',height:'3.4rem'}}/>
                    </div>
                    <div className="box2">
                        <div className="babyName">
                            <span className="row1">{babyName}</span>
                            <span className="row2">【上报时间】</span>
                            <span className="row3"></span>
                            <img src={wifi} style={{width:'1.2rem',height:'1.2rem'}}/>&nbsp;

                            {
                                value=='0'?
                                    <img src={dian} style={{width:'1.8rem',height:'1.1rem'}}/>
                                        :
                                        value=='1'?
                                            <img src={dian1} style={{width:'1.8rem',height:'1.1rem'}}/>
                                            :
                                            value=='2'?
                                                <img src={dian2} style={{width:'1.8rem',height:'1.1rem'}}/>
                                                :
                                                value=='3'?
                                                    <img src={dian3} style={{width:'1.8rem',height:'1.1rem'}}/>
                                                    :
                                                    value=='4'?
                                                        <img src={dian4} style={{width:'1.8rem',height:'1.1rem'}}/>
                                                        :
                                                        null
                            }

                            <img src={dian} style={{width:'1.8rem',height:'1.1rem',display:value=='0'?'inlineBlock':'none'}}/>
                            <img src={dian1} style={{width:'1.8rem',height:'1.1rem',display:value=='1'?'inlineBlock':'none'}}/>
                            <img src={dian2} style={{width:'1.8rem',height:'1.1rem',display:value=='2'?'inlineBlock':'none'}}/>
                            <img src={dian3} style={{width:'1.8rem',height:'1.1rem',display:value=='3'?'inlineBlock':'none'}}/>
                            <img src={dian4} style={{width:'1.8rem',height:'1.1rem',display:value=='4'?'inlineBlock':'none'}}/>


                        </div>
                        <div className="addr">
                            13:12 杭仍要三lkhtk要
                        </div>

                    </div>
                    
                    <div className="box3" onClick={this.more.bind(this)}>
                        <img src={qiehuan} style={{width:'2.2rem',height:'3rem'}}/>
                    </div>
                </div>
                <div id="container" style={{width:'100%',height:'100%',position:'absolute',bottom:mapBottom,overflow:'hidden',margin:'0'}}>

                    {/*<div style={{position:'absolute',bottom:'5rem',left:'2rem',zIndex:'3'}} onClick={this.isOpen.bind(this)}>开始</div>*/}
                </div>

                {
                    isOpen==true?
                        <div className="little-menu" style={{height:'4.5rem',background:'#fff',width:'100%',position:'absolute',bottom:'0'}}>
                            <div onClick={this.getLocation.bind(this,lng,lat)}>
                                <img src={dingweixiao} style={{width:'2.1rem',height:'2.1rem'}}/>
                                <div>定位</div>
                            </div>
                            <div onClick={this.isOpen.bind(this)}>
                                <img src={zhankai} style={{width:'2.3rem',height:'2.3rem'}}/>
                                <div>展开</div>
                            </div>
                            <div>
                                <a href={"tel:"+babytelephone}>
                                    <img src={tonghuaxiao} style={{width:'2.1rem',height:'2.1rem'}}/>
                                    <div>通话</div>
                                </a>
                            </div>
                        </div>
                        :
                        <div className="menu" style={{height:'13.5rem',background:'#fff',width:'100%',position:'absolute',bottom:'0'}}>

                                <div className="option" onClick={this.getLocation.bind(this,lng,lat)}>
                                    <img src={usrimg} style={{width:'2.3rem',height:'2.3rem'}}/>
                                    <div>定位</div>
                                </div>
                                <div className="option">
                                    <a href={"tel:"+babytelephone}>
                                        <img src={tonghua} style={{width:'2.3rem',height:'2.3rem'}}/>
                                        <div>通话</div>
                                    </a>
                                </div>
                                <div className="option">
                                    <Link to="/about">
                                    <img src={jianhuchengyuan} style={{width:'2.3rem',height:'2.3rem'}}/>

                                    <div>监护成员</div>
                                        </Link>
                                </div >
                                <div className="option">
                                    <img src={anquan} style={{width:'2.3rem',height:'2.3rem'}}/>

                                    <div>安全区域</div>
                                </div>
                            <div className="option">
                                <img src={tianjia} style={{width:'2.3rem',height:'2.3rem'}}/>
                                <div>添加设备</div>
                            </div>
                            <div className="option">
                                <img src={genghuan} style={{width:'2.3rem',height:'2.3rem'}}/>
                                <div>更换设备</div>
                            </div>
                            <div className="option">
                                <img src={jiebang} style={{width:'2.3rem',height:'2.3rem'}}/>
                                <div>解绑设备</div>
                            </div>
                            <div className="option">
                                <img src={more} style={{width:'2.3rem',height:'2.3rem'}}/>
                                <div>更多</div>
                            </div>


                            <div className="shouqi" onClick={this.isOpen.bind(this)}>
                                <img src={shouqi} style={{width:'2.1rem',height:'2.1rem'}}/>
                                <div>收起</div>
                            </div>


                        </div>
                }

            </div>
        )
    }

    getLocation(lng,lat){

        this.setState({
            lag:lng,
            lat:lat
        });
       this.init();
    }


    isOpen(){

        console.log(this.state.isOpen);

        if(!this.state.isOpen){
            this.setState({
                isOpen:true,
                mapBottom:'4.5rem'
            });

        }else{
            this.setState({
                isOpen:false,
                mapBottom:'13.5rem'
            });
        }

    }


    init(){
        var mapObj,marker;
        mapObj = new AMap.Map('container',{
            zoom: 15,
            center: [this.state.lng,this.state.lat],
            resizeEnable:true,
        });


        marker = new AMap.Marker({
            icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            position: [120.153576, 30.287459]
        });
        marker.setMap(mapObj);
    }
}


const mapStateToProps = state => {
    return {
        list:state.login.list,
        babyName:state.login.babyName,
        babyid:state.login.babyid,
        babytelephone:state.login.babytelephone,
        headimg:state.login.headimg,
        value:state.login.value
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        doLogin:doLogin,
        change:change
       // getCurrentPower:getCurrentPower
    },dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(MapIndex);


