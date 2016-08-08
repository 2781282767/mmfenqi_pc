/**
 * Created by sheldon on 2016/7/22.
 */
'use strict';

class R_LoginHeader
extends
React.Component
{
    render()
    {
        return (
            <div>
                <div className="headNew-bg">
                    <div className="head-wrap">
                        <div className="phone">
                            <a target="_blank">美眉分期整形APP</a>
                            <em className="download"></em>
                        </div>
                        <div className="box-xx box_xx-line left">|</div>
                        <div className="weixin">
                            <a href="javascript:;">美眉分期微信号</a>
                            <em className="download"></em>
                        </div>
                        <div id="notLogin" className="sign-box to-sign">
                            <div className="box-xx box_xx-line">|</div>
                            <div className="sign-right"><span className="callUs">联系客服<em>400-711-8898</em></span></div>
                        </div>
                        <div id="isLogin" className="sign-box sign-on" style={{display: 'none'}}></div>
                    </div>
                </div>
                <div className="clear"></div>
            </div>
        )
    }
}