'use strict';
class R_MyCollects extends React.Component {

    constructor() {
        super();
        this.state = {
            currentPage: 1,
            data: [],
            goodsItemList: [],
            totalPage: '',
            totalItem:''

        };

    }

    changeIndex(currentIndex) {
        this.queryCollections(currentIndex, 1);
        window.location.href = '#top';
    }

    queryCollections(currentPage, collectionType) {
        HttpService.query({
            url: '/pc/computer/my_goods_collection',
            data: {currentPage, collectionType},
            success: (res)=> {
                console.log(res);
                this.setState({
                    data: res.data,
                    goodsItemList: res.goodsItemList,
                    totalPage: res.page.totalPage,
                    totalItem:res.page.totalItem
                })
            }
        })
    }

    cancelCollection(id) {
        HttpService.save({
            url: '/pc/computer/cancel_collection',
            data: {id: id},
            success: (res)=> {
                setTimeout(function () {
                    window.location.reload()
                },1000)
            }
        })
    }

    cancel(id) {
        this.cancelCollection(id)
    }

    componentWillMount() {
        this.queryCollections(this.state.currentPage, 1)
    }

    render() {
        var json = this.state.goodsItemList;
        console.log(json);
        return (
            <div style={{float: 'left'}}>
                <div className="wrap-content">
                    <div className="wrap-content-right">
                        <div>
                            <div className="top">
                                <ul>
                                    <li style={{color:'#fd657a',fontSize:'14px'}}>收藏商品({this.state.totalItem})</li>
                                </ul>
                            </div>
                            <div className="top-content">

                                {
                                    this.state.totalItem==0?
                                        <div className="goods-collect" style={{paddingTop:20,minHeight:400}}>亲，您暂时还没有收藏商品哦!</div>
                                        :

                                        <div className="goods-collect">
                                            <ul>
                                                {
                                                    this.state.goodsItemList.map((item, index)=> {
                                                        return (
                                                            <li key={index}>
                                                                <div className="bodyInfo">

                                                                    <div className="img">
                                                                        <img src={item.goodsItem.goodsHerPic}
                                                                             style={{width: '100%', height: '100%'}} alt=""/>
                                                                    </div>
                                                                    <div className="info">
                                                                        <div className="title"><a href={"goods-detail.html?goodsId="+item.goodsItem.goodsHerf}>{item.goodsItem.hotItemName}</a></div>
                                                                        <div className="addr">{item.goodsItem.hospitalName}</div>
                                                                        <div className="money">
                                                                            <span>￥<i>{item.goodsItem.monthlyPrice}</i></span>
                                                                            <span className="del">医院价: <del>￥{item.goodsItem.marketPrice}</del></span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="Operation">
                                                                        <a href={"goods-detail.html?goodsId="+item.goodsItem.goodsHerf}><div className="detail">查看详情</div></a>
                                                                        <div className="cancel"
                                                                             onClick={this.cancel.bind(this, item.collectionId)}>
                                                                            取消收藏
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        )
                                                    })
                                                }


                                            </ul>
                                        </div>
                                }



                            </div>
                            <Pagination changeIndex={this.changeIndex.bind(this)} numberOfPages={this.state.totalPage}/>

                        </div>


                    </div>
                </div>
            </div>
        )
    }
}

class Pagination extends React.Component {
    constructor() {
        super();
        this.state = {}
    }


    pageIndexChange(event) {
        let target = event.target;
        let index = "";
        let pageIndex = target.value;
        let pageInputIndex = target.value;
        var type = target.getAttribute("data-type");
        if (type == "link") {
            index = event.target.innerHTML;
            if (!isNaN(index)) {
                pageIndex = index;
            } else if (index == "首页") {
                pageIndex = 1;
            } else if (index == "尾页") {
                pageIndex = this.props.pageNum;
            } else if (index == "»") {
                pageIndex = parseInt(this.props.pageIndex) + 1;
            } else if (index == "«") {
                pageIndex = parseInt(this.props.pageIndex) - 1;
            }
            this.props.pageIndexChange(pageIndex);
        } else if (type == "btn-go") {
            let goIndex = document.getElementById("index-input");
            pageInputIndex = goIndex.value;
            this.props.pageIndexChange(pageInputIndex);
        } else if (type == "input") {
            return null;
        }
    }


    render() {

        var arrFirst = [];//首页和前一页
        var arrLast = [];//尾页和后一页
        var arrLinkShow = []; //每次显示的页码
        var prevDisplay = 1 == this.props.pageIndex ? 'disabled' : ''; //当前页为1时，首页和前一页失效
        var lastDisplay = this.props.pageNum == this.props.pageIndex ? 'disabled' : '';//当前页为最后一页时，尾页和后一页失效
        var startIndex = (Math.ceil(this.props.pageIndex / this.state.showLinkNum) - 1) * this.state.showLinkNum + 1;//每次显示页数的开始页
        var endIndex = Math.min(startIndex + this.state.showLinkNum, (this.props.pageNum + 1));//每次显示页数的结束页
        for (var i = startIndex; i < endIndex; i++) {
            var currentIndexDisplay = i == this.props.pageIndex ? 'active' : '';
            arrLinkShow.push(
                <li key={i} className={currentIndexDisplay}>
                    <a href="javascript:;" data-type="link">{i}</a>
                </li>
            )
        }
        arrFirst.push(
            <li key="first" className={prevDisplay}>
                <a href="javascript:;" data-type="link">首页</a>
            </li>
        );
        arrFirst.push(
            <li key="1" className={prevDisplay}>
                <a href="javascript:;" aria-label="Previous" data-type="link" id="pre">
                    «
                </a>
            </li>
        );
        arrLast.push(
            <li key="last" className={lastDisplay}>
                <a href="javascript:;" data-type="link">尾页</a>
            </li>
        );
        arrLast.push(
            <li key={this.props.pageNum} className={lastDisplay}>
                <a href="javascript:;" aria-label="Next" data-type="link" id="next">
                    »
                </a>
            </li>
        );
        return (
            <nav className="text-right" key="page">
                <ul className="pagination" onClick={this.pageIndexChange.bind(this)}>
                    {arrFirst}
                    {arrLinkShow}
                    {arrLast}
                    <li>
                        <input type="text" data-type="input" id="index-input"/>
                        <a href="javascript:;" className="btn page-go" data-type="btn-go">跳转</a>
                    </li>
                </ul>
            </nav>
        )

    }
}
