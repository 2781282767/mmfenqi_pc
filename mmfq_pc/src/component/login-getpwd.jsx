/**
 * Created by sheldon on 2016/7/25.
 */
'use strict';

class R_LoginGetpwd extends React.Component {

    constructor(){
        super();

        this.state={

            pwd_error:'',
            pwde_img:'',

            repwd_error:'',
            repwd_img:'',

            pwd:'',
            repwd:''


        }

    }

    pwd_handle(e){
        var patt = this.props.pwd_regex;        // 这里直接获取正则表达式
        var val = e.target.value;
        console.log('----------');
        console.log('正则：' + patt + ' 输入值：' + val);
        console.log('匹配结果：' + patt.test(val));
        this.check_pwd(val)
    }

    check_pwd(val){

        var patt = this.props.pwd_regex;
        if(val==''){
            this.setState({
                pwd_error: '密码不能为空',
                pwde_img:<img src="../static/images/register/r_er.png" style={{verticalAlign: 'middle'}} alt=""/>,
                pwd:''
            });
            return false;
        }
        if(!patt.test(val)){
            this.setState({
                pwd_error: '密码长度6-16，请重新输入',
                pwde_img:<img src="../static/images/register/r_er.png" style={{verticalAlign: 'middle'}} alt=""/>,
                pwd:val
            });

            return false;
        }else{
            this.setState({
                pwd_error: '',
                pwde_img:<img src="../static/images/register/r_su.png" style={{verticalAlign: 'middle'}} alt=""/>,
                pwd:val
            })
        }
        return true;

    }


    check_pwd2(val){
        if(val===this.state.pwd){
            this.setState({
                repwd_error: '',
                repwd_img:<img src="../static/images/register/r_su.png" style={{verticalAlign: 'middle'}} alt=""/>,
                repwd:val
            })

        }else{
            this.setState({
                repwd_error: '两次密码不一样',
                repwd_img:<img src="../static/images/register/r_er.png" style={{verticalAlign: 'middle'}} alt=""/>,
                repqd:val
            });

            return false;
        }
        return true;
    }



    pwd_handle2(e){
        var patt = this.props.pwd_regex;        // 这里直接获取正则表达式
        var val = e.target.value;
        console.log('----------');
        console.log('正则：' + patt + ' 输入值：' + val);
        console.log('匹配结果：' + patt.test(val));
        this.check_pwd2(val)

    }
    sure(pwd,repwd){
        if(!this.check_pwd(pwd)||!this.check_pwd2(repwd)){

            return;

        }
        $.ajax({
            type: "post",
            url: '/pc/computer/reset_pwd',
            dataType: "json",
            data: {
                telPhone:window.localStorage.getItem('telephone'),
                verifyCode:window.localStorage.getItem('verifyCode'),

                confirmPassword:CommonService.MD5(pwd),

                newPassword: CommonService.MD5(pwd),

            },
            error: function () {
            },
            timeout: 60000,
            success: function (data) {

                if(data.result=='0'){
                    window.location.href='login.html'
                }

            }
        })
    }


    render() {

        var pwd=this.state.pwd;
        var repwd=this.state.repwd;
        var pwd_error=this.state.pwd_error;
        var pwde_img=this.state.pwde_img;
       var repwd_error= this.state.repwd_error;
       var repwd_img= this.state.repwd_img;
        return (
            <div
                style={{flexGrow:'1',width:'100%',backgroundImage:'url(../static/images/login-background.jpg)',backgroundRepeat:'no-repeat',backgroundSize:'100% 100%',minHeight: 680,display:'flex',flexDirection:'column',justifyContent:'center'}}>
                <div className="wrap">
                    <div style={{backgroundColor: '#fff',height: 638,width:1198,border:'1px solid #e2e2e2'}}>
                        <div
                            style={{height: 48,borderBottom:'1px solid #e2e2e2',backgroundColor:'#FCFCFC',textIndent:'24px',lineHeight:'48px',fontSize:'16px'}}>
                            找回密码
                        </div>
                        <div style={{height:589,width:1198}}>
                            <div style={{height:589,width:448,float:'left'}}>
                                <div style={{textAlign:'right',marginRight: 10}}>
                                    <div style={{marginTop: 124}}>
                                        新密码
                                    </div>
                                    <div style={{marginTop: 47}}>
                                        确认密码
                                    </div>
                                </div>
                            </div>
                            <div style={{height:589,width:750,float:'left'}}>
                                <div style={{marginTop:110}}>
                                    <input placeholder="请输入6-16位字符或数字" type="password"  onBlur={this.pwd_handle.bind(this)}
                                           style={{width:340,height:44,border:'1px solid #e2e2e2',textIndent:'24px'}}/>
                                    <div style={{marginLeft:'10px','display':'inline'}}>{pwde_img} <span style={{verticalAlign: 'middle'}}>{pwd_error}</span></div>
                                </div>
                                <div style={{marginTop:25}}>
                                    <input placeholder="请重新输入" type="password"  onBlur={this.pwd_handle2.bind(this)}
                                           style={{width:340,height:44,border:'1px solid #e2e2e2',textIndent:'24px'}}/>
                                    <div style={{marginLeft:'10px','display':'inline'}}>{repwd_img} <span style={{verticalAlign: 'middle'}}>{repwd_error}</span></div>
                                </div>
                                <div onClick={this.sure.bind(this,pwd,repwd)}
                                    style={{marginTop:25,backgroundColor:'#FD657A',height:45,width: 342,lineHeight:'45px',color: '#fff',textAlign:'center'}}>
                                    确认更改
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
