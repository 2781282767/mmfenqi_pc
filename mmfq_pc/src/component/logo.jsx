/**
 * Created by sheldon on 2016/7/8.
 */
'use strict';

class R_Logo extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            searchValue: this.props.search
        }
    }

    changeValue(event){
        this.setState({
            searchValue: event.target.value
        })
    }

    search(e) {
        e.preventDefault();
        console.log(this.state.searchValue);
        window.open('goods-list.html?search='+this.state.searchValue);
    }
    componentWillReceiveProps(){
        setTimeout( function () {
            this.setState({
                searchValue:this.props.search
            })
        }.bind(this),0)

    }


    render() {
        return (
            <div className="bg-logo">
                <div className="head-wrap">
                    <div className="city">
                        <a title="美眉分期" href="index.html"
                           style={{background: 'url("../static/images/common/logo.png") no-repeat'}}
                           className="logo"></a>
                    </div>
                    <div className="ym-search">
                        <div className="search-box">
                            <form  onSubmit={this.search.bind(this)}>
                                <input id="searchWd" style={{color:'black'}} className="search" data-type="tao" onChange={this.changeValue.bind(this)} value={this.state.searchValue} type="text" placeholder="轮廓锁的美 还能巨补水"/>
                                <input value="搜索" type="submit" id="YMsearch"
                                       className="search-btn" />
                            </form>
                        </div>
                        <ul className="search-list">
                            <li data-type=""><a href="http://so.yuemei.com/reviewsall//"
                                                target="_blank"><span></span></a></li>
                        </ul>
                        <div className="hotItem clearfix">
                            <a target="_blank" href="goods-list.html?search=玻尿酸">玻尿酸</a>
                            <a target="_blank" href="goods-list.html?search=美白针">美白针</a>
                            <a target="_blank" href="goods-list.html?search=双眼皮">双眼皮</a>
                            <a target="_blank" href="goods-list.html?search=吸脂">吸脂</a>
                            <a target="_blank" href="goods-list.html?search=水光针">水光针</a>
                            <a target="_blank" href="goods-list.html?search=瘦脸针">瘦脸针</a>
                        </div>
                    </div>
                    <a className="App" href="my-bill.html" target="_blank">
                        <img src="../static/images/money.png" style={{position:'absolute'}}/>
                        <div style={{marginTop:'40px',marginLeft:'90px'}} className="money-tips"></div>
                    </a>
                </div>
            </div>
        )
    }
}
