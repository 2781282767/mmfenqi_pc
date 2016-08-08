/**
 * Created by ChinaHp on 2016/8/3.
 */
'use strict';

class R_Commerce_add extends React.Component {
    constructor() {
        super();
        this.state = {
            ProvinceList: [],
            provinceId: '',
            cityId: '',
            id: '',


            name: '',
            phone: '',
            hos: '',
            addr: '',

            msg:'',

            name_error: '',
            phone_error: '',
            hos_error: '',


            province_error:'',
            city_error:'',
            id_error:'',
            addr_error:'',
            msg_error:'',



            cityList: [],
            regionList: []

        }
    }

    query_Allprovince() {
        HttpService.query({
            url: '/pc/computer/query_Allprovince',
            success: (res=> {
                this.setState({ProvinceList: res.provinceVOList})
            })
        })
    }

    changeProvince(e) {
        this.setState({
            provinceId: e.target.value
        })
        HttpService.query({
            url: '/pc/computer/queryCity_ByProId',
            data: {proId: e.target.value},
            success: (res=> {
                this.setState({cityList: res.cityList})
            })


        })
    }

    changeCity(e) {
        this.setState({
            cityId: e.target.value
        });
        HttpService.query({
            url: '/pc/computer/queryRegion_ByCityId',
            data: {cityId: e.target.value},
            success: (res=> {
                this.setState({regionList: res.regionList})
            })


        })
    }

    changeRegion(e) {
        this.setState({
            id: e.target.value
        })

    }

    nameChange(e) {
        this.setState({
            name: e.target.value
        })
    }

    phoneChange(e) {
        this.setState({
            phone: e.target.value
        })
    }

    hosChange(e) {
        this.setState({
            hos: e.target.value
        })
    }

    msgChange(e){
        this.setState({
            msg:e.target.value
        })
    }

    addrChange(e) {
        this.setState({
            addr: e.target.value
        })
    }

    submit_(name, phone, hos, addr,provinceId,cityId,id,msg) {
        var patt= this.props.phone_regex;


        console.log(patt)


        if (!name) {
            this.setState({
                name_error: '请填写联系人'
            })
        } else {
            this.setState({
                name_error: '',
            })
        }
        if (!phone) {
            this.setState({
                phone_error: '请填写手机号'
            })
        }else if(!patt.test(phone)){
            this.setState({
                phone_error: '手机号格式错误'
            })
        } else {
            this.setState({
                phone_error: '',

            })
        }
        if (!hos) {
            this.setState({
                hos_error: '请填写医院名称'
            })
        } else {
            this.setState({
                hos_error: ''

            })
        }

        if (!provinceId) {
            this.setState({
                province_error: '请选择省市'
            })
        } else {
            this.setState({
                province_error: ''

            })
        }

        if(!cityId) this.setState({city_error:'请选择城市'});else this.setState({city_error:''});

        if(!id) this.setState({id_error:'请选择区域'});else this.setState({id_error:''});


        if(!addr) this.setState({addr_error:'请填写医院具体地址'});else this.setState({addr_error:''});

        if(!msg) this.setState({msg_error:'请填写医院简介'});else this.setState({msg_error:''})

        if(!!name&&!!phone&&hos&&!!provinceId&&!!cityId&&!!id&&!!addr&&!!msg){
            HttpService.save({
                url:'/pc/computer/addTenantCollaborationApplicationRecord',
                data:{contacts:phone,telephone:phone,hospitalName:hos,provinceId:provinceId,cityId:cityId,regionId:id,address:addr,message:msg},
                success:(res=>{
                    window.location.href='index.html';
                })
            })
        }









    }

    componentWillMount() {
        this.query_Allprovince()
    }


    render() {

        var name = this.state.name;
        var phone = this.state.phone;
        var hos = this.state.hos;
        var addr = this.state.addr;

        var id =this.state.id;
        var provinceId=this.state.provinceId;
        var cityId=this.state.cityId;

        var msg=this.state.msg;

        return (
            <div className="wrap-business">
                <div className="business-wrap-top"></div>
                <div className="business-wrap-content">
                    <div className="title"><h3>商家入驻</h3></div>
                    <div className="content">
                        <div>

                            <div>{this.state.name_error}</div>

                            <label htmlFor="one">联系人：</label>
                            <input type="text" id="one" onBlur={this.nameChange.bind(this)} placeholder="联系人姓名"/>
                        </div>

                        <div>
                            <div>{this.state.phone_error}</div>
                            <label htmlFor="two">手机号：</label>
                            <input type="text" id="two" onBlur={this.phoneChange.bind(this)} placeholder="填写您的手机号"/>
                            <div style={{color: '#33a5ff', display: 'inline-block',paddingLeft:10}}>*此电话将作为美眉分期工作人员联系您的电话</div>
                        </div>
                        <div>
                            <div>{this.state.hos_error}</div>
                            <label htmlFor="three">医院名称：</label>

                            <input type="text" id="three" onBlur={this.hosChange.bind(this)} placeholder="医院"/>
                        </div>
                        <div>
                            <div>{this.state.province_error}</div>
                            <label htmlFor="four">省份：</label>
                            <select name="province" id="province" onChange={this.changeProvince.bind(this)}>
                                <option value="" style={{fontSize:12}}>请选择</option>
                                {
                                    this.state.ProvinceList.map((option, index)=> {
                                        return (
                                            <option value={option.proid} key={index}>{option.proname}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <div>{this.state.city_error}</div>
                            <label htmlFor="five">城市：</label>
                            <select name="city" id="city" onChange={this.changeCity.bind(this)}>
                                <option value="" style={{fontSize:12}}>请选择</option>
                                {
                                    this.state.cityList.map((option, index)=> {
                                        return (
                                            <option value={option.cityid} key={index}>{option.cityname}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <div>{this.state.id_error}</div>
                            <label htmlFor="six">区域：</label>
                            <select name="region" id="region" onChange={this.changeRegion.bind(this)}>
                                <option value="" style={{fontSize:12}}>请选择</option>
                                {
                                    this.state.regionList.map((option, index)=> {
                                        return (
                                            <option value={option.id} key={index}>{option.regionName}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <div>{this.state.addr_error}</div>
                            <label htmlFor="seven">医院具体地址：</label>
                            <input type="text" id="seven" style={{width: 237}} onBlur={this.addrChange.bind(this)} placeholder="医院地址"/>
                        </div>
                        <div>
                            <div>{this.state.msg_error}</div>
                            <label htmlFor="eight" style={{float: 'left'}}>医院简介：</label>
                            <textarea placeholder="字符不超过100个字" name="textarea" id="textarea" cols="45" rows="5" onBlur={this.msgChange.bind(this)}></textarea>
                            <div style={{paddingLeft: 100, color: '#33a5ff'}}>*资料审核通过，美眉分期工作人员将会尽快联系您，请保持电话畅通。</div>
                        </div>

                        <div>
                            <div className="btn submit-btn" style={{marginLeft: 100,marginTop:20}}
                                 onClick={this.submit_.bind(this, name, phone, hos, addr,provinceId,cityId,id,msg)}>提交
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
