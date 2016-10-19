'usr strict';


import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';
import {R_header_fixed} from './common/index';
import {HttpService ,Toast}  from'../Http';

import { Link} from 'react-router';


export default class Safetyarea extends React.Component{

    constructor(props){
        super(props);
        this.state={
            list:[]
        }

    }

    componentWillMount(){
        this.getSafeRegions1()
    }

    componentDidMount(){
        this.getSafeRegions()
    }



    getSafeRegions(){
        HttpService.query({
            url:'/app/map/getSafeRegions',
            data:{
                token:localStorage.appToken,
                babyid:this.props.params.babyid,
                pageindex:1,
                pagesize:50
            },
            success:(res=>{

                if(res.code=='10048'){

                    this.S_init(res.data.safeRegions);

                    window.localStorage.babyid=this.props.params.babyid;

                   // setTimeout(this.S_init(res.data.safeRegions),5000)

                }
            })
        })
    }


    getSafeRegions1(){
        HttpService.query({
            url:'/app/map/getSafeRegions',
            data:{
                token:localStorage.appToken,
                babyid:this.props.params.babyid,
                pageindex:1,
                pagesize:50
            },
            success:(res=>{

                if(res.code=='10048'){

                    this.setState({
                        list:res.data.safeRegions
                    });

                }
            })
        })
    }

    S_init(list){


        const getSafeRegions=list;
        getSafeRegions.forEach(function (item,index) {
            console.log(index);
            new AMap.Map('index'+index, {
                zoom: 15,
                center: [item.centerlng-0.0065, item.centerlat-0.0060],
                dragEnable: false,
                keyboardEnable: false,
                doubleClickZoom: false,
                scrollWheel:false,
                touchZoom:false,
                resizeEnable: true,
            });
        });
    }


    render(){

        return (
            <div className="safetyarea">

        <R_header_fixed left="1" right="1" title="安全区域"/>

            {/*<div className="safetyarea">*/}

            <div className="safetyarea-content">

                {
                    !!this.state.list?
                        this.state.list.map((res,index)=>{
                           console.log(index);
                            return(


                                <div key={index}>





                                        <Link   to={'/Addarea/'+res.regionid+'/'+res.radius+'/'+res.centerlng+'/'+res.centerlat+'/'+res.name}>
                                    <div className="content" >
                                        <div style={{position:'relative',zIndex:'100',width:'100%',height:'7rem',top:'0'}} onClick={this.ab}>

                                        </div>

                                        <div  id={'index'+index} style={{
                                            width: '100%',
                                            height: '7rem',
                                            overflow: 'hidden',
                                            margin: '0',
                                            zIndex:'1',
                                            position:'absolute',
                                            top:'0'
                                        }}></div>
                                        <div className="address">
                                            <div className="name">【{res.name}】</div>
                                            <div className="addr">{res.address}</div>
                                        </div>
                                        </div>

                                        </Link>
                                    </div>




                            )
                        }):
                        ''
                }


</div>
                </div>

        )

    }

}



