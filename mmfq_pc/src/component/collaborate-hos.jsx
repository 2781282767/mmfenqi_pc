/**
 * Created by ChinaHp on 2016/8/3.
 */
'use strict';
class R_Coll_hos extends React.Component {

    constructor() {
        super();
        this.state = {
            ProvinceList: [],
            cityList: [],
            proviceId: '',
            hospitalList:[]
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

    componentDidMount() {
        this.query_Allprovince()
    }

    handleMouseout(id) {
        console.log(id);

        this.setState({
            proviceId: id
        });
        HttpService.query({
            url: '/pc/computer/queryCity_ByProId',
            data: {proId: id},
            success: (res=> {
                console.log(res);
                this.setState({cityList: res.cityList})
            })


        })

    }

    handleClick(id){


        HttpService.query({
            url: '/pc/computer/queryHospitalByCityIdPage',
            data: {cityId: id,currentPage:1},
            success: (res=> {
                console.log(res);
                this.setState({hospitalList: res.hospitalList})
            })


        })


    }

    render() {

        var nodes = this.state.ProvinceList.map(function (item, index) {
            return (

                <li key={index}>


                    <span>{item.proname}</span>


                    <div className="itemCity">
                    {
                        this.state.ProvinceList[index].cityList.map(function (item, index2) {
                        return (

                        <span key={index2} onClick={this.handleClick.bind(this,item.cityid)}>{item.cityname}</span>

                        )
                    }.bind(this))
                    }
                    </div>
                    </li>
            )
        }.bind(this))


        return (
            <div className="wrap-hos">
                <div className="Allprovince">
                    <div className="_left">
                        <div>
                            地区:
                        </div>
                    </div>
                    <div className="right">
                        <ul>

                                {nodes}

                            {/*{*/}
                            {/*this.state.ProvinceList.map((json, index)=> {*/}
                            {/*return (*/}


                            {/*<li key={index}>*/}
                            {/*<div className="itemsss" onMouseOver={this.handleMouseout.bind(this,json.proid)}>*/}

                            {/*<em style={{display:'inline-block'}}>{json.proname}</em>*/}



                            {/*</div>*/}


                            {/*<div className="itemCity">*/}
                            {/*{nodes}*/}
                            {/*</div>*/}
                            {/*</li>*/}
                            {/*)*/}
                            {/*})*/}
                            {/*}*/}
                        </ul>
                    </div>
                </div>

                <div className="provinceContent">
                    <div className="c_left">
                        <img src="" alt=""/>
                    </div>
                    <div className="c_right">
                        <p>ssss</p>
                        <div className="c_div">
                            ssss
                        </div>
                        <div className="c_addr">
                            地址:
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
