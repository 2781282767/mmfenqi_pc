'usr strict';

import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';
import {R_header} from './common/index';
import {HttpService ,Toast}  from'../Http';
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
            isPickerShow:false,
            radius:[],
            centerlng:[],
            centerlat:[],
            search:false,
            map:{}


        };

    }





    componentWillMount(){




        console.log(this.props.params.radius);

        if(this.props.params.radius==null){
            this.setState({
                radius:'500米'
            })
        }else{
            this.setState({
                radius:this.props.params.radius,
                centerlng:this.props.params.centerlng,
                centerlat:this.props.params.centerlat

            })
        }



    }

    componentDidMount(){


        var self=this;



        var map, geolocation,map2,map3;
        if(this.state.centerlng!='null'){

            document.getElementById('safetyarea2').style.display='block';
            document.getElementById('safetyarea').style.display='none';





            map2 = new AMap.Map('safetyarea2', {
                resizeEnable: true,
                zoom:15,
                center: [this.state.centerlng,this.state.centerlat]
            });





            self.getAddr(this.state.centerlng,this.state.centerlat);


            map2.on('moveend', function(e) {


                self.getAddr(map2.getCenter().getLng(),map2.getCenter().getLat());

                self.setState({
                    centerlng:map2.getCenter().getLng(),
                    centerlat:map2.getCenter().getLat(),
                    isPickerShow:false

                })

            });




            this.setState({
                map:map2
            });

            this.changeName(map2)


        }else{


            document.getElementById('safetyarea2').style.display='none';
            document.getElementById('safetyarea').style.display='block';

            map = new AMap.Map('safetyarea');

            map.plugin('AMap.Geolocation', function() {

            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                showButton:false,
               // buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
               // buttonPosition:'RB'
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition();
            AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
           //  AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
        });



            function  onComplete(data) {




                map3 = new AMap.Map('safetyarea', {
                    resizeEnable: true,
                    zoom:15,
                    center: [data.position.getLng(),data.position.getLat()]
                });
                self.getAddr(data.position.getLng(),data.position.getLat());
                map3.on('touchend', function(e) {
                    self.getAddr(map3.getCenter().getLng(),map3.getCenter().getLat());

                    self.setState({
                        centerlng:map3.getCenter().getLng(),
                        centerlat:map3.getCenter().getLat(),
                        isPickerShow:false

                    })

                });



                self.changeName(map3)
            }

            }



    }

    changeName(map){
        var self3=this;
        //输入提示
        var autoOptions = {
            input: "tipinput"
        };
        var auto = new AMap.Autocomplete(autoOptions);


        var placeSearch = new AMap.PlaceSearch({

            pageSize: 1,
            pageIndex: 1,

            map: map,
        });  //构造地点查询类




        AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发


        function select(e) {

            console.log(e);

             placeSearch.setCity(e.poi.adcode);

            placeSearch.search(e.poi.name,function (status, result) {

                console.log(result.poiList.pois[0].id);




                if (status === 'complete' && result.info === 'OK') {

                   // document.getElementsByClassName('amap-sug-result').style.display='hidden'

                }


                placeSearch.getDetails(result.poiList.pois[0].id, function(status, result) {
                    if (status === 'complete' && result.info === 'OK') {

                        console.log(result);

                        // console.log(result)


                        //placeSearch_CallBack(result);

                        self3.getAddr(e.poi.location.lng,e.poi.location.lat);

                        self3.setState({
                            search:false
                        })
                    }
                });



            });  //关键字查询查询
        }
    }





    getAddr(lng,lat){

            var self2=this;

            var lnglatXY = [lng,lat]; //已知点坐标


            var geocoder = new AMap.Geocoder(
                {
                    radius: 1000,
                    extensions: "all"
                }
            );
            geocoder.getAddress(lnglatXY, function(status, result) {
                if (status === 'complete' && result.info === 'OK') {

                    console.log(result);

                    var address = result.regeocode.formattedAddress; //返回地址描述

                    console.log(address);
                    self2.setState({
                        address:address,
                        centerlng:lng,
                        centerlat:lat,

                    })

                }
            });
        }

    save(){


        if(this.props.params.regionid=='null'){
            const data={
                token:localStorage.appToken,
                babyid:localStorage.babyid,
                centerlng:this.state.centerlng,
                centerlat:this.state.centerlat,
                regionid:'',
                address:this.state.address,
                radius:this.state.radius,
                name:this.refs.name.value
            };
            this.saveSafeRegion(data);
        }else{
            const data2={
                token:localStorage.appToken,
                babyid:localStorage.babyid,
                centerlng:this.state.centerlng,
                centerlat:this.state.centerlat,
                regionid:this.props.params.regionid,
                radius:this.state.radius,
                address:this.state.address,
                name:this.refs.name.value
            };
            this.saveSafeRegion(data2);
        }

    }







    saveSafeRegion(data){
        HttpService.query({
            url:'/app/map/saveSafeRegion',
            data:data,
            success:(res=>{
                console.log(res);

                if(res.code='10044'){
                    window.location.href='#/Safetyarea/'+localStorage.babyid+''
                }

            })
        })
    }

    togglePicker () {

        this.setState({
            isPickerShow: true,
        });
    };

    handleChange(radius){
        this.setState({
            radius:radius
        })
    }




    cancel(){
        this.setState({
            search:false,
            isPickerShow: false,
        });

    }
    handlesearch(search){

        this.setState({
            search:search,
            isPickerShow: false
        });

    }

    aa(){


        var map=new AMap.Map("safetyarea", {
              resizeEnable: true,
              zoom:15

          });



    }

    componentDidUpdate () {


       this.refs.names.focus();

        document.getElementById('search').addEventListener('touchmove', function (event) {
            event.preventDefault();
        }, false);









    }











    render(){


        const {optionGroups, valueGroups} = this.state;





        return(

            <div>





                <div  id='safetyarea' style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    bottom: '0',

                    overflow: 'hidden',
                    margin: '0',
                    zIndex:'1'
                }}></div>

                <div  id='safetyarea2' style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    bottom: '0',

                    overflow: 'hidden',
                    margin: '0',
                    zIndex:'1'
                }}></div>

            <div className="addSafetyarea">

                <div className="fixed" >
                    <div className="radio-content">

                        <img src={dingweidian} style={{width:'11.2rem',height:'6.8rem'}}/>

                        {/*<input type="text" defaultValue={this.state.radius} className="radio-input"/>*/}
                        <div className="radio-input" onClick={this.togglePicker.bind(this)}>半径{this.state.radius}米内></div>

                    </div>
                </div>

                {/*<div className="search"></div><div className="search-content"><input type="text" ref="names" defaultValue='wwww' /></div>*/}


                        <div style={{display : this.state.search==true ? 'block':'none'}}>
                            <div className="search" id="search"></div>
                            <div className="search-content">

                                <div className="img"><img src={sousu} /></div>

                                <input type="text" id="tipinput"  ref="names" placeholder="搜索" />



                                <span className="cancle" onClick={this.cancel.bind(this)}>取消</span>
                            </div>
                        </div>



                <R_header left="1" right="2" title="添加" handlesearch={this.handlesearch.bind(this)} search={this.state.search} />
                <div className="content">
                    <div className="name">
                        <div className="left"><img src={dizhi}/></div>
                        <div className="right">

                            {
                                this.props.params.name=='null'?
                                    <input type="text" style={{width:'100%'}}  ref="name" placeholder="输入安全区域名称"/>:
                                    <input type="text"  style={{width:'100%'}} defaultValue={this.props.params.name} ref="name" placeholder="输入安全区域名称"/>
                            }
                        </div>
                    </div>
                    <div className="name">
                        <div className="left"><img src={quyuming}/></div>
                        <div className="right">{this.state.address}</div>
                    </div>


                </div>

                <div onClick={this.save.bind(this)} style={{position:'fixed',bottom:'1rem',width:'100%',padding:'0 1rem'}}>
                    <div className="app-pink-radius-button text-center">保存</div>
                </div>


            </div>


                    <NamePicker isPickerShow={this.state.isPickerShow} radius={this.state.radius}  handleChange={this.handleChange.bind(this)}/>


            </div>
        )
    }
}