'usr strict';
import React, {Component, PropTypes} from 'react';
import {Router, Route, IndexRoute, hashHistory, browserHistory, Link} from 'react-router';

import back from '../../img/back.png'


import Tool from '../../Tool'
/**
 * (加载动画)
 *
 * @class DataLoad
 * @extends {Component}
 */

export class R_header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: true
        }
    }


    componentWillReceiveProps(){


        setTimeout( function () {



            // console.log('index+-----'+this.props.syncGuardian);
            // console.log('index2+-----'+this.props._flag);


            // this.setState({
            //     flag:this.props.blockOrNone,
            //     _flag:this.props._flag
            // })
        }.bind(this),0)

    }

    map(){

        if(!!this.props.map){
            this.props.map.clearMap();
            this.context.router.goBack();
        }else{
            this.context.router.goBack();
        }

    }

    handlesearch() {

        this.props.handlesearch(this.state.search)


    }

    render() {
        const {title, left, right,map} = this.props;


        console.log(map)


        return (
            <header style={{
                display: 'flex',
                padding: '1rem 15px',
                zIndex: '100',
                fontSize: '1.6rem',
                borderBottom: '1px solid #eee',
                position: 'relative'
            }}>
                {
                    left == 1 ?
                        <div style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}
                             onClick={this.map.bind(this)}>
                            <img src={back} style={{width: '1.7rem', height: '1.6rem',}}/>
                        </div> :
                        !!map?
                        <div style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}
                             onClick={this.map.bind(this)}>
                            <img src={back} style={{width: '1.7rem', height: '1.6rem',}}/>
                        </div>:
                        <div style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>

                        </div>
                }
                <div style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'}}>{title}</div>
                <div style={{display: 'flex', flex: 1}}>

                    {
                        right == 1 ?
                            <div style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
                                <Link to="/Addarea/null/null/null/null/null/">添加</Link>
                            </div> :
                            right == 2 ?
                                <div
                                    style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}
                                    onClick={this.handlesearch.bind(this)}>
                                    搜索
                                </div> :
                                null
                    }

                </div>
            </header>
        )

    }
}


R_header.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export class R_header_fixed extends Component {

    constructor(props){
        super(props)
        this.state={
            flag:false,
            _flag:false,
        }

    }




    componentWillReceiveProps(){


        setTimeout( function () {

            // console.log('index+-----'+this.props.syncGuardian);
            // console.log('index2+-----'+this.props._flag);


            // this.setState({
            //     flag:this.props.blockOrNone,
            //     _flag:this.props._flag
            // })
        }.bind(this),0)

    }


    map2(){




        if(!!this.props.map){


            this.props.map.map((json,index)=>{
                json.clearMap()
            });
           this.context.router.goBack();
        }else{
            this.context.router.goBack();
        }

    }

    compare(){

       // var newState = !this.state.flag;

        console.log('index+-----'+this.props.syncGuardian);
        console.log('index2+-----'+this.props._flag);



        this.setState({
            flag:this.props.syncGuardian,
            _flag:this.props._flag
        });
        this.props.callbackParent(this.props.syncGuardian,this.props._flag);
    }





    render() {
        const {title, left, right,syncGuardian,_flag} = this.props;


        console.log(syncGuardian);

        //true
        return (
            <header  style={{
                display: 'flex', padding: '0 15px', zIndex: '200', fontSize: '1.6rem', borderBottom: '1px solid #eee',
                position: 'fixed', width: '100%', top: '0', height: '4rem'
            }}>
                {
                    left == 1 &&!!syncGuardian&&!!_flag?


                    <div style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}

                         onClick={this.compare.bind(this)}
                    >
                        <img src={back} style={{width: '1.7rem', height: '1.6rem',}}/>
                    </div>
                        :<div style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}
                              onClick={this.map2.bind(this)}>
                        <img src={back} style={{width: '1.7rem', height: '1.6rem',}}/>
                    </div>

                }
                <div style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'}}>{title}</div>
                <div style={{display: 'flex', flex: 1}}>

                    {
                        right == 1 ?
                            <div style={{
                                display: 'flex',
                                fontSize: '1.4rem',
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'flex-end'
                            }}>
                                <Link style={{color: '#00b4ed'}} to="/Addarea/null/null/null/null/null/">添加</Link>
                            </div> :
                            <div style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>

                            </div>
                    }

                </div>
            </header>
        )

    }
}

R_header_fixed.contextTypes = {
    router: React.PropTypes.object.isRequired
};
