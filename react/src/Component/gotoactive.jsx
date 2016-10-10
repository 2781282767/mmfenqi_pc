'usr strict';
import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import {R_header} from './common/index'

import {HttpService ,Toast}  from'../Http';





class Gotoactive extends React.Component{

    constructor(props) {
        super(props);
        this.state = {


            studentname:'',
            teachertel:''

        };
    }


    componentWillMount(){

        console.log(this.props.params.telephone);
        console.log(this.props.params.mdtid)


    }

    name(e){
        let val = e.target.value;
        this.setState({
            studentname:val
        })
    }

    teachertel(e){
        let val = e.target.value;
        this.setState({
            teachertel:val
        })
    }

    next(studentname,teachertel,e){
        e.preventDefault();
        HttpService.query({
            url:'/app/device/guardianActive',

            data:{
                mdtid: this.props.params.mdtid,
                telephone: this.props.params.telephone,
                studentname: studentname,
                teachertel: teachertel,
                token: localStorage.appToken
            },
            success:(res=>{
                if (res.code == 10150) {
                   const endTime = res.data.endtime;
                    window.location.href = '/#Success/'+endTime+'';
                  //  window.location.href = '/assets/module/activate/success.html?endTime=' + $scope.endTime + '&telephone=' + $scope.telephone + ''
                } else {

                    Toast.toast(res.msg, '3000');
                }
            })

        })
    }




    render(){
        return (

            <div>

                <R_header title="激活设备"/>

            <div className="container">
                <form onSubmit={this.next.bind(this,this.state.studentname,this.state.teachertel)} name="form">

                    <div className="col-xs-12 app-content-title app-padding-zero">设备信息</div>
                    <div className="col-xs-12 app-white-input">
                        <label  className="app-white-input-label">设备IMEI号</label>
                        <input id="number" disabled type="text" placeholder="23764761536276"  value={this.props.params.mdtid} required/>
                    </div>
                    <hr className="app-bootstrap-hr"/>
                        <div className="col-xs-12 app-white-input">
                            <label  className="app-white-input-label">设备手机号</label>
                            <input id="number2" type="text" disabled placeholder="请输入设备手机号" value={this.props.params.telephone} required/>
                        </div>
                        <div className="col-xs-12 app-content-title app-padding-zero">学校监管</div>
                        <div className="col-xs-12 app-white-input">
                            <label  className="app-white-input-label">宝贝姓名</label>
                            <input id="number3" type="text" placeholder="请输入宝贝姓名" onChange={this.name.bind(this)} required/>
                        </div>
                        <hr className="app-bootstrap-hr" />
                            <div className="col-xs-12 app-white-input">
                                <label className="app-white-input-label">班主任手机号</label>
                                <input id="number4" type="text"  placeholder="请输入班主任手机号码" onChange={this.teachertel.bind(this)}
                                       required/>
                            </div>


                            <label style={{display:'block'}}>

                                <div className="col-xs-12 text-center app-pink-radius-button"
                                     style={{marginTop:'1.5rem'}}>激活设备
                                </div>
                                <button type="submit" style={{display:'none'}}></button>
                            </label>

</form>

            </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {


    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({

    },dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Gotoactive);