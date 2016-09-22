/**
 * Created by sheldon on 2016/7/22.
 */
'use strict';

class R_Login extends React.Component {

    constructor(props) {
        console.log('登陆页面');
        super(props);
        this.state = {
            password: '',
            telephone: '',
            phoneBool: false,
            pwdBool: false,
            phone_error: '',
            pwd_error: ''
        }
    }

    componentDidMount(){

        setTimeout(function () {
            this.setState({
                password: ''
            })
        }.bind(this),0)

    }

    componentWillMount(){

        setTimeout(function () {
            this.setState({
                password: ''
            })
        }.bind(this),0)

    }


    handlePhone(e) {

        var patt = this.props.phone_regex;        // 这里直接获取正则表达式
        var val = e.target.value;
        console.log('----------');
        console.log('正则：' + patt + ' 输入值：' + val);
        console.log('匹配结果：' + patt.test(val));
        this.check_phone(e.target.value);
    }


    handlePhone2(e) {

        var patt = this.props.phone_regex;        // 这里直接获取正则表达式
        var val = e.target.value;
        console.log('----------');
        console.log('正则：' + patt + ' 输入值：' + val);
        console.log('匹配结果：' + patt.test(val));

        this.setState({
            telephone: val,
        });

    }

    handlePassword(e) {
        var patt = this.props.pwd_regex;        // 这里直接获取正则表达式
        var val = e.target.value;
        console.log('----------');
        console.log('正则：' + patt + ' 输入值：' + val);
        console.log('匹配结果：' + patt.test(val));

        this.check_pwd(val)


    }


    handlePassword2(e) {
        var patt = this.props.pwd_regex;        // 这里直接获取正则表达式
        var val = e.target.value;
        console.log('----------');
        console.log('正则：' + patt + ' 输入值：' + val);
        console.log('匹配结果：' + patt.test(val));
        this.setState({
            password:val
        });
        // this.check_pwd2(val)
    }

    check_phone(phone) {
        var patt = this.props.phone_regex;
        console.log(patt);
        if (phone == '') {
            this.setState({
                phone_error: '手机号不能为空',
                pe_img: <img src="../static/images/register/r_er.png" style={{verticalAlign: 'middle'}} alt=""/>,
                telephone: phone,
                phoneBool: true
            });


            return false;
        } else if (!patt.test(phone)) {
            this.setState({
                phone_error: '手机号格式错误,请重新输入',
                pe_img: <img src="../static/images/register/r_er.png" style={{verticalAlign: 'middle'}} alt=""/>,
                telephone: phone,
                phoneBool: true
            });
            return false;
        } else {
            this.setState({
                phone_error: '',
                pe_img: <img src="../static/images/register/r_su.png" style={{verticalAlign: 'middle'}} alt=""/>,
                telephone: phone,
                phoneBool: false
            })
        }

        return true;
    }

    check_pwd(val) {
        var patt = this.props.pwd_regex;

        if (val == '') {
            this.setState({
                pwd_error: '密码不能为空，请重新输入',
                pwde_img: <img src="../static/images/register/r_er.png" style={{verticalAlign: 'middle'}} alt=""/>,
                password: '',
                pwdBool: true
            });
            return false;
        } else if (!patt.test(val)) {
            this.setState({
                pwd_error: '密码长度6-16，请重新输入',
                pwde_img: <img src="../static/images/register/r_er.png" style={{verticalAlign: 'middle'}} alt=""/>,
                password: val,
                pwdBool: true
            });
            return false
        } else {
            this.setState({
                pwd_error: '',
                pwde_img: <img src="../static/images/register/r_su.png" style={{verticalAlign: 'middle'}} alt=""/>,
                password: val,
                pwdBool: false
            })

        }

        return true

    }


