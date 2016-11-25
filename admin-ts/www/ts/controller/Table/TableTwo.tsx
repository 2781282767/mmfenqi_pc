import * as React from "react";
import * as ReactDOM from "react-dom";
//自己的第三方组件
import {Buttons} from '../../components/index';

import { Table } from 'antd';


export default class TableTwo extends React.Component<any, any> {

    public data:any;

    public pagination:any;

    public rowSelection:any;
    constructor(props) {
        super(props);
        this.state = {
            columns: [{
                title: '设备类型',
                dataIndex: 'account',
                key: 'account',
                render: (text) => <a href="#">{text}</a>,
            }, {
                title: '生产商',
                dataIndex: 'name',
                key: 'name',
            },

                {
                    title: '设备IMEI号',
                    dataIndex: 'zuzhi',
                    key: 'zuzhi',
                },
                {
                    title: '设备手机号',
                    dataIndex: 'email',
                    key: 'email',
                },
                {
                    title: '激活日期',
                    dataIndex: 'address',
                    key: 'address',
                }, {
                    title: '设备有效日期',
                    dataIndex: 'effectiveTime',
                    key: 'effectiveTime',
                },{
                    title: '缴费状态',
                    dataIndex: 'type',
                    key: 'type',
                },{
                    title: '推广价',
                    dataIndex: 'promotionPrice',
                    key: 'promotionPrice',
                },{
                    title: '套餐价格',
                    dataIndex: 'price',
                    key: 'price',
                }, {
                    title: '操作',
                    key: 'operation',
                    render: (text, record) => (
                        <span>
                            <Buttons type="primary" size="small" onClick={this.detailed.bind(this,record)}>
                                查看
                            </Buttons>
                        </span>
                    ),
                }],
            data: [


            ]

        };


        this.data = [];
        for (let i = 0; i < 46; i++) {
            this.data.push({
                key: i,
                account:`acc${i}`,
                name: `Edward ${i}`,
                zuzhi: `杭州 ${i}`,
                email: `${i}qq.com`,
                address: `no. ${i}`,
                effectiveTime:`2010-11-${i}`,
                type:`${i},`,
                promotionPrice:`10${i}`,
                price:`10${i}`

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


         this.rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            onSelect: (record, selected, selectedRows) => {
                console.log(record, selected, selectedRows);
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                console.log(selected, selectedRows, changeRows);
            },
        };
    }

    detailed(text, record) {


        console.log(text);
        console.log(record)



    }






    render() {

        console.log('33333'+this.pagination);
        return (
            <Table  rowSelection={this.rowSelection} columns={this.state.columns} dataSource={this.state.data}/>
        );
    }

    componentWillMount(): void {

        this.setState({
            data:this.data
        })
    }

    componentWillUnmount(): void {

    }
}




