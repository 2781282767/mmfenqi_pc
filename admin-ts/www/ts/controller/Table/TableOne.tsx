import * as React from "react";
import * as ReactDOM from "react-dom";
//自己的第三方组件
import {
    AppBody,
    Panel,
    Echarts,
    Buttons,
    Row,
    Col,
    Icon,
    Dialog,
    FormGroup,
    FormItems,
    InputText
} from '../../components/index';

import { Table } from 'antd';


/*class ChangeTable extends React.Component<any, any>{
 constructor(props) {
 super(props);

 }

 handleInputChange(name,value){
 console.log(value)
 }
 render(){
 let data = this.props.data.record;

 return <FormGroup horizontal >
 <FormItems label="姓名">
 <InputText type="test" value={data.name}
 onChange={(event) => this.handleInputChange('name',event.target.value) }/>
 </FormItems>
 <FormItems label="年龄">
 <InputText type="test" value = {data.age}
 onChange={(event) => this.handleInputChange('age',event.target.value) }/>
 </FormItems>
 <FormItems label="住址">
 <InputText type="test" value = {data.address}
 onChange={(event) => this.handleInputChange('address',event.target.value) }/>
 </FormItems>
 </FormGroup>
 }
 }*/
/* const rowRadio = {
 radioName:'pay2',
 value:'2',
 onChange(event,record) {
 console.log(record)
 }
 };*/
class ChangeTable extends React.Component<any, any> {
    rowRadio: any;

    constructor(props) {
        super(props);
        this.state = {

            columns: [{
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                render: (text) => <a href="#">{text}</a>,
            }, {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
            }, {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
            }],
            data: [{
                key: '1',
                name: '小明',
                age: 32,
                address: '西湖区湖底公园1号',
            }, {
                key: '2',
                name: '小红',
                age: 42,
                address: '西湖区湖底公园2号',
            }, {
                key: '3',
                name: '小东',
                age: 32,
                address: '西湖区湖底公园3号',
            }
            ]


        }

        this.rowRadio = {
            radioName: 'pay2',
            value: '-1',
            onChange: (event, record)=> {
                this.props.callback(record)
            }
        }



    }




    render() {
        let data = this.props.data.record;

        return <Table rowRadio={this.rowRadio} columns={this.state.columns} dataSource={this.state.data}/>
    }
}

export default class TableOne extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {

            columns: [{
                title: '账户',
                dataIndex: 'account',
                key: 'account',
                render: (text) => <a href="#">{text}</a>,
            }, {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },

                {
                    title: '隶属组织',
                    dataIndex: 'zuzhi',
                    key: 'zuzhi',
                },
                {
                    title: '邮箱',
                    dataIndex: 'email',
                    key: 'email',
                },
                {
                    title: '地址',
                    dataIndex: 'address',
                    key: 'address',
                }, {
                    title: '操作',
                    key: 'operation',
                    render: (text, record) => (
                        <span>
                            <Buttons type="warning" size="small" onClick={this.handChange.bind(this,record)}>
                                修改
                            </Buttons>
                            <Buttons type="danger" size="small" onClick={() => { this.handDelete(text, record) } }>
                                删除
                            </Buttons>
                             <Buttons type="primary" size="small" onClick={() => { this.handDelete(text, record) } }>
                                停用
                            </Buttons>
                        </span>
                    ),
                }],
                data: [


                //     {
                //         key: '1',
                //         account:'11111',
                //         name: '小明',
                //         zuzhi: '杭州',
                //         email: '122',
                //         address: '西湖区湖底公园1号',
                //     }, {
                //         key: '2',
                //         account:'11111',
                //         name: '小明',
                //         zuzhi: '杭州',
                //         email: '122',
                //         address: '西湖区湖底公园1号',
                //     }, {
                //         key: '3',
                //         account:'11111',
                //         name: '小明',
                //         zuzhi: '杭州',
                //         email: '122',
                //         address: '西湖区湖底公园1号',
                //     }
                 ]

        }


         this.data = [];
        for (let i = 0; i < 46; i++) {
            this.data.push({
                key: i,
                account:`account ${i}`,
                name: `Edward King ${i}`,
                zuzhi: `杭州 ${i}`,
                email: `${i}qq.com`,
                address: `London, Park Lane no. ${i}`,
            });
        }




         this.pagination = {
            total: this.state.data.length,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                console.log('Current: ', current, '; PageSize: ', pageSize);
            },
            onChange(current) {
                console.log('Current: ', current);
            },
        };
    }

    handDelete(text, record) {


        console.log(text)
        console.log(record)


        // this.state.data.map((d, i) => {
        //     if (d.key == record.key) {
        //         this.state.data.splice(i, 1)
        //     }
        // })
        // this.setState({
        //     data: this.state.data
        // })
    }

    /**
     * 修改
     */
    handChange(record) {

        console.log(this)

        console.log(record)

        this.props.callbackParent(record);
        // let text;
        // let data = {
        //     record
        // }
        // let buyConfirm = (modal) => {
        //     console.log(text)
        //     modal.close();
        // };
        // let buyConfirm1 = (modal) => {
        //     modal.close();
        // };
        // let actions = [
        //     {label: '取消', onClick: buyConfirm1},
        //     {label: '确定', onClick: buyConfirm, primary: true}
        // ];
        // let ok = (call) => {
        //     text = call;
        // }
        //
        // Dialog.show(<div><ChangeTable data={data} callback={(call)=>(ok(call))}/></div>, actions, '修改资料');
    }




    render() {

        console.log(this.pagination)
        return (
            <Table columns={this.state.columns} dataSource={this.state.data}/>
        );
    }

    componentWillMount(): void {

        console.log(this.data);
        this.setState({
            data:this.data
        })
    }

    componentWillUnmount(): void {

    }
}