    goToLogin(phone, pwd,e) {

        e.preventDefault();


        function getSessionId(){
            var c_name = 'JSESSIONID';
            if(document.cookie.length>0){
                var c_start=document.cookie.indexOf(c_name + "=");
                if(c_start!=-1){
                    c_start=c_start + c_name.length+1;
                    var c_end=document.cookie.indexOf(";",c_start);
                    if(c_end==-1) c_end=document.cookie.length;
                    return unescape(document.cookie.substring(c_start,c_end));
                }
            }
        }

        (function() {
            var _fmOpt = {
                partner: 'mmfenqi',
                appName: 'mmfenqi_web',
                token:  getSessionId()       };
            var cimg = new Image(1,1);
            cimg.onload = function() {
                _fmOpt.imgLoaded = true;
            };
            cimg.src = "https://fp.fraudmetrix.cn/fp/clear.png?partnerCode=mmfenqi&appName=mmfenqi_web&tokenId=" + _fmOpt.token;
            var fm = document.createElement('script'); fm.type = 'text/javascript'; fm.async = true;
            fm.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'static.fraudmetrix.cn/fm.js?ver=0.1&t=' + (new Date().getTime()/3600000).toFixed(0);
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(fm, s);
        })();

        if (!this.check_phone(phone) || !this.check_pwd(pwd)) {
            return;
        }

        $.ajax({
            type: 'post',
            url: '/pc/computer/user_login',
            data: {userName: this.state.telephone, password: CommonService.MD5(this.state.password)},
            dataType: 'json',
            success: (data)=> {
                if (data.result == 0) {
                    $.cookie('name', data.data.baseUserDomain.user.telphone, {expires: 30, path: "/"});


                    if(localStorage.getItem("referer")){
                        window.location.href=localStorage.getItem("referer")
                    }else{

                        window.location.href = 'index.html';
                    }


                } else {
                    this.setState({
                        phone_error: data.msg,
                    });
                }
                console.log(data);
                console.log(document.cookie);

            }
        });
    }

    render() {
        var phoneBool = this.state.phoneBool;
        var pwdBool = this.state.pwdBool;
        var phone = this.state.telephone;
        var pwd = this.state.password;
        console.log(pwd);
        return (
            <div
                style={{
                    flexGrow: '1',
                    width: '100%',
                    backgroundImage: 'url(../static/images/login-background.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%',
                    minHeight: 640,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                <form onSubmit={this.goToLogin.bind(this, phone, pwd)}>
                    <div className="wrap">
                        <div style={{height: 580, width: 980, marginLeft: 110, backgroundColor: '#fff'}}>
                            <div className="img">

                                <div><img src="../static/images/leaft.jpg" alt=""/></div>

                            </div>
                            <div
                                style={{
                                    width: 422,
                                    marginRight: 40,
                                    marginTop: 69,
                                    height: 437,
                                    border: '1px solid #e2e2e2',
                                    float: 'right'
                                }}>
                                <div
                                    style={{
                                        height: 40,
                                        borderBottom: '1px solid #e2e2e2',
                                        width: '100%',
                                        lineHeight: '40px',
                                        backgroundColor: '#FCFCFC'
                                    }}>
                                    <div style={{paddingLeft: 16}}>账号登陆</div>
                                </div>
                                <div style={{marginTop: 25}}>
                                    <div style={{width: 342, marginLeft: 40}}>
                                        <div>
                                            <div className="phone_error">{this.state.phone_error}</div>
                                            <div className="img_input">
                                                <div><img src="../static/images/login/iconfont-wo.png" alt=""/></div>
                                                <input type="text" placeholder="请输入手机号" name="text"
                                                       onBlur={this.handlePhone.bind(this)}
                                                       onChange={this.handlePhone2.bind(this)}
                                                       style={{border: phoneBool == true ? '1px solid #fd7083' : '1px solid #e8e8e8'}}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{marginTop: 9}}>
                                    <div style={{width: 342, marginLeft: 40}}>
                                        <div>
                                            <div className="pwd_error">{this.state.pwd_error}</div>
                                            <div className="img_input">
                                                <div><img src="../static/images/login/suo.png" alt=""/></div>
                                                <input type="password" placeholder="请输入密码" value={pwd}
                                                       onBlur={this.handlePassword.bind(this)}
                                                       onChange={this.handlePassword2.bind(this)}
                                                       style={{border: pwdBool == true ? '1px solid #fd7083' : '1px solid #e8e8e8'}}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{marginTop: 25}}>
                                    <p>
                                        <a href="forget.html"
                                           style={{
                                               float: 'right',
                                               marginRight: 40,
                                               color: '#FD647A',
                                               textDecoration: 'underline'
                                           }}>忘记密码？</a>
                                    </p>
                                </div>
                                <input  type="submit" value="登录" readOnly="true"
                                       style={{
                                           display: 'inline-block',
                                           marginTop: 35,
                                           backgroundColor: '#FD657A',
                                           height: 45,
                                           width: 342,
                                           marginLeft: 40,
                                           lineHeight: '45px',
                                           color: '#fff',
                                           textAlign: 'center',
                                           border: '0'
                                       }}/>


                                <div style={{marginTop: 40, marginLeft: 40}}>
                                    还没有账号？<a style={{color: '#FD647A', textDecoration: 'underline'}}
                                             href="register.html">立即注册</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
