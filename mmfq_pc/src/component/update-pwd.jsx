/**
 * Created by ChinaHp on 2016/8/10.
 */
'use strict';
class R_aa extends React.Component{
    constructor() {
        super();

        this.state={
            pwd:'',
            pwd_error:'',
            pwd_img:'',

            rePwd:'',

            rePwd_error:'',

            rePwd_img:'',


            newPwd:'',
            newPwd_error:'',
            newPwd_img:'',

        };
        this.style={
            width:130,
            textAlign:'right',
            display:'inline-block',
            height:35,
            margin:'2px 0',
            paddingRight:5
        };

        this.inputStyle={
            height:'40px',
            outline:'none',
            border: '1px solid #E8E8E8',
            paddingLeft:'5px'
        }

    }

    pwdChange(e){
        var val=e.target.value;
        this.setState({
            pwd:val
        })
    };

    newChangePwd(e){
        var val = e.target.value;
        this.setState({
            newPwd:val
        })

    }

    check_pwd(val){
        var patt = this.props.pwd_regex;        // 这里直接获取正则表达式
        console.log('匹配结果：' + patt.test(val));
        if(val==''){
            this.setState({
                newPwd_error: '密码不能为空，请重新输入',
                newPwd_img: <img src="../static/images/register/r_er.png" style={{verticalAlign: 'middle'}} alt=""/>,
                newPwd: '',
            });
            return false
        }else if(!patt.test(val)){
            this.setState({
                newPwd_error: '密码格式错误，请重新输入',
                newPwd_img: <img src="../static/images/register/r_er.png" style={{verticalAlign: 'middle'}} alt=""/>,
                newPwd: val,
            });
            return false
        }else{
            this.setState({
                newPwd_error: '',
                newPwd_img: <img src="../static/images/register/r_su.png" style={{verticalAlign: 'middle'}} alt=""/>,
                newPwd: val,
            });

            return true
        }
    }

    newBlurPwd(e){
        var val = e.target.value;
        this.check_pwd(val)
    }


    sureChangePwd(e){
        var val = e.target.value;
        var patt = this.props.pwd_regex;
        this.setState({
            rePwd:val
        });

    }

    sureBlurPwd(e){
        var val = e.target.value;
        var patt = this.props.pwd_regex;
        this.compare(this.state.newPwd,this.state.rePwd)

    }


    compare(newPwd,rePwd){
        if(!rePwd){
            return
        }else if(newPwd===rePwd){

            this.setState({
                rePwd_error: '',
                rePwd_img: <img src="../static/images/register/r_su.png" style={{verticalAlign: 'middle'}} alt=""/>,
                rePwd: rePwd,
            });

            return true;
        }else{
            this.setState({
                rePwd_error: '两次密码不相同，请重新输入',
                rePwd_img: <img src="../static/images/register/r_er.png" style={{verticalAlign: 'middle'}} alt=""/>,
                rePwd: rePwd,
            });

            return false
        }
    }
    submit(pwd,newPwd,rePwd){

        if(!this.check_pwd(newPwd)||!this.compare(newPwd,rePwd)){
            return
        }
        HttpService.save({
            url:'/pc/computer/change_pwd',
            data:{oldPassword:CommonService.MD5(pwd),newPassword:CommonService.MD5(newPwd)},
            success:(res=>{
                window.location.href='index.html';
            })
        })
    }



    render(){

        var pwd=this.state.pwd;
        var nwePwd=this.state.newPwd;
        var rePwd=this.state.rePwd;
        return (
            <div style={{float: 'left'}}>
                <div className="wrap-content">
                    <div className="wrap-content-right">
                        <div>
                            <div className="top">
                               修改密码
                            </div>
                            <div className="top-content" style={{margin:'10px 0'}}>
                                <div>

                                    <label htmlFor="old" style={this.style}>旧密码</label>

                                    <input style={this.inputStyle} placeholder="请输入旧密码"  onChange={this.pwdChange.bind(this)} type="password" id="old"/>

                                </div>




                                <div><label htmlFor="new" style={this.style}>新密码</label>

                                    <input type="password" placeholder="请输入新密码" style={this.inputStyle} id="new" onChange={this.newChangePwd.bind(this)} onBlur={this.newBlurPwd.bind(this)}/>
                                    <div style={{marginLeft:'10px','display':'inline'}}>{this.state.newPwd_img} <span style={{verticalAlign: 'middle'}}>{this.state.newPwd_error}</span></div>
                                </div>



                                <div><label htmlFor="sure" style={this.style}>再次输入密码</label>

                                    <input  style={this.inputStyle} placeholder="请再次输入密码" type="password" id="sure" onChange={this.sureChangePwd.bind(this)} onBlur={this.sureBlurPwd.bind(this)} />
                                    <div style={{marginLeft:'10px','display':'inline'}}>{this.state.rePwd_img} <span style={{verticalAlign: 'middle'}}>{this.state.rePwd_error}</span></div>
                                </div>

                                <div>
                                    <div style={this.style}></div>
                                    <div className="_btn btn_btn" style={ {verticalAlign: 'bottom',
                                        width: 77,
                                        padding: '7px 0'}  } onClick={this.submit.bind(this,pwd,nwePwd,rePwd)}>
                                        确定修改
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
    }
}

class R_Old_pwd extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div>

                <label htmlFor="old" style={this.props.cx.style}>旧密码</label>

                <input type="password" id="old"/>

            </div>
        )

    }
}

class R_new_pwd extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div><label htmlFor="new" style={this.props.cx.style}>新密码</label>

                <input type="password" id="new" onChange={this.props.cx.newChangePwd} onBlur={this.props.cx.newBlurPwd.bind(this)}/>
                <div style={{marginLeft:'10px','display':'inline'}}>{this.props.cx.newPwd} <span style={{verticalAlign: 'middle'}}>{this.props.cx.newPwd_error}</span></div>
            </div>
        )
    }
}

class R_sure_pwd extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div><label htmlFor="sure" style={this.props.cx.style}>再次输入密码</label>

                <input type="password" id="sure"/></div>

        )
    }
}


