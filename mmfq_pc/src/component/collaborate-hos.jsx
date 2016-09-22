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
            hospitalList: [],

            conditions: {},
            currentIndex:-1,
            index:1,//总页码
            currentPage:1,

            cityId:'',

            proid:''
        };
        this.removeConditionListers = []
    }

    query_Allprovince() {
        HttpService.query({
            url: '/pc/computer/query_Allprovince',
            success: (res=> {
                this.setState({ProvinceList: res.provinceVOList})
            })
        })
    }

    merge(obj1, obj2) {
        var obj3 = {};
        for (var attr in obj1) {
            obj3[attr] = obj1[attr];
        }
        for (var attr in obj2) {
            obj3[attr] = obj2[attr];
        }
        return obj3;
    }

    onFilterChange(key, value) {
        if(value=='不限'){
            this.setState({
                conditions: {},
                currentPage:1
            });
            this.queryHosByCityId('',this.state.currentPage);
            return;
        }
        var obj = {};
        obj[key] = value;
        this.setState({conditions: obj});

        setTimeout(function () {
            console.log(this.state.conditions)
        }.bind(this), 0)
    }


    addRemoveConditionListener(cb) {
        this.removeConditionListers.push(cb)
    }

    /*删除*/

    onConditionsChanged(key, value) {
        this.removeConditionListers.forEach(function (item) {
            item(key, value);
        });
    }


    setQueryCondition(key, name, value) {
        if (!this.queryCondition[key]) {
            this.queryCondition[key] = {}
        }
        this.queryCondition[key]['name'] = name;
        this.queryCondition[key]['value'] = value;
        this.handleClick();
        console.log(this.queryCondition[key])
    }

    clearQueryCondition(key, value) {

        this.setState({
            conditions:{},
            currentPage:1
        });

        this.queryHosByCityId('',this.state.currentPage)

    }
    componentDidMount() {
        // this.addRemoveConditionListener(function (key, value) {
        //
        // }.bind(this));
        //
        // this.setState({currentIndex: -1});
    }

    handleClick(index,id, name,proid) {
        this.setState({
            currentIndex: index,
            cityId:id,
            proid:proid
        });

        this.onFilterChange(id, name);
        this.queryHosByCityId(id,this.state.currentPage)

    }

    queryHosByCityId(id,currentPage){
        HttpService.query({
            url: '/pc/computer/queryHospitalByCityIdPage',
            data: {cityId: id, currentPage: currentPage},
            success: (res=> {
                console.log(res);
                this.setState({
                    hospitalList: res.hospitalList,
                    index: res.page.totalPage
                })
            })
        })
    }

    componentWillMount() {
        this.query_Allprovince();
        this.queryHosByCityId('',this.state.currentPage)
    }

    changeIndex(currentPage){
        this.queryHosByCityId(this.state.cityId,currentPage);
        window.location.href = '#top';
    }

    render() {
        console.log(this.state.ProvinceList);
        var HospitalList = this.state.hospitalList;
        var nodes = this.state.ProvinceList.map(function (item, index) {
            var style = { cursor: 'pointer'};

            if (item.proid == this.state.proid) {
                style = {
                    cursor: 'pointer',
                    color: 'rgb(233,113,125)'
                };
            }

            return (
                <li key={index}>
                    <span style={style}>{item.proname}</span>
                    <div className="itemCity">
                        {
                            this.state.ProvinceList[index].cityList.map(function (item, index2) {

                                return (
                                    <span  key={index2} onClick={this.handleClick.bind(this,index2, item.cityid, item.cityname,item.proid)}>{item.cityname}</span>
                                )
                            }.bind(this))
                        }
                    </div>
                </li>
            )
        }.bind(this));
        return (
            <div className="wrap-hos">
                <div className="Allprovince">
                    <div style={{margin:'10px 20px'}}>
                        <div className="_left">
                            <div>
                                地区:
                            </div>
                        </div>
                        <div className="right">
                            <ul>
                                <li><span style={this.state.currentIndex==-1 ? {
                                    cursor: 'pointer',
                                    color: 'rgb(233,113,125)'
                                } : {cursor: 'pointer'}} onClick={this.handleClick.bind(this,-1,'','不限')}>不限</span>
                                </li>
                                {nodes}
                            </ul>
                        </div>
                    </div>

                    <Conditions cxt={this} conditions={this.state.conditions}/>
                </div>
                <div className="provinceContent">
                    {
                        this.state.hospitalList.map(function (item, index) {
                            return (
                                <div className="info" key={index}>
                                    {/*<div className="c_left" style={{  background: 'url('+item.pic+')',*/}
                                        {/*minWidth: 170,*/}
                                        {/*backgroundPosition: 'center center'}}>*/}
                                    {/*</div>*/}
                                    <div className="c_left">
                                        <img src={item.pic}/>
                                    </div>
                                    <div className="c_right">
                                        <p>{item.hosName}</p>
                                        <div className="c_div">
                                            {item.introduction}
                                        </div>
                                        <div className="c_addr">
                                            地址:{item.address}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>


                <Pagination cxt={this} numberOfPages={this.state.index} style={{display:this.state.index==0?'none':'block'}}/>

            </div>
        )
    }
}


class Conditions extends React.Component {
    onConditionsChange(key, value) {
        return function () {
            this.props.cxt.clearQueryCondition(key, value)
        }.bind(this);
    }

    render() {
        var items = [];

        for (var key in this.props.conditions) {
            if (this.props.conditions[key] != '') {
                items.push({key: key, value: this.props.conditions[key]});
            }
        }
        var nodes = items.map(function (item, index) {
            var style = {
                display: 'inline-block',
                padding: '2px',
                paddingLeft: '8px',
                paddingRight: '8px',
                border: '1px solid rgb(233,113,125)',
                color: 'rgb(233,113,125)',
                cursor: 'pointer'
            };
            if (index > 0) {
                style = {
                    display: 'inline-block',
                    padding: '2px',
                    paddingLeft: '8px',
                    paddingRight: '8px',
                    border: '1px solid rgb(233,113,125)',
                    color: 'rgb(233,113,125)',
                    cursor: 'pointer',
                    marginLeft: '5px'
                };
            }
            return (
                <span key={item + ' ' + index} style={style}
                      onClick={this.onConditionsChange(item.key, item.value)}>{item.value}&nbsp;&nbsp;&nbsp;&nbsp;
                    X</span>
            );
        }.bind(this));

        return (
            <div style={{margin: '20px',borderTop:'1px solid #ddd',padding:'7px  0',clear:'both'}}>
                <div style={{width: '5%', float: 'left'}}>
                    <span
                        style={{
                            display: 'inline-block',
                            padding: '4px',
                            paddingLeft: '0px',
                            color: '#a4a4a4'
                        }}>条件</span>
                </div>
                <div style={{width: '95%', float: 'left'}}>
                    {nodes}
                </div>
                {/*<div style={{clear: 'both'}}></div>*/}
            </div>
        )
    }


}


var Pagination = React.createClass({
    getInitialState: function () {
        return {
            currentPage: 0
        }
    },

    getDefaultProps: function () {
        return {
            maxNumberOfDisplayPages: 10,
            numberOfPages: 20,
            onPage: function (page) {
                console.log(page)
            }.bind(this)
        }
    },

    firstPage: -1,
    lastPage: -1,

    onPage: function (page) {
        return function () {
            if (page >= 0 && page < this.props.numberOfPages) {
                this.props.cxt.changeIndex(page + 1);
                this.setState({currentPage: page});
            }
        }.bind(this);
    },

    goto: function () {
        var page = parseInt(this.refs.pageInput.value - 1);
        this.onPage(page)();
    },

    render: function () {
        if (this.firstPage == -1
            || this.lastPage == -1
            || Math.abs(this.state.currentPage - this.firstPage) < 1
            || Math.abs(this.state.currentPage - this.lastPage) < 1
            || this.state.currentPage < this.firstPage
            || this.state.currentPage > this.lastPage) {
            this.firstPage = this.state.currentPage - parseInt(this.props.maxNumberOfDisplayPages / 2);
            if (this.firstPage < 0) {
                this.firstPage = 0;
            }

            this.lastPage = this.firstPage + this.props.maxNumberOfDisplayPages;
            if (this.lastPage > this.props.numberOfPages - 1) {
                this.lastPage = this.props.numberOfPages - 1;
            }

            if (this.lastPage - this.firstPage + 1 < this.props.maxNumberOfDisplayPages) {
                this.firstPage = this.lastPage - this.props.maxNumberOfDisplayPages + 1;
                if (this.firstPage < 0) {
                    this.firstPage = 0;
                }
            }
        }
        var pages = [];
        pages.push({text: "首页", page: 0});
        pages.push({text: '上一页', page: this.state.currentPage - 1});
        for (var page = this.firstPage; page <= this.lastPage; page++) {
            var text = page + 1;
            if (page == this.firstPage && this.firstPage > 0) {
                text = '...';
            }

            if (page == this.lastPage && this.lastPage < this.props.numberOfPages - 1) {
                text = '...';
            }

            pages.push({text: text, page: page});
        }
        pages.push({text: '下一页', page: this.state.currentPage + 1});
        pages.push({text: '最后一页', page: this.props.numberOfPages - 1});

        var nodes = pages.map(function (item, index) {
            var style = {
                marginRight: '4px',
                textAlign: 'center',
                minWidth: '30px',
                cursor: 'pointer',
                display: 'inline-block',
                border: '1px solid #f3f3f3',
                backgroundColor: 'rgb(248,249,250)',
                padding: '4px'
            };
            if (item.page == this.state.currentPage && parseInt(item.text) == item.page + 1) {
                style = {
                    backgroundColor: 'rgb(233,113,125)',
                    marginRight: '4px',
                    textAlign: 'center',
                    minWidth: '30px',
                    cursor: 'pointer',
                    display: 'inline-block',
                    color: 'white',
                    border: '1px solid #f3f3f3',
                    padding: '4px'
                };
            }
            return (
                <span onClick={this.onPage(item.page)} key={item + ' ' + index} style={style}>{item.text}</span>
            )
        }.bind(this));
        return (
            <div style={{display:this.props.numberOfPages==0?'none':'block'}}>
                {nodes}
                <span>&nbsp;&nbsp;共{this.props.numberOfPages}页</span>
                <span>&nbsp;&nbsp;转到&nbsp;&nbsp;</span>
                <input ref="pageInput"
                       type="text"
                       style={{cursor: 'pointer',
                           textAlign: 'center',
                           backgroundColor: 'rgb(248,249,250)',
                           border: '1px solid #f3f3f3',
                           width: '45px',
                           padding: '4px'}}/>
                <span>&nbsp;&nbsp;页&nbsp;&nbsp;</span>
                <input type="button"
                       onClick={this.goto}
                       value="确定"
                       style={{backgroundColor:'rgb(233,113,125)', color: 'white', border: '0px solid transparent',padding:'12px'}}/>
            </div>
        )
    }
});
