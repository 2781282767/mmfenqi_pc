'usr strict';

import React, {Component, PropTypes} from 'react';

import ReactDOM, {render} from 'react-dom';


import {Router, Route, IndexRoute, browserHistory, Link} from 'react-router';


import {HttpService, Toast,Md5}  from'../Http';
import {R_header_fixed} from './common/index';

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
            member:[],
            allList:[],
            hasJ:false,

            guardianid:'',

            classleft1:{
                width:'100%',
            },
            classright1:{
                width:'0',
            }
        };

        this.startx='';
        this.starty='';
        this.contentwidth='';






    }

    componentWillMount() {

        this.getGuardianList();


        JIM.init();
        const _appkey="beccc651f7d0cdb713228d17";
        const secret="e7318ff1a9b0389c75672506";

        const _timestamp="1470042476";

        const _random_str="022cd9fd995849b58b3ef0e943421ed9";


        //const  signature = Md5.MD5(_appkey&_timestamp&_randomStr&_secret);

        const signature = Md5.MD5(_appkey &  _timestamp &  _random_str &  secret);

        console.log(signature);

        JIM.register('15925647870', '000000', {
            "appkey": "beccc651f7d0cdb713228d17",
            "random_str": "022cd9fd995849b58b3ef0e943421ed9",
            "signature": signature,
            "timestamp": "1470042476"
        }, function (data) {
            console.log(data)
        });


        JIM.login('15925647870', '000000', {
            "appkey": "beccc651f7d0cdb713228d17",
            "random_str": "022cd9fd995849b58b3ef0e943421ed9",
            "signature": signature,
            "timestamp": "1467967210887"
        },function (data) {

            console.log(data)

        },function (ack) {


            console.log(ack)

        },function (timeout) {

            console.log(timeout)

        });

    }




    syncGuardian(){
        HttpService.query({
            url:'/app/object/syncGuardian',
            data:{
                token: localStorage.appToken,
                babyid: this.props.params.babyid
            },
            success:(res=>{
                console.log(res);

                //JIM.getConversations(this.ack, this.timeout);
            })
        })
    }



    getGuardianList() {

        var self=this;



        HttpService.query({
            url: "/app/object/getGuardians",
            data: {
                token: localStorage.appToken,
                babyid: this.props.params.babyid
            },
            success: (res)=> {
                console.log(res);

                if (res.code == 10068) {

                    var familyList=[],school=[],member=[],allList=[];


                    allList=res.data;

                    var temp={
                        familystatus:'家庭',
                        guardianid:'',
                        telephone:''

                    };

                    var temp2={
                        familystatus:'妈妈',
                        guardianid:'',
                        telephone:''

                    };


                    var temp3={
                        familystatus:'爸爸',
                        guardianid:'',
                        telephone:''

                    };

                    var temp4={
                        familystatus:'班主任',
                        guardianid:'',
                        telephone:''

                    };



                    if(!allList.some(d=>d.familystatus===temp.familystatus)){
                        allList.push(temp)
                    }
                    if(!allList.some(s=>s.familystatus===temp2.familystatus)){
                        allList.push(temp2)
                    }
                    if(!allList.some(a=>a.familystatus===temp3.familystatus)){
                        allList.push(temp3)
                    }
                    if(!allList.some(b=>b.familystatus===temp4.familystatus)){
                        allList.push(temp4)
                    }




                    console.log(allList)







                    allList.forEach( (item,index)=> {

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


                            if(item.Me==true&&item.isadmin==true){
                                this.setState({
                                    hasJ:true,
                                    guardianid:item.guardianid
                                })
                            }



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
                            });

                            if(item.Me==true&&item.isadmin==true){
                                this.setState({
                                    hasJ:true,
                                    guardianid:item.guardianid
                                })
                            }


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
                           });


                            if(item.Me==true&&item.isadmin==true){
                                this.setState({
                                    hasJ:true,
                                    guardianid:item.guardianid

                                })
                            }else{}

                        }
                    });

                }
            }
        })
    }


    TouchStart(index,param1,param2,step,e){





        if(!this.state.hasJ){
            // document.getElementById(step).addEventListener('touchstart', function (event) {
            //     event.preventDefault();
            // }, false);

            return;
        }

        var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)

        this.startx = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser

        this.starty=parseInt(touchobj.clientY);
        this.contentwidth=document.getElementById(step).offsetWidth-1;

    }

    TouchMoves(index,param1,param2,step,e){




        const contentwidth=this.contentwidth;



        var self=this;

        var touchobj = e.changedTouches[0]; // reference first touch point for this event

        const itemstyle=document.getElementById(param1+index).style;
        const deletestyle=document.getElementById(param2+index).style;

        var dist = parseInt(touchobj.clientX) - this.startx;


        var numRange = 5;
        if(this.starty - touchobj.clientY >numRange||this.starty - touchobj.clientY ==numRange){
            console.log('上')

        }else if(this.starty - touchobj.clientY < -numRange) {
            console.log('下')

        }else{
            if(dist<0){

                if(parseInt(-dist)>parseInt(contentwidth/4)||parseInt(-dist)==parseInt(contentwidth/4)) {

                    console.log('业了');

                    self.setState({
                        classleft1: {
                            width: contentwidth-parseInt(contentwidth/4),
                            transition:'all 1s ease-in',

                        },
                        classright1: {
                            width: parseInt(contentwidth/4),
                            transition:'all 1s ease-in',

                        }
                    });

                    itemstyle.width=self.state.classleft1.width+'px';


                    itemstyle.transition=self.state.classleft1.transition;


                    deletestyle.width=self.state.classright1.width+'px';
                    deletestyle.transition=self.state.classright1.transition;



                }else if(parseInt(-dist)<30){


                    console.log('ddd'+parseInt(-dist));

                    var leftWidth = contentwidth + dist;


                    self.setState({
                        classleft1: {
                            width: leftWidth,
                            transition:'ease-out'
                        },
                        classright1: {
                            width: parseInt(-dist),
                            transition:'ease-out'

                        }
                    });


                    itemstyle.width=self.state.classleft1.width+'px';

                    itemstyle.transition=self.state.classleft1.transition;


                    deletestyle.width=self.state.classright1.width+'px';
                    deletestyle.transition=self.state.classright1.transition;

                }


            }


            e.preventDefault();
        }







    }

    TouchEnd(index,param1,param2,step,e){


        const contentwidth=this.contentwidth;



        var self=this;

        var touchobj = e.changedTouches[0]; // reference first touch point for this event

        const itemstyle=document.getElementById(param1+index).style;
        const deletestyle=document.getElementById(param2+index).style;

        var numRange = 5;
        if(this.starty - touchobj.clientY >numRange||this.starty - touchobj.clientY ==numRange){
            console.log('上')

        }else if(this.starty - touchobj.clientY < -numRange){
            console.log('下')

        }else{
            if(this.startx-touchobj.clientX<30) {


                self.setState({
                    classleft1: {
                        width: contentwidth,

                        transition:'all 1s ease-out',

                    },
                    classright1: {
                        width: '0',
                        transition:'all 1s ease-out',


                    }
                });


                itemstyle.width=contentwidth+'px';

                itemstyle.transition=self.state.classleft1.transition;


                deletestyle.width=0+'px';
                deletestyle.transition=self.state.classright1.transition;
            }else{




                self.setState({
                    classleft1: {
                        width: contentwidth-parseInt(contentwidth/4),
                        transition: 'ease-in'
                    },
                    classright1: {
                        width: parseInt(contentwidth/4),
                        transition: 'ease-in'

                    }
                });





                itemstyle.width=contentwidth-parseInt(contentwidth/4)+'px';

                itemstyle.transition=self.state.classleft1.transition;


                deletestyle.width=parseInt(contentwidth/4)+'px';
                deletestyle.transition=self.state.classright1.transition;
            }
        }


    }

    delete(index,id){
        HttpService.query({
            url:'/app/object/cancelBaby2',
            data:{
                token: localStorage.appToken,
                babyid: this.props.params.babyid,
                guardianid:id
            },
            success:(res=>{
                if(res.code=='10112'){
                    var node=document.getElementById('item'+index);

                    //console.log(node)

                    node.parentNode.remove()
                }else{
                    Toast.toast(res.msg,3000)
                }
            })
        })
    }

    goto(hasJ,tel,familystatus){


        if(hasJ&&tel==''){
            window.location.href = '/#/AddGuardian/'+this.props.params.babyid+'/'+this.state.guardianid+'/'+familystatus;
        }else{
            return
        }
    }

    render() {

        const {familyList,school,member,guardianid} =this.state;


        console.log(guardianid);


        return (
            <div className="guardian" style={{background: '#eee', minHeight: '100%',paddingTop:'4rem'}}>
                <R_header_fixed title="监护成员" left="1"/>
                <div className="container" style={{padding: 0}}>
                    <div className="row" style={{margin: '0'}}>
                        <div className="col-xs-12 text-left title">家庭成员</div>
                    </div>
                    {
                        !!familyList?
                            familyList.map((json,index)=>{
                                return (
                                    <div key={index} style={{height:'4rem',overflow:'hidden'}} id="one">


                                        <div  className="row app-white-inline class1" id={'__item'+index}


                                              onTouchStart={this.TouchStart.bind(this,index,'__item','__delete','one')}

                                              onTouchMove={this.TouchMoves.bind(this,index,'__item','__delete','one')}

                                              onTouchEnd={this.TouchEnd.bind(this,index,'__item','__delete','one')}

                                        >
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
                                                    ''

                                            }
                                            &nbsp;

                                            {
                                                json.item.Me==true?
                                                    <img src={wo} style={{width:'1.2rem',height:'1.2rem'}}/>:
                                                    ''
                                            }
                                        </div>
                                        {
                                            <div className="col-xs-6 text-right setp2" onClick={this.goto.bind(this,this.state.hasJ,json.item.telephone,json.item.familystatus)}>
                                                {
                                                    !!json.item.telephone?
                                                        <span>{json.item.telephone.substr(0, 3) + '****' + json.item.telephone.substr(7, 11)}</span>:
                                                        '空'

                                                }


                                                {
                                                    !!json.item.Me?
                                                        '>':
                                                        ''
                                                }
                                                &nbsp;
                                                {
                                                    !!this.state.hasJ&&json.item.telephone==''?
                                                        '>':
                                                        ''

                                                }

                                            </div>
                                        }
                                        </div>

                                        <div id={'__delete'+index}  className="row app-white-inline class2">
                                            <div className="col-xs-12 text-center" onClick={this.delete.bind(this,index,json.item.guardianid)}>解除绑定

                                            </div>
                                        </div>

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
                                    <div key={index} style={{height:'4rem',overflow:'hidden'}} id="two">


                                        <div  className="row app-white-inline class1" id={'_item'+index}


                                              onTouchStart={this.TouchStart.bind(this,index,'_item','_delete','two')}

                                              onTouchMove={this.TouchMoves.bind(this,index,'_item','_delete','two')}

                                              onTouchEnd={this.TouchEnd.bind(this,index,'_item','_delete','two')}

                                        >

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
                                                           ''
                                                    }

                                                    &nbsp;
                                                    {
                                                        json.item.Me==true?
                                                            <img src={wo} style={{width:'1.2rem',height:'1.2rem'}}/>:
                                                            ''
                                                    }
                                                </div>
                                                <div className="col-xs-6 text-right setp2" onClick={this.goto.bind(this,this.state.hasJ,json.item.telephone,json.item.familystatus)}>
                                                    {
                                                        !!json.item.telephone?
                                                            <span>{json.item.telephone.substr(0, 3) + '****' + json.item.telephone.substr(7, 11)}</span>:

                                                                    '空'

                                                    }



                                                    &nbsp;

                                                    {
                                                        !!json.item.Me?
                                                            '>':
                                                            ''
                                                    }
                                                    {
                                                        !!this.state.hasJ&&json.item.telephone==''?
                                                            '>':
                                                            ''
                                                    }
                                                </div>
                                            </div>

                                        <div id={'_delete'+index}  className="row app-white-inline class2">
                                            <div className="col-xs-12 text-center" onClick={this.delete.bind(this,index,json.item.guardianid)}>解除绑定

                                            </div>
                                        </div>
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
                                    <div key={index} style={{height:'4rem',overflow:'hidden'}} id="three">
                                        <div  className="row app-white-inline class1" id={'item'+index}


                                                onTouchStart={this.TouchStart.bind(this,index,'item','delete','three')}

                                                onTouchMove={this.TouchMoves.bind(this,index,'item','delete','three')}

                                               onTouchEnd={this.TouchEnd.bind(this,index,'item','delete','three')}

                                               >
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
                                                        ''
                                                }
                                                &nbsp;
                                                {
                                                    json.item.Me==true?
                                                        <img src={wo} style={{width:'1.2rem',height:'1.2rem'}}/>:
                                                        ''
                                                }
                                            </div>
                                            <div className="col-xs-6 text-right setp2">

                                                {
                                                    !!json.item.telephone?
                                                        <span>{json.item.telephone.substr(0, 3) + '****' + json.item.telephone.substr(7, 11)}</span>:

                                                        '空'

                                                }




                                                &nbsp;


                                                {
                                                    !!json.item.Me?
                                                        '>':
                                                        ''
                                                }
                                                {
                                                    !!this.state.hasJ&&json.item.telephone==''?
                                                        '>':
                                                        ''
                                                }
                                            </div>
                                        </div>

                                        <div id={'delete'+index}  className="row app-white-inline class2">
                                            <div className="col-xs-12 text-center" onClick={this.delete.bind(this,index,json.item.guardianid)}>解除绑定

                                            </div>
                                        </div>

                                    </div>



                                )
                            }):''
                    }

                    {
                        !!this.state.hasJ?
                            <Link to={'/AddGuardian/'+this.props.params.babyid+'/'+guardianid+'/'+'null'}><div className="row app-white-inline" style={{margin: '0'}}>
                                <div className="col-xs-10 text-left setp1"><img src={tianjia} style={{width:'2.2rem',height:'2.2rem'}}/>&nbsp;<span >添加监护成员 <span style={{color:'#999'}}>(最多6人)</span></span></div>
                            </div></Link>:
                            ''
                    }

                </div>

                <div onClick={this.syncGuardian.bind(this)} style={{position:'fixed',bottom:'1rem',width:'100%',padding:'0 1rem'}}>
                    <div className="app-pink-radius-button text-center">向设备同步监护成员信息</div>
                </div>

            </div>
        )
    }
}