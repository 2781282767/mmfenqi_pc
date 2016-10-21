'usr strict';

import React, {Component, PropTypes} from 'react';

import ReactDOM, {render} from 'react-dom';


import {HttpService, Toast}  from'../Http';
import {R_header} from './common/index';

import tianjia from '../../src/img/guardian/tianjia.png'

import guanliyuan from '../../src/img/guardian/guanliyuan.png'
import moren from '../../src/img/guardian/moren.png'
import wo from '../../src/img/guardian/wo.png'


export default class Guardian extends Component {

    constructor(props) {
        super(props);
        this.state={
            familyList:[],
            school:[],
            member:[]
        }

    }

    componentWillMount() {

        this.getGuardianList()

    }




    syncGuardian(){
        HttpService.query({
            url:'/app/object/syncGuardian',
            data:{
                token: localStorage.appToken,
                babyid: this.props.params.babyid
            },
            success:(res=>{
                console.log(res)
            })
        })
    }


    getGuardianList() {



        HttpService.query({
            url: "/app/object/getGuardians",
            data: {
                token: localStorage.appToken,
                babyid: this.props.params.babyid
            },
            success: (res)=> {
                console.log(res);

                if (res.code == 10068) {

                    var familyList=[],school=[],member=[];


                    res.data.forEach( (item,index)=> {
                        if(item.familystatus=='家庭'||item.familystatus=='妈妈'||item.familystatus=='爸爸'){


                            if(localStorage.userid==item.guardianid){

                                item.Me=true;


                                if(item.guardianid==item.userid){
                                    item.isadmin=true;
                                    familyList.push({item})
                                }else{
                                    item.isadmin=false;
                                    familyList.push({item})
                                }

                            }else{
                                item.Me=false;
                                if(item.guardianid==item.userid){
                                    item.isadmin=true;
                                    familyList.push({item})
                                }else{
                                    item.isadmin=false;
                                    familyList.push({item})
                                }
                            }





                            this.setState({
                                familyList:familyList
                            });



                            // console.log(localStorage.familyList)
                        }else if(item.familystatus=='班主任'){




                            if(localStorage.userid==item.guardianid) {

                                item.Me = true;

                                if (item.guardianid == item.userid) {
                                    item.isadmin = true;
                                    school.push({item})
                                } else {
                                    item.isadmin = false;
                                    school.push({item})
                                }


                            }else{
                                item.Me = false;

                                if (item.guardianid == item.userid) {
                                    item.isadmin = true;
                                    school.push({item})
                                } else {
                                    item.isadmin = false;
                                    school.push({item})
                                }

                                }


                            this.setState({
                                school:school
                            })


                        }else{



                            if(localStorage.userid==item.guardianid) {

                                item.Me = true;

                                if (item.guardianid == item.userid) {
                                    item.isadmin = true;
                                    member.push({item})
                                } else {
                                    item.isadmin = false;
                                    member.push({item})
                                }


                            }else{
                                item.Me = false;

                                if (item.guardianid == item.userid) {
                                    item.isadmin = true;
                                    member.push({item})
                                } else {
                                    item.isadmin = false;
                                    member.push({item})
                                }

                            }


                           this.setState({
                               member:member
                           })

                        }
                    })

                }
            }
        })
    }

