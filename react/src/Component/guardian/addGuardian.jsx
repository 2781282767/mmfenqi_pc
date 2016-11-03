'usr strict';



import React, {Component, PropTypes} from 'react';

import ReactDOM, {render} from 'react-dom';

import {HttpService, Toast,Md5}  from'../../Http';
import {R_header} from '../common/index';


import {getGuardianss} from '../../action/index'


import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


import chengyuan from '../../img/guardian/chengyuan.png'
import chengyuanguanxi from '../../img/guardian/chengyuanguanxi.png'
import shoujihao from '../../img/guardian/shoujihao.png'
import guanbi from '../../img/guardian/guanbi.png'



class AddGuardian extends Component {
    constructor(props) {

        super(props)

        this.state={
            open:false,
            familystatus:'',
            bg:'app-little-pink-radius-button',
            tel:'',

            allow:true



        }

    }


    componentWillMount() {

        if(this.props.params.familystatus!='null'){

            this.setState({
                allow:false,
                familystatus:this.props.params.familystatus
            })

        }

    }

    changeAge(familystatus){

        this.setState({
            familystatus:familystatus,
            open:false
        })




    }

    next(tel,e){

        e.preventDefault();

        var patt=/^[1]\d{10}$/;


        if(!this.state.familystatus){
            Toast.toast('请选择成员关系',3000);
            return;
        }else if(!tel){
            Toast.toast('请输入手机号',3000);
            return;
        }else if(!patt.test(tel)&&!!tel){
            Toast.toast('手机格式不正确',3000);
            return;
        }
        console.log(this.props.params.babyid);
        HttpService.query({
            url: '/app/object/saveGuardian',
            data: {
                familystatus: this.state.familystatus,
                babyid: this.props.params.babyid,
                token: localStorage.appToken,
                telephone:tel,
                guardianid:''
            },
            success: (res=> {


                if (res.code == '10064') {
                    //this.props.changeSaveBabyStatus('false');

                    // window.location.href='#/Guardian/'+this.props.params.babyid+'';
                    this.context.router.goBack();
                    window.localStorage._update=true;



                } else {
                    Toast.toast(res.msg, 3000);
                }
            })
        })
    }

    change(e){
        let val = e.target.value;
        this.setState({
            tel:val
        });

        if(!!this.state.tel){
            this.setState({
                bg:'app-pink-radius-button'
            })
        }
    }


    guanbi(){
        this.setState({
            open:false
        });
    }




    add(){

            this.setState({
                open:true
            });
            this.props.getGuardianss(this.props.params.babyid);

    }


    render(){

        const {getGuardiansLists} =this.props;
        return(
            <div className="addGuardian">
                <R_header left="1" title="编辑信息"/>



                {
                    !!this.state.open?

                        <div>
                            <div className="_zz"></div>
                            <div className="layer_content3">
                                <div className="header">
                                    <div className="title">选择成员关系</div>
                                    <div className="guanbi" onClick={this.guanbi.bind(this)}><img src={guanbi} style={{width:'100%',height:'100%'}}/></div>
                                </div>
                                <div className="layer_content4">

                                    {
                                        !!getGuardiansLists?
                                            getGuardiansLists.map((json, index)=> {
                                                return <div className="row" key={index}
                                                            onClick={this.changeAge.bind(this, json.familystatus)}>

                                                    <div className="left">
                                                        {
                                                            json.check == true ?
                                                                <img src={json.img1}/> :
                                                                <img src={json.img}/>
                                                        }

                                                    </div>
                                                    <div className="right">

                                                        {
                                                            json.title != '家庭' ?

                                                                <div className="one">我是{json.familystatus}</div> :
                                                                <div className="one">{json.familystatus}</div>

                                                        }

                                                        <div className="two">{json.ds}</div>

                                                    </div>
                                                </div>
                                            }):
                                            ''
                                    }


                                </div>


                            </div>


                        </div> :
                        null

                }
                <div className="addGuardian-content">
                    <div className="guanxi" onClick={this.add.bind(this)}>

                        <div className="img"><img src={chengyuan} style={{width:'100%',height:'100%'}}/></div>
                        <div className="input"><input type="text" value={this.state.familystatus} placeholder="成员关系" readOnly="readOnly"/></div>

                        <div className="select"><img src={chengyuanguanxi} style={{width:'100%',height:'100%'}}/></div>
                    </div>
                    <div className="telphone">
                        <div className="img"><img src={shoujihao} style={{width:'100%',height:'100%'}}/></div>
                        
                        <div className="input">
                            <input type="tel" onChange={this.change.bind(this)} style={{width:'100%'}}/>
                        </div>

                    </div>

                </div>


                <div className={" text-center " + this.state.bg} style={{margin:'1rem'}} onClick={this.next.bind(this,this.state.tel)}>保存</div>
            </div>
        )
    }

}


const mapStateToProps = state => {
    return {

        getGuardiansLists: state.login.getGuardiansLists,

    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getGuardianss: getGuardianss,
    }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(AddGuardian);


AddGuardian.contextTypes = {
    router: React.PropTypes.object.isRequired
};