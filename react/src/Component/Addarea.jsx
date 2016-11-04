'usr strict';

import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';
import {R_header} from './common/index';
import {HttpService, Toast}  from'../Http';
// import { View, Alert } from 'react-native';

// import SearchBar from 'react-search-bar'

// import { SearchBar } from 'antd-mobile/lib/search-bar/index';


import dizhi from '../../src/img/safetyarea/dizhi.png'
import quyuming from '../../src/img/safetyarea/quyuming.png'

import dingweidian from '../../src/img/safetyarea/dingweidian.png'
import sousu from '../../src/img/sousu.png'


import NamePicker from './NamePicker'


export default class Addarea extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            address: [],
            isPickerShow: false,
            radius: [],
            centerlng: [],
            centerlat: [],
            search: false,
            map: {},
            tips:[],
            placeSearch:''


        };

    }


    componentWillMount() {


        window.localStorage.saveSafeRegion=false;


        console.log(this.props.params.radius);

        if (this.props.params.radius == null) {
            this.setState({
                radius: '500米'
            })
        } else {
            this.setState({
                radius: this.props.params.radius,
                centerlng: this.props.params.centerlng,
                centerlat: this.props.params.centerlat

            })
        }



    }


    getAddr(lng, lat) {


        var self2 = this;

        var lnglatXY = [lng, lat]; //已知点坐标


        var geocoder = new AMap.Geocoder(
            {
                radius: 1000,
                extensions: "all"
            }
        );
        geocoder.getAddress(lnglatXY, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {

                console.log(result);

                var address = result.regeocode.formattedAddress; //返回地址描述

                console.log(address);
                self2.setState({
                    address: address,
                    centerlng: lng,
                    centerlat: lat,

                })

            }
        });
    }


    componentDidMount() {



        document.getElementById('tipinput').addEventListener('keypress',function(e){


           //  alert(e.keyCode);
            // if(e.keyCode === 13) {
            //     // 处理相关逻辑
            //
            //
            //     alert(22)
            // }
        });



        // document.getElementById("tipinput").addEventListener('blur',function () {
        //     if(!self.state.search){




        var self = this;


        var map, geolocation, map2, map3;
        if (this.state.centerlng != 'null') {



            document.getElementById('safetyarea2').style.display = 'block';
            document.getElementById('safetyarea').style.display = 'none';


            map2 = new AMap.Map('safetyarea2', {
                resizeEnable: true,
                zoom: 15,
                center: [this.state.centerlng, this.state.centerlat]
            });




            self.getAddr(this.state.centerlng, this.state.centerlat);


            map2.on('moveend', function (e) {


                self.getAddr(map2.getCenter().getLng(), map2.getCenter().getLat());

                self.setState({
                    centerlng: map2.getCenter().getLng(),
                    centerlat: map2.getCenter().getLat(),
                    isPickerShow: false

                })

            });


            self.setState({
                map: map2
            });

            self.changeName(map2)


        } else {



            document.getElementById('safetyarea2').style.display = 'none';
            document.getElementById('safetyarea').style.display = 'block';

            map = new AMap.Map('safetyarea',{
                resizeEnable: true,
                zoom: 15,
            });

            var geolocation;

            map.plugin('AMap.Geolocation', function () {


                var geoOptions={
                    zoomToAccuracy: true,  timeout:200000, enableHighAccuracy:true
                };



                geolocation=new AMap.Geolocation(geoOptions);

                geolocation.getCurrentPosition();

                AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
            });
            //
            self.setState({
                map: map
            });


            self.changeName(map);



            function onComplete(data) {

                map3 = new AMap.Map('safetyarea', {
                    resizeEnable: true,
                    zoom: 15,
                    center: [data.position.lng, data.position.lat]
                });
                self.getAddr(data.position.lng, data.position.lat);
                map3.on('moveend', function (e) {

                    self.getAddr(map3.getCenter().getLng(), map3.getCenter().getLat());

                    self.setState({
                        centerlng: map3.getCenter().getLng(),
                        centerlat: map3.getCenter().getLat(),
                        isPickerShow: false

                    })

                });

                self.setState({
                    map: map3
                });

                self.changeName(map3)
            }

        }


    }








    changeName(map) {
        var self3 = this;
        //输入提示

        map.plugin(["AMap.Autocomplete"], function () {
            //判断是否IE浏览器
            if (navigator.userAgent.indexOf("MSIE") > 0) {
                document.getElementById("tipinput").onpropertychange = autoSearch;
            }
            else {

                document.getElementById("tipinput").oninput = autoSearch;
            }
        });


        var placeSearch;
        function autoSearch() {
            var keywords = document.getElementById("tipinput").value;
            var auto;

            var autoOptions = {
                pageIndex:1,
                pageSize:10,
                city: "" //城市，默认全国
            };


            auto = new AMap.Autocomplete(autoOptions);

             placeSearch= new AMap.PlaceSearch({
                map: map
            });  //构造地点查询类

            self3.setState({
                placeSearch:placeSearch
            });


            //查询成功时返回查询结果
            AMap.event.addListener(auto, "complete", autocomplete_CallBack);
            auto.search(keywords);
        }


        // function autoSearch() {
        //     var keywords = document.getElementById("tipinput").value;
        //     var auto;
        //     var autoOptions = {
        //         pageIndex:1,
        //         pageSize:10,
        //         input:'tipinput',
        //         city: "" //城市，默认全国
        //     };
        //     auto = new AMap.Autocomplete(autoOptions);
        //     //查询成功时返回查询结果
        //     // AMap.event.addListener(auto, "complete", autocomplete_CallBack);
        //     AMap.event.addListener(auto, "select", select);
        //     auto.search(keywords);
        // }



        function autocomplete_CallBack(data) {

            console.log(data);
            var resultStr = "";

            console.log(data.tips);

            self3.setState({
                tips:data.tips
            });

            document.getElementById("result1").style.display = "block";

        }
    }




    save() {



        if(!this.refs.name.value)  {
            Toast.toast('请输入安全区域名称',3000);
            return
        }


        if (this.props.params.regionid == 'null') {
            const data = {
                token: localStorage.appToken,
                babyid: localStorage.babyid,
                centerlng: this.state.centerlng,
                centerlat: this.state.centerlat,
                regionid: '',
                address: this.state.address,
                radius: this.state.radius,
                name: this.refs.name.value
            };
            this.saveSafeRegion(data);
        } else {
            const data2 = {
                token: localStorage.appToken,
                babyid: localStorage.babyid,
                centerlng: this.state.centerlng,
                centerlat: this.state.centerlat,
                regionid: this.props.params.regionid,
                radius: this.state.radius,
                address: this.state.address,
                name: this.refs.name.value
            };
            this.saveSafeRegion(data2);
        }

    }


    saveSafeRegion(data) {
        HttpService.query({
            url: '/app/map/saveSafeRegion',
            data: data,
            success: (res=> {
                console.log(res);
                if (res.code = '10044') {

                    this.state.map.clearMap();

                    this.context.router.goBack();
                    window.localStorage.saveSafeRegion=true;
                    //window.location.href = '#/Safetyarea/' + localStorage.babyid + '';
                }

            })
        })
    }

    togglePicker() {

        this.setState({
            isPickerShow: true,
        });
    };

    handleChange(radius) {
        this.setState({
            radius: radius
        })
    }


    cancel() {
        this.setState({
            search: false,
            isPickerShow: false,
        });

        document.getElementById("result1").style.display = "none";



        this.refs.names.blur();





        // if(document.activeElement.id=="tipinput"){
        //
        //
        //   //  this.refs.names.blur();
        //
        //
        //     // document.getElementById('tipinput').blur();
        // }








    }

    handlesearch(search) {

        this.setState({
            search: search,
            isPickerShow: false
        });

    }

    aa() {


        var map = new AMap.Map("safetyarea", {
            resizeEnable: true,
            zoom: 15

        });


    }


    componentDidUpdate() {

        var self=this;

        console.log(this)


        this.refs.names.focus();

        document.getElementById('search').addEventListener('touchmove', function (event) {
            event.preventDefault();
        }, false);


        // document.getElementById("tipinput").addEventListener('blur',function () {
        //     if(!self.state.search){
        //
        //
        //
        //     }else{
        //         document.getElementById('tipinput').focus()
        //     }
        // });


    }

    change(){

    }

    sub(e){
        e.preventDefault()
    }

    _selectName(name,code,lng,lat,e){

        var self=this;
        e.preventDefault();


        document.getElementById("tipinput").value = name;
        document.getElementById("result1").style.display = "none";



            self.state.placeSearch.setCity(code);

            self.state.placeSearch.search(name,function (status, result) {

                console.log(result);

                // self.getAddr(lng, lat);
                // self.setState({
                //     search: false
                // });

                console.log(result.poiList.pois[0].id)

                 self.state.placeSearch.getDetails(result.poiList.pois[0].id, function (status, result) {


                     console.log(result)

                     self.getAddr(lng, lat);
                     self.setState({
                         search: false
                     });

                     document.getElementById("result1").style.display = "none";
                 })

            });  //关键字查询查询


    }




    render() {




        const {optionGroups, valueGroups} = this.state;


        return (

            <div>


                <div id='safetyarea' style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    bottom: '0',

                    overflow: 'hidden',
                    margin: '0',
                    zIndex: '1'
                }}></div>

                <div id='safetyarea2' style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    bottom: '0',

                    overflow: 'hidden',
                    margin: '0',
                    zIndex: '1'
                }}></div>


                <div className="fixed">
                    <div className="radio-content">

                        <img src={dingweidian} style={{width: '11.2rem', height: '6.8rem'}}/>

                        {/*<input type="text" defaultValue={this.state.radius} className="radio-input"/>*/}
                        <div className="radio-input" onClick={this.togglePicker.bind(this)}>
                            半径{this.state.radius}米内>
                        </div>

                    </div>
                </div>


                <div onClick={this.save.bind(this)}
                     style={{position: 'absolute', bottom: '1rem', width: '100%', padding: '0 1rem',zIndex:'1'}}>
                    <div className="app-pink-radius-button text-center">保存</div>
                </div>

                <div className="addSafetyarea">



                    {/*<div className="search"></div><div className="search-content"><input type="text" ref="names" defaultValue='wwww' /></div>*/}


                    <div style={{display: this.state.search == true ? 'block' : 'none'}}>
                        <div className="search" id="search"></div>
                        <div className="search-content">

                            <div className="img"><img src={sousu}/></div>

                            <form action="#" onSubmit={this.sub.bind(this)}>

                                <input onChange={this.change} name="search" type='search' id="tipinput" ref="names" placeholder="搜索"/>

                            </form>
                            <span className="cancle" onClick={this.cancel.bind(this)}>取消</span>




                        </div>
                    </div>


                    <div id="result1" className="autobox" name="result1" style={{display:'none',overflow: 'auto',top:'40px', position:'absolute',zIndex:'4444',
                        width: '100%',
                        border: '1px solid gray',
                        background:'#fff'}}>

                        {
                            this.state.tips.length!=0?
                                this.state.tips.map((json,index)=>{
                                    return (
                                        <div key={index} >
                                            <div style={{height:'3rem',lineHeight:'3rem'}} onClick={this._selectName.bind(this,json.name,json.adcode,json.location.lng,json.location.lat)}>
                                                <span>{json.name}</span>
                                                <span>{json.district}</span>
                                            </div>

                                        </div>
                                    )
                                }):
                                null
                        }
                    </div>


                    <R_header left="1" right="2" title="添加" map={this.state.map} handlesearch={this.handlesearch.bind(this)}
                              search={this.state.search}/>
                    <div className="content">
                        <div className="name">
                            <div className="left"><img src={dizhi}/></div>
                            <div className="right">

                                {
                                    this.props.params.name == 'null' ?
                                        <input type="text" style={{width: '100%'}} ref="name" placeholder="输入安全区域名称"/> :
                                        <input type="text" style={{width: '100%'}} defaultValue={this.props.params.name}
                                               ref="name" placeholder="输入安全区域名称"/>
                                }
                            </div>
                        </div>
                        <div className="name">
                            <div className="left"><img src={quyuming}/></div>
                            <div className="right">{this.state.address}</div>
                        </div>





                    </div>




                </div>




                <NamePicker isPickerShow={this.state.isPickerShow} radius={this.state.radius}
                            handleChange={this.handleChange.bind(this)}/>


            </div>
        )
    }
}


Addarea.contextTypes = {
    router: React.PropTypes.object.isRequired
};