    render() {

        const {familyList,school,member} =this.state;

        console.log(familyList)


        return (
            <div className="guardian" style={{background: '#eee', minHeight: '100%'}}>
                <R_header title="监护成员" left="1"/>
                <div className="container" style={{padding: 0}}>
                    <div className="row" style={{margin: '0'}}>
                        <div className="col-xs-12 text-left title">家庭成员</div>
                    </div>
                    {
                        !!familyList?
                            familyList.map((json,index)=>{
                                return (
                                    <div key={index} className="row app-white-inline" style={{margin: '0'}}>
                                        <div className="col-xs-6 text-left setp1">
                                            {
                                                !!json.item.headimg?
                                                    <img src={"/media" + json.item.headimg} style={{width:'2.5rem',height:'2.5rem',borderRadius:'50%'}}/>:
                                                    <img src={moren} style={{width:'2.5rem',height:'2.5rem',borderRadius:'50%'}}/>
                                            }
                                            &nbsp;{json.item.familystatus}&nbsp;
                                            {
                                                json.item.isadmin==true?
                                                    <img src={guanliyuan} style={{width:'1.2rem',height:'1.5rem'}}/>:
                                                    json.item.Me==true?
                                                        <img src={wo} style={{width:'1.2rem',height:'1.2rem'}}/>:
                                                        ''
                                            }
                                        </div>
                                        <div className="col-xs-6 text-right setp2">{json.item.telephone.substr(0, 3) + '****' + json.item.telephone.substr(7, 11)}</div>
                                    </div>
                                )
                            }):''
                    }


                </div>


                <div className="container" style={{padding: 0}}>
                    <div className="row" style={{margin: '0'}}>
                        <div className="col-xs-12 text-left title">学校监管</div>
                    </div>
                    {
                        !!school?
                            school.map((json,index)=>{
                                return (
                                    <div key={index} className="row app-white-inline" style={{margin: '0'}}>
                                        <div className="col-xs-6 text-left setp1">

                                            {
                                                !!json.item.headimg?
                                                    <img src={"/media" + json.item.headimg} style={{width:'2.5rem',height:'2.5rem',borderRadius:'50%'}}/>:
                                                    <img src={moren} style={{width:'2.5rem',height:'2.5rem',borderRadius:'50%'}}/>
                                            }
                                            &nbsp;{json.item.familystatus}&nbsp;
                                            {
                                                json.item.isadmin==true?
                                                    <img src={guanliyuan} style={{width:'1.2rem',height:'1.5rem'}}/>:
                                                    json.item.Me==true?
                                                        <img src={wo} style={{width:'1.2rem',height:'1.2rem'}}/>:
                                                        ''
                                            }
                                        </div>
                                        <div className="col-xs-6 text-right setp2">{json.item.telephone.substr(0, 3) + '****' + json.item.telephone.substr(7, 11)}</div>
                                    </div>
                                )
                            }):''
                    }
                </div>

                <div className="container" style={{padding: 0}}>
                    <div className="row" style={{margin: '0'}}>
                        <div className="col-xs-12 text-left title">家庭成员</div>
                    </div>
                    {
                        !!member?
                            member.map((json,index)=>{
                                return (
                                    <div key={index} className="row app-white-inline" style={{margin: '0'}}>
                                        <div className="col-xs-6 text-left setp1">
                                            {
                                                !!json.item.headimg?
                                                    <img src={"/media" + json.item.headimg} style={{width:'2.5rem',height:'2.5rem',borderRadius:'50%'}}/>:
                                                    <img src={moren} style={{width:'2.5rem',height:'2.5rem',borderRadius:'50%'}}/>
                                            }

                                            &nbsp;{json.item.familystatus}&nbsp;
                                            {
                                                json.item.isadmin==true?
                                                    <img src={guanliyuan} style={{width:'1.2rem',height:'1.5rem'}}/>:
                                                    json.item.Me==true?
                                                        <img src={wo} style={{width:'1.2rem',height:'1.2rem'}}/>:
                                                        ''
                                            }
                                        </div>
                                        <div className="col-xs-6 text-right setp2">{json.item.telephone.substr(0, 3) + '****' + json.item.telephone.substr(7, 11)}</div>
                                    </div>
                                )
                            }):''
                    }

                    <div className="row app-white-inline" style={{margin: '0'}}>
                        <div className="col-xs-10 text-left setp1"><img src={tianjia} style={{width:'2.2rem',height:'2.2rem'}}/>&nbsp;<span >添加监护成员 <span style={{color:'#999'}}>(最多6人)</span></span></div>

                    </div>

                </div>

                <div onClick={this.syncGuardian.bind(this)} style={{position:'fixed',bottom:'1rem',width:'100%',padding:'0 1rem'}}>
                    <div className="app-pink-radius-button text-center">激活</div>
                </div>

            </div>
        )
    }
}