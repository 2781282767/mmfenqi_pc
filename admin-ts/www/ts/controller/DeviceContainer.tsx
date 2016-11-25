import * as React from "react";
import * as ReactDOM from "react-dom";
import {bindActionCreators} from 'redux';
import {Provider, connect} from 'react-redux';


import {Button} from 'antd';


import {Select} from 'antd';

const Option = Select.Option;
//自己的第三方组件
import {
    AppBody,
} from '../components/index';
//自己书写的基类
import BaseContainer from '../components/pubController/BaseContainer';
import {BaseStore} from '../redux/store/BaseStore';

import TableTwo from './Table/TableTwo';


import '../../styles/containerLess/device.less'
const store = BaseStore({});
class IndexApp extends BaseContainer {
    constructor(props) {
        super(props);


        this.state = {
            info: {},
            admin: {},
            changeData: {},
            mouseOver: false,
            index: null
        }

    }

    handleButton() {
        //let {MenuReducers, dispatch} = this.props;
        alert('点击优惠码')
    }

    deviceCancel() {

        this.setState({
            admin: {
                flag: true
            }
        });


    }


    search(e) {
        let self = this;
        e.preventDefault();
    }

    onChildChanged(newState) {
        this.setState({
            changeData: newState,
            admin: {
                flag: true
            }
        })
    }

    del(school, index) {
        console.log(index + school)
    }

    handMouseOver(index) {
        console.log(index);

        this.setState({
            mouseOver: true,
            index: index
        })
    }

    handMouseOver2(index) {
        console.log(index);

        this.setState({
            mouseOver: true,
        })
    }

    handMouseOut() {

        this.setState({
            mouseOver: false
        })

    }


    render() {
        let {Actions} = this.props;
        const {admin, changeData} =this.state;


        const list = [
            {name: '学校'},
            {name: '学校2'}
        ];


        const schoolList = [
            {school: '重庆南开中学(3中)', del: '删除'},
            {school: '重庆巴蜀中学(41中)', del: '删除'},
            {school: '重庆育才中学(20中)', del: '删除'},
            {school: '重庆川外附属外国语学校', del: '删除'},
            {school: '重庆巴县中学(巴中)', del: '删除'},
        ];


        console.log(this.state.mouseOver);
        return (
            <AppBody>

                <div className="ui-device">
                    <div className="left">

                        <div className="search-condition">
                            <div style={{display:'flex',height:'40px',alignItems:'center'}}>
                                <Select size="large" defaultValue="学校" style={{ minWidth: 70 }}>

                                    {
                                        list.map((json, index)=> {


                                            return (



                                                <Option value={json.name}>{json.name}</Option>

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
                        </div>


                        <div className="search-content">

                            <div className="search-number">全部</div>

                            {
                                schoolList.map((json, index)=> {
                                    return (
                                        <div className="search-school"
                                             onMouseOver={this.handMouseOver.bind(this,index)}
                                             onMouseOut={this.handMouseOut.bind(this)}>
                                            <div className="name">{json.school}</div>

                                            <div className="del" onMouseOver={this.handMouseOver.bind(this,index)}
                                                 onClick={this.del.bind(this)}>


                                                {
                                                    !!this.state.mouseOver && this.state.index == index ?
                                                        '删除' :
                                                        null


                                                }
                                            </div>


                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>


                    <div className="right">


                        <div className="ui-col2">
                            <div className="col1">重庆育才中学(20中)<span style={{margin:'0 20px'}}>11000台</span>


                                <div style={{display:'flex',height:'40px',alignItems:'center'}}>
                                    <Select size="large" defaultValue="jk" style={{ minWidth: 70 }}>

                                        {
                                            list.map((json, index)=> {


                                                return (



                                                    <Option  value={json.name}>{json.name}</Option>

                                                )
                                            })
                                        }

                                    </Select>


                                </div>
                            </div>


                            <div className="col2">


                                <Button type="primary">


                                    <div style={{display:'flex'}}>
                                        <img src="/dist/images/huishou.png"/>
                                        &nbsp;
                                        <span>回收</span>
                                    </div>
                                </Button>


                                <div className="export">
                                    <img src="/dist/images/export.png"/>
                                    &nbsp;
                                    <span>导出</span>
                                </div>


                            </div>
                        </div>

                        <TableTwo />
                    </div>
                </div>


            </AppBody>
        );
    }

    componentWillMount() {
        this.setState({
            mouseOver: false
        })
    }

    componentDidMount(): void {
        let {MenuReducers, Actions} = this.props;
    }

    componentWillUnmount(): void {

    }
}

let mapStateToProps = (state) => {
    return {}
};

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



