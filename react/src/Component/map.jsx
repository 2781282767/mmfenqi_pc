'usr strict';
import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';

import { Link } from 'react-router';

import Tool from '../Tool'

import {DataLoad, Footer, UserHeadImg,FooterInit, TabIcon, GetNextPage} from './common/index';


import '../less/index.less'

export default class MapIndex extends React.Component{
    constructor(props){
        super(props);

        this.state={
            lng:'120.153576',
            lat:'30.287459'

        };
    }

    componentDidMount(){

        this.init();

    }

    render(){
        const lng=this.state.lng;
        const lat=this.state.lat;
        return (
            <div>
                <div id="container" style={{width:'100%',height:'30rem'}}></div>
                <a href="tel:13657086451">电话</a>
                <button className="demo" onClick={this.getLocation.bind(this,lng,lat) }>定位</button>
                <FooterInit index="0"/>
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


