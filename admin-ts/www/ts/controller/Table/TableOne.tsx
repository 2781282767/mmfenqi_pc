import * as React from "react";
import * as ReactDOM from "react-dom";
//自己的第三方组件
import {
    Buttons,
} from '../../components/index';

import {Table} from 'antd';


export default class TableOne extends React.Component<any, any> {

    public data:any;

    public callbackParent:any;

    public pagination:any;
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
            data: []

        };


        this.data= [];
        for (let i = 0; i < 46; i++) {
            this.data.push({
                key: i,
                account: `account ${i}`,
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
                alert(current)
            },
        };
    }

    handDelete(text, record):void {


        console.log(text);
        console.log(record);
    }

    /**
     * 修改
     */
    handChange(record):void {

        console.log(this);

        console.log(record);

        this.props.callbackParent(record);
    }


    render() {

        console.log('pagination');

        console.log(this.pagination);
        return (
            <Table columns={this.state.columns} dataSource={this.state.data}  />
        );
    }

    componentWillMount(): void {

        console.log(this.data);
        this.setState({
            data: this.data
        })
    }

    componentWillUnmount(): void {

    }
}




