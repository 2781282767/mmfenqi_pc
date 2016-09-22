'use strict';

class Dr2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            temp2: this.props.temp
        }
    }

    change() {
        var temp3 = 'ljb';
        this.setState({
            temp2: temp3
        });
        this.props.cb(temp3)
    };







    render() {
        return (
            <div style={{height: 100, width: 100, backgroundColor: '#999'}} onClick={this.change.bind(this)}>

                <div>{this.props.temp}</div>

            </div>

        )
    }

}


class Dr extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            temp: 1,
            blockOrNone: false,
            text: ''
        };

        this.config = {
            isSure: false,
            isCancel: false,
            img: '../static/images/app.jpg',
            yes_cb: ()=> {
                this.setState({
                    blockOrNone: false
                });
                toast.toaster('你好')
            }
        };


        this.timeConfig = {
            h: '-',
            m: '-',
            style: {
                color: '#fd657a', border: '1px solid #e4e4e4'
            },
            compare: function () {

                var compareTime = new Date();
                if (compareTime.getHours() >= 10) {
                    var time = compareTime.Format('yyyy-MM-dd 23:59:59');
                    return {
                        time: time,
                        text: '距离结束仅剩'
                    };
                }
                var time = compareTime.Format('yyyy-MM-dd 10:00:00');
                return {
                    time: time,
                    text: '距离开始仅剩'
                }
            }
        }

    }

    componentWillMount() {

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
    }


    change(temp3) {
        this.setState({
            temp: temp3,
        })
    }

    alert() {

        this.setState({
            blockOrNone: true
        })
    }


    render() {
        var temp = this.state.temp;
        console.log(this.state.blockOrNone);
        return (

            <div>

                <Dr2 temp={temp} cb={this.change.bind(this)}/>
                {temp}
                <R_Flex config={this.config} blockOrNone={this.state.blockOrNone}/>
                <div onClick={this.alert.bind(this)}>ssssllslsllssfs</div>

                <R_TimeOver cxt={this}/>

                <R_Swiper/>
            </div>
        )
    }
}

