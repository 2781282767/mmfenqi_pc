'usr strict';
import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';


import {HttpService, Toast,GetCurrentDate} from'../Http';

import {doLogin, change,getMap} from '../action/index'


import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


import {Router, Route, IndexRoute, browserHistory, Link} from 'react-router';

import '../less/index.less'

import '../less/deviceList.less'

import '../less/my.bootstrap.min.css'

import usrimg from '../../src/img/user.png'

import qiehuan from '../../src/img/qiehuan.png'

import dian2 from '../../src/img/dianliang1.png'
import dian3 from '../../src/img/dianliang2.png'
import dian4 from '../../src/img/dianliang3.png'
import dian1 from '../../src/img/didianliang.png'
import dian from '../../src/img/lixian.png'

import lishiguiji from '../../src/img/lishiguiji.png'

import add from '../../src/img/add.png'

import wifi from '../../src/img/wifi.png'

import touxiang from '../../src/img/touxiang.png'

import shouqi from '../../src/img/shouqi.png'



import dingweixiao  from '../../src/img/dingweixiao.png'
import dingwei  from '../../src/img/dingwei.png'
import tongzhi  from '../../src/img/tongzhi.png'

import tonghuaxiao from '../../src/img/tonghuaxiao.png'

import zhankai from '../../src/img/zhankai.png'

import tonghua from '../../src/img/tonghua.png'

import anquan from '../../src/img/anquan.png'

import tianjia from '../../src/img/tianjia.png'

import more from '../../src/img/more.png'


import jianhuchengyuan  from '../../src/img/jianhuchengyuan.png'


import  genghuan from '../../src/img/genghuan.png'

import  jiebang from '../../src/img/jiebang.png'

