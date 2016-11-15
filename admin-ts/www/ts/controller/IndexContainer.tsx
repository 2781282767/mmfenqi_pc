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
    AppBody,
    Panel,
    Echarts,
    Buttons,
    Row,
    Col,
    Icon, Dashboard, Label
} from '../components/index';
//自己书写的基类
import BaseContainer from '../components/pubController/BaseContainer';
import {BaseStore} from '../redux/store/BaseStore';

import Popup from '../components/modul'
import TableOne from './Table/TableOne';
import TableTwo from './Table/TableTwo';
import TableThree from './Table/TableThree';
import TableFour from './Table/TableFour';

import '../../styles/account/index.less'
//表单验证模块
import verifier from '../pub/Verifier';
const store = BaseStore({});
let divStyle = {
    marginBottom: '10px',
};
class IndexApp extends BaseContainer {
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
                },
                {
                    title: '在线量',
                    dataIndex: 'email',
                    key: 'email',
                },
                {
                    title: '离线量',
                    dataIndex: 'address',
                    key: 'address',
                }],
            data: [


                {
                    key: '1',
                    kinds: '学生',
                    account: '11111',
                    name: '小明',
                    zuzhi: '杭州',
                    email: '122',
                    address: '西湖区湖底公园1号',
                }, {
                    key: '2',
                    kinds: '考勤',
                    account: '11111',
                    name: '小明',
                    zuzhi: '杭州',
                    email: '122',
                    address: '西湖区湖底公园1号',
                }]

        };

        this.option = {
            title: {
                text: '数量',
                x: '20',
                y: '20',


            },
            tooltip: {
                trigger: 'axis'
            },
            // legend: {
            //     data:['蒸发量','降水量']
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
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '蒸发量',
                    type: 'bar',
                    data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                    // markPoint : {
                    //     data : [
                    //         {type : 'max', name: '最大值'},
                    //         {type : 'min', name: '最小值'}
                    //     ]
                    // },
                    // markLine : {
                    //     data : [
                    //         {type : 'average', name: '平均值'}
                    //     ]
                    // }
                },
                {
                    name: '降水量',
                    type: 'bar',
                    data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                    // markPoint : {
                    //     data : [
                    //         {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
                    //         {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                    //     ]
                    // // },
                    // markLine : {
                    //     data : [
                    //         {type : 'average', name : '平均值'}
                    //     ]
                    // }
                }
            ]
        }

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

        setTimeout(abc,5000)
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

        const list = [
            {name: 'over'},
            {name: 'jk'}
        ]

        return (


            <AppBody flag={this.state.flag}>


                <div className="ui-aindex">

                    <div className="ui-col2">
                        <div className="col1" style={{color:'#333',borderSize:'14px'}}>
                        <img src="/dist/images/gongkong.png" style={{width:'30px',height:'30px',marginRight:'10px'}}/>
                         杭州杭州杭州杭州杭州杭州杭州杭州杭州杭州
                            </div>
                    </div>
                    <div className="ui-col2" style={{border:0}}>
                        <div className="col1">数据总览

                            <Tooltip placement="right" title={text}>
                                <img src="/dist/images/tooltip.png" style={{width:'30px',height:'30px',marginLeft:'10px'}}/>
                            </Tooltip>
                        </div>
                        <div className="col2" style={{border:0}}>单位数量:台</div>
                    </div>


                    <Table columns={this.state.columns} dataSource={this.state.data}/>
                    {/*<ECharts*/}
                    {/*option={this.state.option}*/}
                    {/*notMerge*/}
                    {/*style={{ width: $(window).width() + 'px', height: ($(window).height() - 50) + 'px' }}*/}
                    {/*/>*/}


                    <div className="ui-col2" style={{border:0}}>
                        <div className="col1">一周趋势
                            <Tooltip placement="right" title={text}>
                                <img src="/dist/images/tooltip.png" style={{width:'30px',height:'30px',marginLeft:'10px'}}/>
                            </Tooltip>
                        </div>
                    </div>


                    <div className="echarts">

                        <div style={{display:'flex',height:'40px',alignItems:'center',margin: '20px 0 0 40px'}}>
                            <Select size="large" defaultValue="jk" style={{ width: 120 }} onChange={this.handleChange}>

                                {
                                    list.map((json, index)=> {


                                        return (



                                            <Option key={index} value={json.name}>{json.name}</Option>

                                        )
                                    })
                                }

                            </Select>
                            <div style={{display:'flex',position:'relative'}}>
                                <form action="#" onSubmit={this.search.bind(this)}>
                                    <input type="search" placeholder="输入设备IMEI号"/>

                                    <i className="iconfont icon-search"></i>
                                </form>
                            </div>

                        </div>


                        <div id="container" style={{height:'400px',width:'100%'}}></div>

                    </div>


                </div>


            </AppBody>
        );
    }

    componentDidMount(): void {
        var dom = document.getElementById("container");

        console.log(333);


        console.log(echarts)

        var myChart = echarts.init(dom);
        var app = {};

        myChart.setOption(this.option);

        window.onresize = myChart.resize;
        //   option = null;
        // myChart.showLoading();
    }

    // componentDidMount(): void {
    //     // let {MenuReducers, Actions} = this.props;
    //
    //     var data = [{"State":"AL","Under 5 Years":22,"5 to 13 Years":3},{"State":"AK","Under 5 Years":22,"5 to 13 Years":2},{"State":"AZ","Under 5 Years":33,"5 to 13 Years":22},{"State":"AR","Under 5 Years":33,"5 to 13 Years":44},{"State":"CA","Under 5 Years":22,"5 to 13 Years":33},{"State":"CO","Under 5 Years":44,"5 to 13 Years":22},{"State":"CT","Under 5 Years":22,"5 to 13 Years":100}];
    //     var Stat = G2.Stat;
    //     var Frame = G2.Frame;
    //     var frame = new Frame(data);
    //     frame = Frame.combinColumns(frame,['Under 5 Years', '5 to 13 Years'],'population', 'age', 'State');
    //     // frame.addCol('type', function(obj) {
    //     //     var key = obj.age;
    //     //     var type;
    //     //     if (key === 'Under 5 Years' || key === '5 to 13 Years' || key === '14 to 17 Years') {
    //     //         type = 'a';
    //     //     } else if (key === '18 to 24 Years') {
    //     //         type = 'b';
    //     //     } else if (key === '25 to 44 Years') {
    //     //         type = 'c';
    //     //     } else {
    //     //         type = 'd';
    //     //     }
    //     //     return type;
    //     // });
    //     var colorMap = {
    //         'Under 5 Years': '#98abc5',
    //         '5 to 13 Years': '#8a89a6'
    //     }
    //     var chart = new G2.Chart({
    //         id : 'c1',
    //         width : 1000,
    //         height : 500,
    //         plotCfg: {
    //             margin: [20, 100, 130, 80],
    //         },
    //
    //     });
    //     chart.source(frame, {
    //         population: {
    //             tickInterval: 10
    //         }
    //     });
    //     chart.axis('population', {
    //         formatter: function(val) {
    //             return (val) + 'M';
    //         }
    //     });
    //     chart.interval(['dodge', 'stack']).position('State*population').color('type*age', function(type, age) {
    //         return colorMap[age];
    //     }).size(18);
    //     chart.render();
    // }

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



