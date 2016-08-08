/**
 * Created by ChinaHp on 2016/8/3.
 */
'use strict'
class R_Business extends React.Component{
    render(){
        return (
            <div className="wrap-business" style={{background:'#ffffff'}}>
                    <div className="business-wrap-top2">
                        <div>
                            <a href="commerce-add.html"><div className="btn submit-btn" style={{backgroundColor:'#ff5a53',padding:10}}>立即申请入驻</div></a>
                        </div>
                    </div>

                    <div className="partTit">
                        <p><span>
                            <em className="ft31">
                               <i className="pink">城市合作代表</i>
                            </em><i className="eng">City Cooperation Representative</i></span>

                        </p></div>

                    <div className="business-wrap-content2">
                        <ul>
                            <li>
                                <div><img src="../static/images/commerce/hos1.jpg" alt=""/></div>
                                <div>杭州格莱美整形美容医院</div>
                            </li>

                            <li>
                                <div><img src="../static/images/commerce/hos2.jpg" alt=""/></div>
                                <div>杭州美莱医疗美容医院</div>
                            </li>
                            <li>
                                <div><img src="../static/images/commerce/hos3.jpg" alt=""/></div>
                                <div>杭州时光医疗美容医院</div>
                            </li>
                            <li>
                                <div><img src="../static/images/commerce/hos4.jpg" alt=""/></div>
                                <div>杭州同欣整形美容医院</div>
                            </li><li>
                                <div><img src="../static/images/commerce/hos5.jpg" alt=""/></div>
                                <div>杭州维多利亚医疗美容医院</div>
                            </li><li>
                                <div><img src="../static/images/commerce/hos6.jpg" alt=""/></div>
                                <div>杭州整形医院</div>
                            </li>
                        </ul>
                    </div>

            </div>
        )
    }
}
