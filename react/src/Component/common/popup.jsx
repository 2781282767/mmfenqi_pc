'usr strict';

import React, {Component, PropTypes} from 'react';

import ReactDOM, {render} from 'react-dom';
export  default  class Popup extends React.Component{
    constructor(props){
        super(props);
        this.state={


        };
    }


    yes_cb(){
        this.props.config.yes_cb();
    }
    no_cb(){

        this.props.config.no_cb();
    }

    // componentWillReceiveProps(nextProps) {
    //
    //     if (nextProps) {
    //         this.setState({
    //             blockOrNone:this.props.blockOrNone,
    //             _flag:this.props._flag
    //         })
    //     }
    //
    // }

    componentWillReceiveProps(){
        setTimeout( function () {
            this.setState({
                blockOrNone:this.props.blockOrNone,
                _flag:this.props._flag
            })
        }.bind(this),0)

    }

    render(){
        var config=this.props.config;
        var isSure=config.isSure;
        var isCancel=config.isCancel;

        //
        // console.log('flag'+this.state._flag)
        // console.log('blockOrNone'+this.state.blockOrNone)
        return (

            <div className="none" style={{display:(this.state.blockOrNone==true&&!this.state._flag)?'block':'none'}} >
                <div className="popup_zindex"></div>


                        <div className="popup_content">
                            <div className="header">
                                <div className="popup_title">温馨提示</div>
                            </div>
                            <div className="popup_content2">
                                您还未向设备同步监护成员信息，确认返回吗？
                            </div>
                            <div className="foot">
                                <div className="btn cancel_btn" style={{display:isCancel?'none':'flex'}} onClick={this.no_cb.bind(this)}>返回</div>
                                <div className="btn sure_btn" style={{display:isSure?'none':'flex'}} onClick={this.yes_cb.bind(this)}>同步</div>
                            </div>
                        </div>


            </div>

        )
    }
}