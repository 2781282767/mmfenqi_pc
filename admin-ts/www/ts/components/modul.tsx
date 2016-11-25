'usr strict';
import * as React from "react";
import * as ReactDOM from "react-dom";
export  default  class Popup extends React.Component<any,any>{

    public config:Object;
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

        console.log('_flag'+this.state._flag);
        console.log('blockOrNone'+this.state.blockOrNone);
        return (

            <div className="none" style={{display:(!!this.state.blockOrNone&&!!this.state._flag)?'block':'none'}} >
                <div className="popup_zindex"></div>


                <div className="popup_content">
                    <div className="header">
                        <p>
                            <span>提示</span>
                        </p>
                    </div>
                    <div className="popup_content2">
                        {this.props.children}

                    </div>
                    <div className="foot">
                        <div className="btn cancel_btn" style={{display:isCancel?'none':'flex'}} onClick={this.no_cb.bind(this)}>{this.props.config.no}</div>
                        <div className="btn sure_btn" style={{display:isSure?'none':'flex'}} onClick={this.yes_cb.bind(this)}>{this.props.config.yes}</div>



                    </div>
                </div>

            </div>

        )
    }
}