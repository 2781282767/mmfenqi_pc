
class R_Capthca extends React.Component {

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
            repwd_error:'',
            repwd_img:'',

            verifyCode:''
        };
    }

    check_phone(){
        if(this.state.telephone==''){
            this.setState({
                phone_error:'手机号不能为空',
                pe_img:<img src="../static/images/register/r_er.png" style={{verticalAlign: 'middle'}} alt=""/>
            });
            return false;
        }

        return true;
    }

    handleClick() {

        console.log(this.props.phone)


        if(!this.check_phone()){
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
                smsFmtId: this.props.smsFmtId,
                telephone: this.props.phone
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
                    })

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

    render(){
        return (
            <span onClick={this.handleClick.bind(this)}
                  style={{display:'inline-block',backgroundColor:'#FD657A',height:45,width: 140,marginLeft:'12px',lineHeight:'45px',color: '#fff',textAlign:'center'}}>{this.state.text}</span>
        )
    }
}




class Input extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            phone:'',
        };
        // this.getVerifyCode = this.getVerifyCode.bind(this);
    }

    getVerifyCode(phone) {
        console.log(phone)
    }

    handlePhone(event){
        this.setState({phone: event.target.value});
    }
    render(){
        var phone=this.state.phone;
        return (
            <div>
                <input placeholder="请输入有效手机号" value={phone}   onChange={this.handlePhone.bind(this)}
                       style={{width:340,height:44,border:'1px solid #e2e2e2',textIndent:'24px'}}/>

                <div style={{marginLeft:'10px','display':'inline'}}> <span style={{verticalAlign: 'middle'}}></span></div>
            </div>

        )
    }
}
