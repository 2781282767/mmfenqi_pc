'usr strict';


import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import {R_header} from './common/index'

import code from '../img/code.png'
import {HttpService ,Toast}  from'../Http';



  class VerifyText extends React.Component{

      constructor(props) {
          super(props);
          this.state = {

              disabled: false,
              text: '获取验证码',
              timer: 60,
              smscode:'',
              val:''
          };
      }



      getCode(){

          if (this.state.disabled) {
              return;
          }

          HttpService.query({
            url:'/app/device/generateSMSCode',
            data:{
                token: localStorage.appToken,
                telephone: this.props.params.telephone,
                admintelephone: this.props.params.admintelephone,
                module: 'scandevice',
                mdtid: this.props.params.mdtid
            },
              success:function (res) {

                      console.log(res);

                      if (res.code == 10004) {

                          this.setState({
                              disabled: true,
                              text: '59s后重新获取',
                              timer: 59
                          });
                          var self = this;
                          var tm = setInterval(function () {
                              var tt = self.state.timer - 1;
                              if (tt <= 0) {
                                  self.setState({
                                      disabled: false,
                                      text: '获取验证码',
                                      timer: 60,
                                  });
                                  clearInterval(tm);
                                  return;
                              }
                              self.setState({
                                  disabled: true,
                                  text: tt + 's后重新获取',
                                  timer: tt
                              })
                          }, 1000);

                      } else {
                          Toast.toast(res.msg);
                          // $scope.verifyStatus = true;
                      }

              }.bind(this)
          })






      }

      change(e){

          var val = e.target.value;
          this.setState({
              val:val
          })

      }

      next(smscode,e){
          e.preventDefault();

          HttpService.save({
              url:'/app/device/addGuardian',
              data:{
                  token: localStorage.appToken,
                  admintelephone: this.props.params.admintelephone,
                  smscode: smscode,
                  deviceid: this.props.params.deviceid
              },
              success:(res=>{
                  console.log(res);

                  if (res.code == 10080) {

                      window.location.href = '/#/map/'+localStorage.sid+'';
                  } else {

                      Toast.toast(res.msg, 3000);
                  }
              })
          })
      }



    render(){

        const phone = this.props.params.admintelephone.substr(0, 3) + '****' + this.props.params.admintelephone.substr(7, 11);


        return (
            <div className="container">
                <form onSubmit={this.next.bind(this,this.state.val)} name="form">
                    <div className="col-xs-12 text-center" style={{padding: '2rem 0 1.5rem 0', fontSize: '1.4rem', color: '#333333'}}>
                        请向设备管理员({phone})索取验证码
                    </div>
                    <div className="col-xs-12 app-white-input" style={{lineHeight: '3rem'}}>
                        <div className="col-xs-2 text-right" style={{paddingLeft: 0}}>

                            <img  src={code} style={{width: '2.2rem'}}/>


                        </div>
                        <div className="col-xs-6" style={{paddingLeft:  0}}><input id="number" type="text" placeholder="请输入验证码" onChange={this.change.bind(this)}
                                                                                required
                                                                                style={{width: '100%', verticalAlign: 'middle'}}/></div>
                        <div className="col-xs-4 text-right" style={{padding:'0'}}>
                            <div className="app-blue-radius-check-button" style={{textAlign: 'center'}} onClick={this.getCode.bind(this)}>
                                {this.state.text}
                            </div>
                        </div>
                    </div>

                    <label style={{display: 'block'}}>

                        <div className="col-xs-12  text-center app-pink-radius-button" style={{marginTop: '1.5rem',fontSize: '1.6rem'}}>添加
                        </div>
                        <button type="submit" style={{display: 'none'}}></button>
                    </label>
                </form>
            </div>
        )}


}





 const mapStateToProps = state => {
    return {


    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({

    },dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(VerifyText);