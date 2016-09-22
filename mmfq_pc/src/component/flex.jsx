
class R_Flex extends React.Component{
    constructor(props){
        super(props);
        this.state={
            blockOrNone:this.props.blockOrNone
        };
    }


    yes_cb(){
        this.props.config.yes_cb()
    }
    no_cb(){
        var blockOrNone=false;
        this.setState({
            blockOrNone:blockOrNone
        });

        if(!this.props.config.no_cb){
            return;
        }
    }
    componentWillReceiveProps(){
        setTimeout( function () {
            this.setState({
                blockOrNone:this.props.blockOrNone
            })
        }.bind(this),0)

    }

    render(){
        var config=this.props.config;
        var img=config.img;
        var isSure=config.isSure;
        var isCancel=config.isCancel;

        console.log(this.state.blockOrNone);
        return (

                <div className="none" style={{display:(this.state.blockOrNone==true)?'block':'none'}} >
                    <div className="_z"></div>
                    <div className="layer_content">
                        <div className="header">
                            <div className="title">提示</div>
                            <div className="cance" >x</div>
                        </div>
                        <div className="layer_content2">
                            <div>
                                <img src={img} alt=""/>
                            </div>

                        </div>
                        <div className="foot">
                            <div className="btn cancle_btn" style={{display:isCancel?'none':'inline-block'}} onClick={this.no_cb.bind(this)}>取消</div>
                            <div className="btn sure_btn" style={{display:isSure?'none':'inline-block'}} onClick={this.yes_cb.bind(this)}>确定</div>
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
