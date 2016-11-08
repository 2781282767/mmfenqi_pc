'usr strict';


import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';
import {R_header_fixed} from './common/index';
import {HttpService, Toast}  from'../Http';

import {Link} from 'react-router';

import {getSafeRegions} from '../action/index'


import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import wuanquan from '../img/safetyarea/wuanquan.png'


class Safetyarea extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],

            _delete: false,

            hasDelete: false,

            noDelete: false,
            classleft1: {
                width: '100%',
            },
            classright1: {
                width: '0',
            },

            _list: {},
            map: [],
            map2: []

        };


        this.startx = '';
        this.contentwidth = '';
        this.starty = ''

        this.isAndroid=false;
        this.isiOS=false


    }

    componentWillMount() {

        let u = navigator.userAgent;
        this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端


        // if (this.props.GetSafeRegions.length==0) {
        //
        //  //   alert(0)
        //     this.props.getSafeRegions(this.props.params.babyid);
        //
        //
        // }else{
        //
        //   //  alert('go')
        //
        //     // console.log('ssss'+this.props.GetSafeRegions);
        //
        //     this.setState({
        //         list:this.props.GetSafeRegions
        //     });
        //
        //     this.state.list.forEach(function (item, index) {
        //
        //         new AMap.Map('index' + index, {
        //             zoom: 15,
        //             center: [item.centerlng - 0.0065, item.centerlat - 0.0060],
        //             dragEnable: false,
        //             keyboardEnable: false,
        //             doubleClickZoom: false,
        //             scrollWheel: false,
        //             touchZoom: false,
        //             resizeEnable: true,
        //         });
        //     });
        // }


        this.getSafeRegions1();


        window.localStorage.babyid = this.props.params.babyid;

        console.log(localStorage.babyid)

    }


    componentWillReceiveProps() {
        setTimeout(function () {
            console.log('++==____--' + this.props.GetSafeRegions);


            this.setState({
                list: this.props.GetSafeRegions
            });
            this.S_init(this.state.list)
        }.bind(this), 0)

    }


    componentDidUpdate() {


    }

    TouchStart(index, e) {


        var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)

        this.startx = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
        this.starty = parseInt(touchobj.clientY); // get x position of touch point relative to left edge of browser

        this.contentwidth = document.getElementById('contentWidth' + index).offsetWidth - 1;


        console.log('start' + this.startx);


    }


    TouchMove(index, e) {
        e.preventDefault()


        var self = this;
        var touchobj = e.changedTouches[0]; // reference first touch point for this event

        var dist = parseInt(touchobj.clientX) - this.startx;


        console.log('move' + touchobj.clientX);

        console.log('dist' + parseInt(-dist));

        const itemstyle = document.getElementById('item' + index).style;
        const deletestyle = document.getElementById('delete' + index).style;

        const contentwidth = this.contentwidth;
        console.log(touchobj.clientY - this.starty);

        var numRange = 5;
        if (this.starty - touchobj.clientY > numRange || this.starty - touchobj.clientY == numRange) {
            console.log('上')

        } else if (this.starty - touchobj.clientY < -numRange) {
            console.log('下')

        } else if(this.startx - touchobj.clientX > 1) {

            console.log('进来了');

            console.log(self.state.hasDelete);


            if (!!self.state.hasDelete) {
                return
            }


            self.setState({
                classleft1: {
                    width: contentwidth - parseInt(contentwidth / 4),
                    transition: 'all 0.1s ease-in',

                },
                classright1: {
                    width: parseInt(contentwidth / 4),
                    transition: 'all 0.1s ease-in',

                },

                hasDelete: true
            });


            itemstyle.width = contentwidth - parseInt(contentwidth / 4) + 'px';


            itemstyle.transition = self.state.classleft1.transition;


            deletestyle.width = parseInt(contentwidth / 4) + 'px';
            deletestyle.transition = self.state.classright1.transition;

        }


    }

    TouchEnd(index, e) {


        var touchobj = e.changedTouches[0];


        console.log('end' + touchobj.clientX);

        const contentwidth = this.contentwidth;


        var self = this;

        // reference first touch point for this event

        const itemstyle = document.getElementById('item' + index).style;
        const deletestyle = document.getElementById('delete' + index).style;


        var numRange = 5;
        if (this.starty - touchobj.clientY > numRange || this.starty - touchobj.clientY == numRange) {
            console.log('上')

        } else if (this.starty - touchobj.clientY < -numRange) {
            console.log('下')

        } else {
            console.log(this.startx)
            console.log(touchobj.clientX)

            // alert(this.startx == touchobj.clientX)
            //
            // alert(self.state.hasDelete)




            if (this.startx == touchobj.clientX && !!self.state.hasDelete) {


                self.setState({
                    classleft1: {
                        width: contentwidth,

                        transition: 'all 0.1s  ease-out',

                    },
                    classright1: {
                        width: '0',
                        transition: 'all 0.1s ease-out',


                    },
                    hasDelete: false
                });


                e.preventDefault();


                // if (!!document.getElementById('item' + index).parentNode) {
                //     e.preventDefault();
                // }


                itemstyle.width = contentwidth + 'px';

                itemstyle.transition = self.state.classleft1.transition;


                deletestyle.width = 0 + 'px';
                deletestyle.transition = self.state.classright1.transition;


            } else if (this.startx - touchobj.clientX > 1) {


                console.log('进来了');

                console.log(self.state.hasDelete);


                if (!!self.state.hasDelete) {
                    return
                }


                self.setState({
                    classleft1: {
                        width: contentwidth - parseInt(contentwidth / 4),
                        transition: 'all 0.1s ease-in',

                    },
                    classright1: {
                        width: parseInt(contentwidth / 4),
                        transition: 'all 0.1s ease-in',

                    },

                    hasDelete: true
                });


                itemstyle.width = contentwidth - parseInt(contentwidth / 4) + 'px';


                itemstyle.transition = self.state.classleft1.transition;


                deletestyle.width = parseInt(contentwidth / 4) + 'px';
                deletestyle.transition = self.state.classright1.transition;

            }else{


                if(self.isAndroid&&!!self.state.hasDelete){
                    e.preventDefault();
                }
                self.setState({
                    classleft1: {
                        width: contentwidth,

                        transition: 'all 0.1s  ease-out',

                    },
                    classright1: {
                        width: '0',
                        transition: 'all 0.1s ease-out',


                    },
                    hasDelete: false
                });



                itemstyle.width = contentwidth + 'px';

                itemstyle.transition = self.state.classleft1.transition;


                deletestyle.width = 0 + 'px';
                deletestyle.transition = self.state.classright1.transition;
            }


        }


    }


    // getSafeRegions() {
    //     this.S_init(localStorage.safeRegions)
    // }


    deleteSafeRegions(regionid, index) {

        HttpService.query({
            url: '/app/map/deleteSafeRegions',
            data: {
                token: localStorage.appToken,
                babyid: this.props.params.babyid,
                regionids: regionid,
            },
            success: (res=> {

                console.log(res);

                if (res.code != 200) {


                    this.setState({
                        hasDelete: false
                    });


                    var node = document.getElementById('item' + index);

                    //console.log(node)

                    node.parentNode.parentNode.remove()
                } else {
                    Toast.toast(res.msg, 3000);
                }


                //  console.log(document.getElementById('item'+index).parentNode.parentNode.removeChild())


            })
        })
    }


    getSafeRegions1() {
        HttpService.query({
            url: '/app/map/getSafeRegions',
            data: {
                token: localStorage.appToken,
                babyid: this.props.params.babyid,
                pageindex: 1,
                pagesize: 50
            },
            success: (res=> {

                if (res.code == '10048') {

                    this.setState({
                        list: res.data.safeRegions,

                    });

                    // this.props._list=res.data.safeRegions;


                    // /    localStorage.setItem("json_data",JSON.stringify(res.data.safeRegions));

                    this.S_init(this.state.list);

                    // this.inits();


                }
            })
        })
    }

    S_init(list) {


        var self = this;

        var map;


        var array = [];


        list.forEach(function (item, index) {

            map = new AMap.Map('index' + index, {
                zoom: 15,
                center: [item.centerlng - 0.0065, item.centerlat - 0.0060],
                dragEnable: false,
                keyboardEnable: false,
                doubleClickZoom: false,
                scrollWheel: false,
                touchZoom: false,
                resizeEnable: true,
            });


            self.setState({
                map: self.state.map.concat(map)
            })

            // console.log(self.state.map)

            //
            // self.setState({
            //     map2:self.state.map.push(self.state.map)
            // })

        });


    }

    componentWillUnmount() {

        this.state.map.map((json, index)=> {
            json.clearMap()
        });
    }


    render() {

        const {GetSafeRegions} =this.props;


        console.log('list' + this.state.list);

        return (
            <div className="safetyarea">

                <R_header_fixed left="1" map={this.state.map} right="1" title="安全区域" syncGuardian="true"/>


                <div className="safetyarea-content">

                    {
                        this.state.list.length != 0 ?
                            this.state.list.map((res, index)=> {

                                return (


                                    <div id={'contentWidth' + index} style={{height: '10rem', overflow: 'hidden'}}
                                         key={index}>
                                        <Link
                                            to={'/Addarea/' + res.regionid + '/' + res.radius + '/' + res.centerlng + '/' + res.centerlat + '/' + res.name}>
                                            <div style={{
                                                height: '9rem', width: '100%',
                                                float: 'left',
                                            }} onTouchStart={this.TouchStart.bind(this, index)}

                                                 onTouchEnd={this.TouchEnd.bind(this, index)}

                                                 onTouchMove={this.TouchMove.bind(this, index)} id={'item' + index}>
                                                <div className="content">
                                                    <div style={{
                                                        position: 'relative',
                                                        zIndex: '100',
                                                        width: '100%',
                                                        height: '7rem',
                                                        top: '0'
                                                    }} onClick={this.ab}>

                                                    </div>

                                                    <div id={'index' + index} style={{
                                                        width: '100%',
                                                        height: '7rem',
                                                        overflow: 'hidden',
                                                        margin: '0',
                                                        zIndex: '1',
                                                        position: 'absolute',
                                                        top: '0'
                                                    }}></div>
                                                    <div className="address">
                                                        <div className="name">【{res.name}】</div>
                                                        <div className="addr">{res.address}</div>
                                                    </div>
                                                </div>


                                            </div>

                                        </Link>

                                        {/*`picker-modal${isPickerShow ? ' picker-modal-toggle' : ''}`*/}

                                        <div className="delete" style={{
                                            height: '10rem', width: '0',
                                            float: 'left',
                                        }} id={'delete' + index}
                                             onClick={this.deleteSafeRegions.bind(this, res.regionid, index)}>
                                            删除
                                        </div>

                                    </div>

                                )
                            }) :

                            <div className="_content">
                                <div>
                                    <img src={wuanquan} style={{width: '13rem', height: '13rem'}}/>
                                </div>


                            </div>
                    }


                </div>
            </div>

        )

    }

}


const mapStateToProps = state => {
    return {
        GetSafeRegions: state.login.GetSafeRegions,
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getSafeRegions: getSafeRegions
    }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Safetyarea);



