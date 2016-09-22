/**
 * Created by sheldon on 2016/7/11.
 */
'use strict';

class R_Footer extends React.Component {
    render() {
        return (
            <div>
                <div className="faith">
                    <div className="ym-wrap">
                        <img src="../static/images/common/sub-logo.png"/>
                    </div>
                </div>
                <div className="ym-footer">
                    <div className="ym-info">
                        <div className="foot-wrap">
                            <div className="ym-logo">
                                <div><span>美眉分期</span></div>
                                <p>美眉分期是杭州优呗网络科技有限公司旗下网站，国内首家
                                    女性消费金融平台，公司成立于2015年5月，总部位于杭州
                                    市 西湖区文三路金融圈，是面向在校女大学生提供微整形的服务平台
                                </p>
                            </div>
                            <div className="ym-about">
                                <dl>
                                    <dt style={{marginLeft:5}}>公司</dt>
                                    <dd ><a href="about.html?state=3" rel="nofollow">联系我们</a></dd>
                                    <dd style={{borderRight:'1px solid #999'}}><a href="about.html?state=4"
                                                                                  rel="nofollow">加入我们</a></dd>
                                    <dd><a href="about.html?state=1" rel="nofollow">关于我们</a></dd>
                                </dl>
                                <dl style={{marginLeft:70}}>
                                    <dt style={{marginLeft: -6}}>商务合作</dt>
                                    <dd><a href="business.html">合作方式</a></dd>
                                    <dd style={{marginTop: 40}}><a href="collaborate-hos.html">合作医院</a></dd>
                                </dl>
                            </div>
                            <div className="ym-public">
                                <div className="ym-wx">
                                    <div style={{marginLeft: 2,marginBottom: 10}}>美眉分期APP</div>
                                    <img
                                        src="../static/images/common/mmfqapp.jpg" title="关注美眉分期官方APP"/>
                                </div>
                            </div>

                            <div className="ym-public" style={{marginLeft: 70}}>
                                <div className="ym-wx">
                                    <div style={{marginLeft: 0,marginBottom: 10}}>美眉分期公众号</div>
                                    <img style={{marginLeft: 8}}
                                         src="../static/images/common/mmfqwx.jpg" title="关注美眉分期官方微信"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="warp" style={{textAlign: 'center',color: '#999',marginBottom: 10}}>
                        <img src="../static/images/common/partners.jpg"/>
                    </div>
                    <div className="wrap" style={{textAlign: 'center',color:'#999'}}>
                        <div style={{width:'300px',margin:'0 auto',padding:'10px 0'}}>
                            <a target="_blank" href=""
                               style={{display:'inline-block',textDecoration:'none',height:20,lineHeight:20}}>
                                <img src="../static/images/common/icon-police.png" style={{float:'left'}}/>
                                <p style={{float:'left',height:'20px',lineHeight:'20px',margin: '0px 0px 0px 5px',color:'#939393'}}>
                                    浙公网安备 33010602005229号</p>
                            </a>
                        </div>
                    </div>
                    <div className="wrap" style={{textAlign: 'center',marginTop:10,color:'#999',paddingBottom:40}}>
                        客服电话: 400-711-8898 (工作时间:9点-21点)
                    </div>
                </div>
            </div>
        )
    }
}