import kaoqin from '../../src/img/kaoqin.png'
import yichang from '../../src/img/yichange.png'



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

            _isopen: false,

            bbb:false,

            list: [
                {
                    img: '../../src/img/bind/baba.png',
                    img1: '../../src/img/bind/baba1.png',
                    familystatus: '爸爸',
                    ds: '此称呼对应为设备按键'
                },
                {
                    img: '../../src/img/bind/ma.png',
                    img1: '../../src/img/bind/ma1.png',
                    familystatus: '妈妈',
                    ds: '此称呼对应为设备按键'
                },
                {
                    img: '../../src/img/bind/family.png',
                    img1: '../../src/img/bind/family1.png',
                    familystatus: '家庭',
                    ds: '此称呼对应为设备按键'
                },
                {
                    img: '../../src/img/bind/gege.png',
                    img1: '../../src/img/bind/gege1.png',
                    familystatus: '哥哥',
                    ds: '此称呼对应为家庭成员'
                },
                {
                    img: '../../src/img/bind/jiejie.png',
                    familystatus: '姐姐',
                    img1: '../../src/img/bind/jiejie1.png',
                    ds: '此称呼对应为家庭成员'
                },
                {
                    img: '../../src/img/bind/tr.png',
                    img1: '../../src/img/bind/tr1.png',
                    familystatus: '班主任',
                    ds: '仅作为添加班主任时使用'
                },
                {
                    img: '../../src/img/bind/shu.png',
                    img1: '../../src/img/bind/shu1.png',
                    familystatus: '叔叔',
                    ds: '此称呼对应为家庭成员'
                },
                {
                    img: '../../src/img/bind/ye.png',
                    img1: '../../src/img/bind/ye1.png',
                    familystatus: '爷爷',
                    ds: '此称呼对应为家庭成员'
                },
                {
                    img: '../../src/img/bind/nai.png',
                    img1: '../../src/img/bind/nai1.png',
                    familystatus: '奶奶',
                    ds: '此称呼对应为家庭成员'
                },
                {
                    img: '../../src/img/bind/wai.png',
                    img1: '../../src/img/bind/wai1.png',
                    familystatus: '外公',
                    ds: '此称呼对应为家庭成员'
                },
                {
                    img: '../../src/img/bind/waipo.png',
                    img1: '../../src/img/bind/waipo1.png',
                    familystatus: '外婆',
                    ds: '此称呼对应为家庭成员'
                }
            ]
        };


    }


    componentWillMount() {



        window.localStorage.sid = this.props.params.sid;


        console.log(this.props.lng=='');



        if(!this.props.babyid){
         //   alert('没值')

        }else{
          //  alert('进来了');
//
            this.props.getMap(this.props.babyid);

        }


                if(this.props.values==''){


                    this.props.doLogin(this.props.params.sid);
                }else{


                }



                // if(!this.props.babyid){
                //     alert('存在')
                // }




    }




    componentDidMount(){




    }

    getBabyid(){
        HttpService.query({
            url: '/app/object/getBabys',
            data: {token: localStorage.appToken},
            success: (res=> {

                console.log(res);


                if (res.code == 10020) {
                    this.getA(res.data[0].babyid)
                }
            })

        })


    }
     getA(babyid) {
         HttpService.query({
             url: '/app/object/getGuardians',
             data: {
                 token: localStorage.appToken,
                 babyid: babyid
             },
             success: (res=> {
                 console.log(res);

                 if (res.code == '10068') {

                     console.log(res.data);


                     var getGuardiansList = res.data;

                     for (var a in getGuardiansList) {
                         if (getGuardiansList[a].familystatus == '家长') {
                             this.setState({
                                 bbb:true
                             });

                             break;

                         } else {
                             this.setState({
                                 bbb:false
                             })
                         }
                     }

                 }

             })
         })
     }


    // init(lng, lat) {
    //     var map = new AMap.Map("container", {
    //         resizeEnable: true,
    //         center: [116.397428, 39.90923],
    //         zoom: 13
    //     });
    //     //获取用户所在城市信息
    //
    //         //实例化城市查询类
    //         var citysearch = new AMap.CitySearch();
    //         //自动获取用户IP，返回当前城市
    //         citysearch.getLocalCity(function(status, result) {
    //             if (status === 'complete' && result.info === 'OK') {
    //                 if (result && result.city && result.bounds) {
    //                     var cityinfo = result.city;
    //                     var citybounds = result.bounds;
    //                  //   document.getElementById('tip').innerHTML = '您当前所在城市：'+cityinfo;
    //                     //地图显示当前城市
    //                     map.setBounds(citybounds);
    //
    //                     console.log(cityinfo);
    //                 }
    //             } else {
    //                // document.getElementById('tip').innerHTML = result.info;
    //             }
    //         });
    //
    //     }
    // }


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

    guanbi(){
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
                console.log(res);

                if (res.code == '10042') {
                    this.setState({
                        bbb: false,
                    });



                   // this.props.doLogin(this.props.params.sid);


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

        console.log(this.state.isOpen);

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

        const getCurrenttime=GetCurrentDate.time();


        const {babyName, babytelephone, list, babyid, headimg, values, lng, lat, gpstime, getGuardiansList, _checked,aaa,address,isLogin}=this.props;














        console.log(this.props);

        var isOpen = this.state.isOpen;
        var mapHeight = this.state.mapHeight;
        const mapBottom = this.state.mapBottom;
        const checked = this.state.checked;


        return (
            <div>


                {/*更换设备*/}
                {

                    checked == true ?
                        <div>
                            <div className="_z"></div>
                            <div className="layer_content">
                                <div className="header">
                                    <div className="left"></div>
                                    <div className="title">我的设备</div>
                                    <div className="guanbi"><img src="../../src/img/guanbi.png" style={{width:'2.2rem',height:'2.2rem'}} onClick={this.guanbi.bind(this)}/></div>
                                </div>
                                <div className="layer_content2">
                                    {
                                        list.map((json, index)=> {
                                            return (
                                                <div className="device-info" key={index}
                                                     onClick={this._change.bind(this, json.babyname, json.babyid, json.headimg, json.babytelephone)}>
                                                    <div className="headimg">

                                                        {
                                                            !json.headimg?
                                                                <img src={touxiang} style={{
                                                                    width: '3.4rem',
                                                                    height: '3.4rem'
                                                                }}/>:
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
                                    }

                                </div>
                            </div>
                        </div>
                        :
                        null
                }

                {/*是否为0*/}
                {/*_checked == 'true' ?*/}

                {

                    _checked == 'true' ?
                        <div>
                            <div className="add-device">

                            </div>

                            <div className="add-device-content">
                                <div className="content">
                                    <div style={{width: '20rem', height: '25rem', position: 'relative'}}>

                                        <img src={add} style={{width: '20rem', height: '25rem'}}/>

                                        <Link to="/AddDevice">
                                            <div className="_btn btn_btn">添加设备</div>
                                        </Link>

                                    </div>


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

                                        <img src={yichang} style={{width: '20rem', height: '25rem'}}/>

                                        {/*<Link to="/AddDevice">*/}
                                            <div className="_btn btn_btn" style={{bottom:'3rem'}}><a href="tel:400-655-3588">电话咨询</a></div>
                                        {/*</Link>*/}

                                    </div>


                                </div>

                            </div>


                        </div> :
                        null
                }

                {
                      this.state.bbb?

                        <div>
                            <div className="_zz"></div>
                            <div className="layer_content3">
                                <div className="header">f
                                    <div className="title">选择成员关系</div>
                                </div>
                                <div className="layer_content4">


                                    {
                                        getGuardiansList.map((json, index)=> {
                                            return <div className="row" key={index}
                                                        onClick={this.changeAge.bind(this, json.familystatus)}>

                                                <div className="left">
                                                    {
                                                        json.check == true ?
                                                            <img src={json.img1}/> :
                                                            <img src={json.img}/>
                                                    }

                                                </div>
                                                <div className="right">

                                                    {
                                                        json.title != '家庭' ?

                                                            <div className="one">我是{json.familystatus}</div> :
                                                            <div className="one">{json.familystatus}</div>

                                                    }

                                                    <div className="two">{json.ds}</div>

                                                </div>
                                            </div>
                                        })
                                    }


                                </div>


                            </div>


                        </div> :
                        null

                }


                <div className="box">
                    <div className="box1">


                        {/*<img src={"/media" + headimg} style={{width: '3.4rem', height: '3.4rem'}}/>*/}

                        {
                            !headimg?
                                <img src={touxiang} style={{
                                    width: '3.4rem',
                                    height: '3.4rem'
                                }}/>:
                                <img src={"/media" + headimg} style={{
                                    width: '3.4rem',
                                    height: '3.4rem'
                                }}/>
                        }
                    </div>
                    <div className="box2">
                        <div className="babyName">
                            <span className="row1">{babyName}</span>
                            <span className="row2">[最后上报时间]</span>
                            <span className="row3"></span>
                            <img src={wifi} style={{width: '1.2rem', height: '1.2rem'}}/>&nbsp;

                            {
                                values == '0' ?
                                    <img src={dian} style={{width: '1.3rem', height: '1.1rem',marginLeft:'0'}}/>
                                    :
                                    values == '1' ?
                                        <img src={dian1} style={{width: '1.8rem', height: '1.1rem',marginLeft:'0'}}/>
                                        :
                                        values == '2' ?
                                            <img src={dian2} style={{width: '1.8rem', height: '1.1rem',marginLeft:'0'}}/>
                                            :
                                            values == '3' ?
                                                <img src={dian3} style={{width: '1.8rem', height: '1.1rem',marginLeft:'0'}}/>
                                                :
                                                values == '4' ?
                                                    <img src={dian4} style={{width: '1.8rem', height: '1.1rem',marginLeft:'0'}}/>
                                                    :
                                                    null
                            }


                        </div>
                        {/*<div className="addr">*/}
                            {/*{gpstime}*/}
                        {/*</div>*/}

                        <div className="address">
                            <div className="ss">

                                {
                                    !gpstime?
                                        <span>{getCurrenttime}</span>:


                                    gpstime.substring(11,16)
                                }
                                &nbsp;

                            {
                                !address?
                                <span>当前设备未定位!</span>:
                                <span>{address}</span>

                            }

                            </div>


                        </div>

                    </div>

                    <div className="box3" onClick={this.more.bind(this)}>
                        <img src={qiehuan} style={{width: '2.2rem', height: '3rem'}}/>
                    </div>
                    {/*<div className="box3">*/}
                    {/*<Link to="/deviceList"><img src={qiehuan} style={{width:'2.2rem',height:'3rem'}}/></Link>*/}
                    {/*</div>*/}
                </div>
                <div id="container" style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    bottom: mapBottom,
                    overflow: 'hidden',
                    margin: '0'
                }}>


                    {/*<div style={{position:'absolute',bottom:'5rem',left:'2rem',zIndex:'3'}} onClick={this.isOpen.bind(this)}>开始</div>*/}
                </div>
                {/*<div id="container2" style={{*/}
                    {/*width: '100%',*/}
                    {/*height: '100%',*/}
                    {/*position: 'absolute',*/}
                    {/*bottom: mapBottom,*/}
                    {/*overflow: 'hidden',*/}
                    {/*margin: '0'*/}
                {/*}}>*/}
                    {/*</div>*/}

                {
                    isOpen == false ?
                        <div className="little-menu" style={{
                            height: '4.5rem',
                            background: '#fff',
                            width: '100%',
                            position: 'absolute',
                            bottom: '0'
                        }}>
                            <div onClick={this.getLocation.bind(this)}>
                                <img src={dingweixiao} style={{width: '2.1rem', height: '2.1rem'}}/>
                                <div>定位</div>
                            </div>
                            <div onClick={this.isOpen.bind(this)}>
                                <img src={zhankai} style={{width: '2rem', height: '2rem'}}/>
                                <div>展开</div>
                            </div>
                            <div>
                                <a href={"tel:" + babytelephone}>
                                    <img src={tonghuaxiao} style={{width: '2.1rem', height: '2.1rem'}}/>
                                    <div>通话</div>
                                </a>
                            </div>
                        </div>
                        :
                        <div className="menu" style={{
                            height: '13.5rem',
                            background: '#fff',
                            width: '100%',
                            position: 'absolute',
                            bottom: '0'
                        }}>

                            <div className="option" onClick={this.getLocation.bind(this, lng, lat)}>
                                <img src={dingwei} style={{width: '2.3rem', height: '2.3rem'}}/>
                                <div>定位</div>
                            </div>
                            <div className="option">
                                <a href={"tel:" + babytelephone}>
                                    <img src={tonghua} style={{width: '2.3rem', height: '2.3rem'}}/>
                                    <div>通话</div>
                                </a>
                            </div>
                            <div className="option">
                                <Link to={'/App/'+babyid+''}>
                                    <img src={kaoqin} style={{width: '2.3rem', height: '2.3rem'}}/>

                                    <div>考勤</div>
                                </Link>
                            </div>

                            <div className="option">
                                <Link to={'/about/'+babyid+'/'+lng+'/'+lat+''}>
                                    <img src={lishiguiji} style={{width: '2.3rem', height: '2.3rem'}}/>

                                    <div>历史轨迹</div>
                                </Link>
                            </div >




                            <div className="option">

                                    <img src={tianjia} style={{width: '2.3rem', height: '2.3rem'}}/>
                                    <div>添加设备</div>

                            </div>
                            {/*<div className="option">*/}
                                {/*<Link to="/AddDevice">*/}
                                    {/*<img src={tianjia} style={{width: '2.3rem', height: '2.3rem'}}/>*/}
                                    {/*<div>添加设备</div>*/}
                                {/*</Link>*/}
                            {/*</div>*/}
                            <div className="option">
                                <img src={anquan} style={{width: '2.3rem', height: '2.3rem'}}/>
                                <div>安全区域</div>
                            </div>



                            <div className="option">
                                <img src={tongzhi} style={{width: '2.3rem', height: '2.3rem'}}/>
                                <div>学校通知</div>
                            </div>



                            <div className="option">

                                <img src={more} style={{width: '2.3rem', height: '2.3rem'}}/>
                                <div>更多</div>

                            </div>


                            <div className="shouqi" onClick={this.isOpen.bind(this)}>
                                <img src={shouqi} style={{width: '2rem', height: '2rem'}}/>
                                <div>收起</div>
                            </div>


                        </div>
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
        aaa:state.login.abc,
        address:state.login.addr,
        isLogin:state.login.isLogin
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        doLogin: doLogin,
        change: change,
        getMap:getMap
    }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(MapIndex);


