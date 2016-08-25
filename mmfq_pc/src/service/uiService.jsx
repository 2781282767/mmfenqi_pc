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


class R_TimeOver extends React.Component{
    constructor(){
        super();
        this.state={
            h: '',//小时
            m: '',//分
            s: '',//秒
        }
    }
    componentWillMount() {
        const time=this.props.cxt.timeConfig.compare().time;
        this.init(time)

    }
    init(time) {
        var setCountDown = {
            timer: null,
            init: function (opt) {
                var _this = this;
                this.setShowTime(opt.endtime, opt.done);
                this.timer = setInterval(function () {
                    _this.setShowTime(opt.endtime, opt.done, opt.callback)
                }, 1000);

                console.log(this.timer)
            },
            getCountdown: function (time) {
                var curShowTimeSecondsVal = this.getSecond(time) - this.getSecond();
                if (curShowTimeSecondsVal < 0) return [0, '00', '00', '00'];
                // console.log(curShowTimeSecondsVal)
                // 剩余秒数
                var curShowTimeSeconds = parseInt(curShowTimeSecondsVal % 60);
                // 计算剩余天数
                var curShowTimeDays = parseInt(curShowTimeSecondsVal / 3600 / 24);
                // 计算剩余小时
                var curShowTimeHours = parseInt((curShowTimeSecondsVal / 3600)) - curShowTimeDays * 24;
                // 计算剩余分钟
                var curShowTimeMinutes = parseInt((curShowTimeSecondsVal - parseInt((curShowTimeSecondsVal / 3600)) * 3600) / 60);
                curShowTimeHours = curShowTimeHours > 9 ? curShowTimeHours : '0' + curShowTimeHours;
                curShowTimeSeconds = curShowTimeSeconds > 9 ? curShowTimeSeconds : '0' + curShowTimeSeconds;
                curShowTimeMinutes = curShowTimeMinutes > 9 ? curShowTimeMinutes : '0' + curShowTimeMinutes;
                return [curShowTimeDays, curShowTimeHours, curShowTimeMinutes, curShowTimeSeconds];
            },
            getSecond: function (times) {
                if (times) {
                    var year = parseInt(times.slice(0, 4)),
                        month = parseInt(times.match(/-\d*/gi)[0].replace('-', '') - 1),
                        day = parseInt(times.match(/-\d*/gi)[1].replace('-', '')),
                        hour = parseInt(times.match(/\d*:/)[0].replace(':', '')),
                        minute = parseInt(times.match(/:\d*/)[0].replace(':', ''));
                    return (new Date(year, month, day, hour, minute, 0)).getTime() / 1000;
                }
                return (new Date()).getTime() / 1000;
            },
            setShowTime: function (endtime, done, callback) {
                var _this = this;
                // var oSetTime = document.getElementById('time');
                var day = this.getCountdown(endtime)[0],
                    hour = this.getCountdown(endtime)[1],
                    minute = this.getCountdown(endtime)[2],
                    second = this.getCountdown(endtime)[3];
                done([day, hour, minute, second]);
                // oSetTime.innerHTML = '剩余时间：'+day+'天'+hour+'小时'+minute+'分'+second+'秒';
                if (day == 0 && hour == '00' && minute == '00' && second == '00') {
                    clearInterval(_this.timer);
                    _this.timer = null;
                    if (callback) callback();
                }
            }
        };
        setCountDown.init({
            endtime: time,
            done: function (data) {
                // console.log(data)
                this.setState({
                    h: data[1],
                    m: data[2],
                    s: data[3]
                });

            }.bind(this),
            callback: function () {

            }
        })
    }

    render(){
        const h=this.props.cxt.timeConfig.h;
        const m=this.props.cxt.timeConfig.m;
        const text=this.props.cxt.timeConfig.compare().text;
        return (
            <div style={{
                padding: 5,
                margin: '0 5px',
                background: 'none'}}>
                <span style={this.props.cxt.timeConfig.style_t}>{text}</span>
                <span style={this.props.cxt.timeConfig.style_h}>{this.state.h}</span>
                {h}
                <span style={this.props.cxt.timeConfig.style_s}>{this.state.m}</span>
                {m}
                <span style={this.props.cxt.timeConfig.style_m}>{this.state.s}</span>
            </div>
        )
    }
}
