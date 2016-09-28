'usr strict';
import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';


import HttpService from'../Http';

import Tool from '../Tool';

import {DataLoad, Footer, UserHeadImg,FooterInit, TabIcon, GetNextPage} from './common/index';

import '../less/index.less'

export default class MapIndex extends React.Component{
    constructor(props){
        super(props);

        this.state={
            lng:'120.153576',
            lat:'30.287459',
            babyid:'',
            token:'',
            babyName:'',
            babytelephone:'',
            isOpen:false,

        };
    }

    doLogin(success){
        HttpService.query({
            url: '/apph5/user/login',
            data: {sid: 'O5QaeMlrCNPI91Ux016a1IOKub3DeOowT9EugDMYn4L7jOxTD2E-sY6V9Tgpk0uoiQk4DX2WP2qyFOllkciZXYg_ObvxmG6niYR3_DMF728Ul0HRb5qd2cDZdLwinOeZVL6BROmg-V0W5BcCRJvGhg'},
            success: (res=> {
                console.log(res);
                if(res.code=='30010'){
                    this.setState({
                        token:res.data.token
                    });

                    return success()

                }
            })
        });
    }

    getDeviceList(){
        HttpService.query({
            url:'/app/object/getBabys',
            data:{token:this.state.token},
            success:(res=>{
                console.log(res)
            })
        })
    }

    getCurrentPower(){

    }


    componentWillMount(){
        this.doLogin(
            function () {
                this.getDeviceList()
            }.bind(this)
        );


    }

    componentDidMount(){
        this.init();
    }

    render(){
        const lng=this.state.lng;
        const lat=this.state.lat;
        const isOpen=this.state.isOpen;
        return (
            <div>
                <div id="container" style={{width:'100%',height:'40rem'}}>

                    <button  onClick={this.isOpen.bind(this)}>展开</button>
                </div>
                {/*<a href="tel:13657086451">电话</a>*/}
                {/*<button className="demo" onClick={this.getLocation.bind(this,lng,lat) }>定位</button>*/}



                {
                    isOpen==true?
                        <div></div>
                        :
                        <FooterInit index="0" />
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

        if(this.state.isOpen){
            this.setState({
                isOpen:false
            });
            return;
        }
        this.setState({
            isOpen:true
        });


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


