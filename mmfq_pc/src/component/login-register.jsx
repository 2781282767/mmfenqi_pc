/**
 * Created by sheldon on 2016/7/22.
 */
'use strict';

class R_Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userType: 0,
            pe_img:'',
            pwde_img:'',
            phone_error:'',
            pwd_error:'',
            disabled: false,
            text: '获取验证码',
            timer: 60,


            telephone:'',
            pwd:'',
            repwd:'',



            repwd_error:'',
            repwd_img:'',

            verifyCode:''
        };
    }

    changeType(x) {
        this.setState({userType: x})
    }

    handleChange(e){
        var patt = this.props.phone_regex;        // 这里直接获取正则表达式
        var val = e.target.value;
        console.log('----------');
        console.log('正则：' + patt + ' 输入值：' + val);
        console.log('匹配结果：' + patt.test(val));

        this.check_phone(e.target.value)



    }

    pwd_handle(e){
               // 这里直接获取正则表达式
        var patt = this.props.pwd_regex;
        var val = e.target.value;
        console.log('----------');
        console.log('正则：' + patt + ' 输入值：' + val);
        console.log('匹配结果：' + patt.test(val));

        this.check_pwd(val)


    }


    pwd_handle2(e){
        var patt = this.props.pwd_regex;        // 这里直接获取正则表达式
        var val = e.target.value;
        console.log('----------');
        console.log('正则：' + patt + ' 输入值：' + val);
        console.log('匹配结果：' + patt.test(val));
        this.check_pwd2(val)

    }

    check_phone(phone){
        var patt = this.props.phone_regex;
        console.log(patt)
        if(phone==''){
            this.setState({
                phone_error:'手机号不能为空',
                pe_img:<img src="../static/images/register/r_er.png" style={{verticalAlign: 'middle'}} alt=""/>,
                telephone:''
            });
            return false;
        }else if(!patt.test(phone)){
            this.setState({
                phone_error:'手机号格式错误,请重新输入',
                pe_img:<img src="../static/images/register/r_er.png" style={{verticalAlign: 'middle'}} alt=""/>,
                telephone:phone
            });
            return false;
        }else{
            this.setState({
                phone_error:'',
                pe_img:<img src="../static/images/register/r_su.png" style={{verticalAlign: 'middle'}} alt=""/>,
                telephone:phone
            })
        }

        return true;
    }

    check_pwd(val){
        var patt = this.props.pwd_regex;

        if(val==''){
            this.setState({
                pwd_error: '密码不能为空，请重新输入',
                pwde_img:<img src="../static/images/register/r_er.png" style={{verticalAlign: 'middle'}} alt=""/>,
                pwd:''
            })
            return false;
        }else if(!patt.test(val)){
            this.setState({
                pwd_error: '密码长度6-16，请重新输入',
                pwde_img:<img src="../static/images/register/r_er.png" style={{verticalAlign: 'middle'}} alt=""/>,
                pwd:val
            })
            return false
        }else{
            this.setState({
                pwd_error: '',
                pwde_img:<img src="../static/images/register/r_su.png" style={{verticalAlign: 'middle'}} alt=""/>,
                pwd:val
            })

        }

        return true

    }

    check_pwd2(val){

        console.log(val)
        console.log(this.state.pwd)
        var patt = this.props.pwd_regex;
        if(val==this.state.pwd){
            this.setState({
                repwd_error: '',
                repwd_img:<img src="../static/images/register/r_su.png" style={{verticalAlign: 'middle'}} alt=""/>,
                repwd:val
            })

        }else{
            this.setState({
                repwd_error: '两次密码不一样',
                repwd_img:<img src="../static/images/register/r_er.png" style={{verticalAlign: 'middle'}} alt=""/>,
                repwd:val
            });

            return false;
        }
        return true;
    }

    handleClick(telephone) {

        if(!this.check_phone(telephone)){
            return;
        }

        if (this.state.disabled) {
            return;
        }

        $.ajax({
            type: "post",
            url: '/pc/computer/user_getcode',
            dataType: "json",
            data: {
                smsFmtId: 'register',
                telephone: this.state.telephone
            },
            error: function () {
            },
            timeout: 60000,
            success: function (data) {
                console.log(data)

                if(data.result=='10'){
                    this.setState({
                        phone_error:'手机号已注册',
                        pe_img:<img src="../static/images/register/r_er.png" style={{verticalAlign: 'middle'}} alt=""/>
                    });

                    return;
                }else{
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
                }

            }.bind(this)
        });
    }


    handleCaptcha(e) {
        this.setState({verifyCode: e.target.value});
    }

    register(telphone,pwd,repwd){

        var _this = this;
        if(!this.check_phone(telphone)||!this.check_pwd(pwd)||!this.check_pwd2(repwd)){
            return;
        }
        $.ajax({
            type: "post",
            url: '/pc/computer/user_register',
            dataType: "json",
            data: {
                userName: this.state.telephone,
                password: CommonService.MD5(this.state.pwd),
                verifyCode: this.state.verifyCode,
                userType:this.state.userType
            },
            error: function () {
            },
            timeout: 60000,
            success: function (data) {
                if(data.result==0){
                    $.cookie('name', _this.state.telephone, {expires: 30, path: "/"});
                    window.location.href='register-success.html'
                }
            }
        });
    }
    render() {

        var telephone=this.state.telephone;
        var pwd=this.state.pwd;
        var repwd=this.state.repwd;
        return (
            <div
                style={{flexGrow:'1',width:'100%',backgroundImage:'url(../static/images/login-background.jpg)',backgroundRepeat:'no-repeat',backgroundSize:'100% 100%',minHeight: 680,display:'flex',flexDirection:'column',justifyContent:'center'}}>
                <div className="wrap">
                    <div style={{backgroundColor: '#fff',height: 638,width:1198,border:'1px solid #e2e2e2'}}>
                        <div
                            style={{height: 48,borderBottom:'1px solid #e2e2e2',backgroundColor:'#FCFCFC',textIndent:'24px',lineHeight:'48px',fontSize:'16px'}}>
                            账号注册
                        </div>
                        <div style={{height:589,width:1198}}>
                            <div style={{height:589,width:448,float:'left'}}>
                                <div style={{textAlign:'right',marginRight: 10}}>
                                    <div style={{marginTop: 48}}>
                                        身份选择
                                    </div>
                                    <div style={{marginTop: 79}}>
                                        手机号码
                                    </div>
                                    <div style={{marginTop: 55}}>
                                        短信验证码
                                    </div>
                                    <div style={{marginTop: 55}}>
                                        登录密码
                                    </div>
                                    <div style={{marginTop: 55}}>
                                        确认密码
                                    </div>
                                </div>
                            </div>
                            <div style={{height:589,width:750,float:'left'}}>
                                {
                                    this.state.userType==0 ?
                                        <div style={{marginTop:24,display:'flex'}}>
                                            <div style={{marginLeft: 16}}>
                                                <img src="../static/images/login/student-checked.png"
                                                     style={{width:58,height:65}}/>
                                                <br/>
                                                <div style={{color:'#FD6F83'}}>我是学生</div>
                                            </div>
                                            <div style={{marginLeft:180}}>
                                                <img src="../static/images/login/white-unchecked.png"
                                                     style={{width:58,height:65}}
                                                     onClick={this.changeType.bind(this,6)}/>
                                                <br/>
                                                <div>我是白领</div>
                                            </div>
                                        </div>
                                        :
                                        <div style={{marginTop:24,display:'flex'}}>
                                            <div style={{marginLeft: 16}}>
                                                <img src="../static/images/login/student-unchecked.png"
                                                     style={{width:58,height:65}}
                                                     onClick={this.changeType.bind(this,0)}/>
                                                <div>我是学生</div>
                                            </div>
                                            <div style={{marginLeft:180}}>
                                                <img src="../static/images/login/white-checked.png"
                                                     style={{width:58,height:65}}/>
                                                <div style={{color:'#FD6F83'}}>我是白领</div>
                                            </div>
                                        </div>
                                }
                                <div style={{marginTop:25}}>
                                    <input placeholder="请输入有效手机号" onBlur={this.handleChange.bind(this)}
                                           style={{width:340,height:44,border:'1px solid #e2e2e2',textIndent:'24px'}}/>
                                    <div style={{marginLeft:'10px','display':'inline'}}>{this.state.pe_img} <span style={{verticalAlign: 'middle'}}>{this.state.phone_error}</span></div>
                                </div>
                                <div style={{marginTop:25}}>
                                    <input placeholder="请输入短信验证码" onBlur={this.handleCaptcha.bind(this)}
                                           style={{width:188,height:44,border:'1px solid #e2e2e2',textIndent:'24px'}}/>
                                    <span onClick={this.handleClick.bind(this,telephone)}
                                          style={{display:'inline-block',backgroundColor:'#FD657A',height:45,width: 140,marginLeft:'12px',lineHeight:'45px',color: '#fff',textAlign:'center'}}>

                                       {this.state.text}

                                    </span>
                                </div>
                                <div style={{marginTop:25}}>
                                    <input placeholder="请输入6-16位字符或数字" type="password"
                                           onBlur={this.pwd_handle.bind(this)}
                                           style={{width:340,height:44,border:'1px solid #e2e2e2',textIndent:'24px'}}/>

                                    <div style={{marginLeft:'10px','display':'inline'}}>{this.state.pwde_img} <span style={{verticalAlign: 'middle'}}>{this.state.pwd_error}</span></div>



                                </div>
                                <div style={{marginTop:25}}>
                                    <input placeholder="请保持两次密码一致" type="password" onBlur={this.pwd_handle2.bind(this)}
                                           style={{width:340,height:44,border:'1px solid #e2e2e2',textIndent:'24px'}}/>

                                    <div style={{marginLeft:'10px','display':'inline'}}>{this.state.repwd_img} <span style={{verticalAlign: 'middle'}}>{this.state.repwd_error}</span></div>

                                </div>
                                <div onClick={this.register.bind(this,telephone,pwd,repwd)}
                                    style={{marginTop:25,backgroundColor:'#FD657A',height:45,width: 342,lineHeight:'45px',color: '#fff',textAlign:'center'}}>
                                    注册
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
