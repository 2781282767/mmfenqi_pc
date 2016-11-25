import * as React from "react";
import * as ReactDOM from "react-dom";
import {bindActionCreators} from 'redux';
import {Provider, connect} from 'react-redux';

import echarts from 'echarts';
import {Select} from 'antd';

const Option = Select.Option;


import { Tooltip } from 'antd';
const text = <span>prompt text</span>;


import {Table} from 'antd';
//自己的第三方组件
import {
    AppBody
} from '../components/index';
//自己书写的基类
import BaseContainer from '../components/pubController/BaseContainer';
import {BaseStore} from '../redux/store/BaseStore';

import '../../styles/containerLess/index.less'
const store = BaseStore({});

class IndexApp extends BaseContainer{

    constructor(props) {
        super(props);

        this.state = {

            flag:false,

            columns: [{
                title: '',
                dataIndex: 'kinds',
                key: 'kinds',
            }, {
                title: '设备总量',
                dataIndex: 'account',
                key: 'account',
            }, {
                title: '激活量',
                dataIndex: 'name',
                key: 'name',
            },

                {
                    title: '缴费量',
                    dataIndex: 'zuzhi',
                    key: 'zuzhi',
                    render:text=>  <span style={{color:'red'}}>{text}</span>
                },
                {
                    title: '在线量',
                    dataIndex: 'email',
                    key: 'email',
                    render:text => {
                        if(text == 122){
                           return <span> 0</span>
                        }
                    }
                },
                {
                    title: '离线量',
                    dataIndex: 'address',
                    key: 'address',
                }],
            data: [


                {
                    key: '1',
                    kinds: '智能学生证',
                    account: '11111',
                    name: '33',
                    zuzhi: '44',
                    email: '122',
                    address: '111',
                }, {
                    key: '2',
                    kinds: '2.4G考勤卡',
                    account: '11111',
                    name: '33',
                    zuzhi: '4422',
                    email: '122',
                    address: '222',
                }],


            option:{
                title: {
                    text: '数量(台)',
                    x: '90',
                    y: '30',
                    textStyle: {
                        fontSize: '14',
                        color: '#01b4ee'
                    },


                },
                tooltip: {
                    trigger: 'axis'
                },
                // legend: {
                //     data:['智能学生证激活量','2.4G考勤卡激活量','缴费量']
                // },
                toolbox: {
                    show: false,
                    feature: {
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        data: ['11/10', '11/11', '11/12', '11/13', '11/14', '11/15', '11/16']
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        position: 'left',
                    }
                ],
                series: [
                    {
                        name: '智能学生证激活量',
                        type: 'bar',
                        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 22.6],

                        itemStyle:{
                            normal:{color:'#01b4ee'}
                        }
                    },
                    {
                        name: '2.4G考勤卡激活量',
                        type: 'bar',
                        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 122],

                        itemStyle:{
                            normal:{color:'#f7ba00'}
                        }
                    },
                    {
                        name: '缴费量',
                        type: 'bar',
                        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 333.6],

                        itemStyle:{
                            normal:{color:'#1ec94c'}
                        }
                    }
                ]
            }

        };

    }

    handleButton() {
        //let {MenuReducers, dispatch} = this.props;
        alert('点击优惠码')
    }

    deviceCancel() {


    }


    search(e) {
        let self = this;
        e.preventDefault();

        setTimeout(abc,1000);
        self.setState({
            flag:true,
        });

        function abc(){
            self.setState({
                flag:false,
            });
        }

    }

    render() {
        let {Actions} = this.props;

        let {flag}=this.state;

        const list = [
            {name: '学校'},
            {name: '学校2'}
        ];

        return (

            <AppBody _flag={flag}>


                <div className="ui-aindex">

                    <div className="ui-col2">
                        <div className="col1" style={{color:'#333',borderSize:'14px'}}>
                        <img src="/dist/images/gongkong.png" style={{width:'30px',height:'30px',marginRight:'10px'}}/>
                        某某   杭州  新增了一台智能学生证，设备IMEI号为 88888888 <span className="time">2012-10-01</span>
                            </div>
                    </div>
                    <div className="ui-col2" style={{border:0}}>
                        <div className="col1" style={{fontSize:'18px'}}>数据总览

                            <Tooltip placement="right" title={text}>
                                <img src="/dist/images/tooltip.png" style={{width:'30px',height:'30px',marginLeft:'10px'}}/>
                            </Tooltip>
                        </div>
                        <div className="col2" style={{border:0}}>单位数量:台</div>
                    </div>


                    <Table columns={this.state.columns} dataSource={this.state.data}/>



                    <div className="ui-col2" style={{border:0}}>
                        <div className="col1" style={{fontSize:'18px'}}>一周趋势
                            <Tooltip placement="right" title={text}>
                                <img src="/dist/images/tooltip.png" style={{width:'30px',height:'30px',marginLeft:'10px'}}/>
                            </Tooltip>
                        </div>
                    </div>


                    <div className="echarts">

                        <div style={{display:'flex',height:'40px',alignItems:'center',margin: '20px 0 0 40px'}}>
                            <div style={{display:'flex',flex:'1'}}>


                                <Select size="large" defaultValue="学校学校" style={{ minWidth: 70 }}>

                                    {
                                        list.map((json, index)=> {


                                            return (



                                                <Option  value={json.name}>{json.name}</Option>

                                            )
                                        })
                                    }

                                </Select>
                                <div style={{display:'flex',position:'relative'}}>
                                    <form action="#" onSubmit={this.search.bind(this)}>
                                        <input type="search" placeholder="请输入学校筛选"/>

                                        <i className="iconfont icon-search"></i>
                                    </form>
                                </div>
                            </div>


                            <div style={{display:'flex',flex:'1'}}>

                                <div className="legend">

                                    <div className="step1">

                                        <div></div>

                                        <span>智能学生证激活量</span>


                                    </div>
                                    <div className="step2">
                                        <div></div>
                                        <span>2.4G考勤卡激活量</span>

                                    </div>
                                    <div className="step3">
                                        <div></div>
                                        <span>缴费量</span>

                                    </div>
                                </div>

                            </div>

                        </div>





                        <div id="container" style={{height:'400px',width:'100%'}}></div>

                    </div>


                </div>


            </AppBody>
        );
    }

    componentDidMount() {
        var dom = document.getElementById("container");

        var myChart = echarts.init(dom);


        myChart.setOption(this.state.option);

        window.onresize = myChart.resize;
    }


    componentWillUnmount(): void {

    }

    componentWillMount(): void {

    }

    /*shouldComponentUpdate(){
     return false
     }*/
}

let mapStateToProps = (state) => {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        Actions: bindActionCreators({}, dispatch)
    };
}
/**
 * 添加监听数据
 */
const App = connect(mapStateToProps, mapDispatchToProps)(IndexApp);
const ElementContainer = document.getElementById("example");
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    ElementContainer
);



