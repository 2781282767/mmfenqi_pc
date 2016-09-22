/**
 * Created by sheldon on 2016/7/11.
 */
'use strict';

class R_IndexTitle extends React.Component {
    constructor() {
        super();
        this.state = {
            json: [],
            t_startTime: '',
            t_endTime: '',

            text: '',
            h: '',
            m: '',
            s: '',
            leftOrRight: '0',

        }
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
                // window.location.reload()
            }
        })
    }
    compareTime() {
        var compareTime = new Date();


        if (compareTime.getHours() >= 10) {
            var before = compareTime.Format('yyyy-MM-dd 23:59:59');
            this.init(before);
            this.setState({
                text: '距离结束仅剩'
            });

            return;
        }

        var after = compareTime.Format('yyyy-MM-dd 10:00:00');
        this.init(after);
        this.setState({
            text: '距离开始仅剩'
        });
    }
    componentDidMount(){
        Date.prototype.Format = function (fmt) { //author: meizz
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        };
        this.compareTime()
    }
    render() {

        return (
            <div className="wrap partTit">
                <p style={{position:'relative'}}>
                    <span>
                        <em className="ft31">
                            <a href={this.props.href} target="_blank">
                                <i className={this.props.isRed ? 'pink' : ''}>{this.props.firstTitle}</i>{this.props.secondTitle}
                            </a>
                        </em>
                        <i className="eng">{this.props.subTitle}</i>
                    </span>
                    {
                        this.props.time=='1'?<div style={{position:'absolute',right:0,top:30}}>
                            <div className="today-time">
                                <div style={{background: 'none',marginRight:'0'}}>{this.state.text}</div>

                                <div  style={{color:'#fd657a',border:'1px solid #e4e4e4'}}>{this.state.h}</div>
                                时
                                <div  style={{color:'#fd657a',border:'1px solid #e4e4e4'}}>{this.state.m}</div>
                                分
                                <div style={{backgroundColor:'#fff',border:'1px solid #e4e4e4'}}>{this.state.s}</div>
                            </div>
                        </div>
                            :
                        <div></div>
                    }
                </p>

            </div>
        )
    }
}
