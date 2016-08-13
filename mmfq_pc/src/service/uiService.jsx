/**
 * Created by sheldon on 2016/8/2.
 */
'use strict';

class R_Flex extends React.Component{
    constructor(props){
        super(props);
        this.state={
            blockOrnone:this.props.blockOrnone
        };
    }
    yescb(){
        this.props.config.yescb()
    }
    nocb(){
        var blockOrnone=false;
        this.setState({
            blockOrnone:blockOrnone
        });
        this.props.config.nocb(blockOrnone)
    }
    render(){
        var config=this.props.config;
        var img=config.img;
        var isSure=config.issure;
        var isCancle=config.iscancle;
        return (
            <div className="none" style={{display:(this.props.blockOrnone==true)?'block':'none'}} >
                <div className="_z"></div>
                <div className="layer_content">
                    <div className="header">
                        <div className="title">提示</div>
                        <div className="cance" onClick={this.nocb.bind(this)}>x</div>
                    </div>
                    <div className="layer_content2">
                        <div>

                            <img src={img} alt="" style={{verticalAlign: 'middle'}}/>&nbsp;&nbsp;<span>{config.text}</span>

                        </div>

                    </div>
                    <div className="t_foot">
                        <div className="btn cancle_btn" style={{display:isCancle?'none':'inline-block'}} onClick={this.nocb.bind(this)}>取消</div>
                        <div className="btn sure_btn" style={{display:isSure?'none':'inline-block'}} onClick={this.yescb.bind(this)}>确定</div>
                    </div>
                </div>
            </div>

        )
    }
}


class toast{
    static toaster(msg,duration){
        duration=isNaN(duration)?3000:duration;
        var m = document.createElement('div');
        m.innerHTML = msg;
        m.style.cssText="width:230px;opacity:1; height:35px; color:#fff; line-height:35px ; " +
            "text-align:center; border-radius:2px; position:fixed; top:0; left:50%; z-index:9999999; " +
            "filter: alpha(opacity=100); background: #fc8394;margin-left: -115px;";
        document.body.appendChild(m);
        setTimeout(function() {
            var d = 0.5;
            m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
            m.style.mozTransition = '-moz-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
            m.style.msTransition = '-ms-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
            m.style.oTransition = '-o-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
            m.style.transition = 'transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
            m.style.opacity = '0';
            setTimeout(function() { document.body.removeChild(m) }, d * 1000);
        }, duration);
    }
}
