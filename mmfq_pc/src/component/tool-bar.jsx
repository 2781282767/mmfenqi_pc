/**
 * Created by sheldon on 2016/7/11.
 */
'use strict';

class R_ToolBar extends React.Component {

    componentDidMount() {
        document.write("<script src='//kefu.easemob.com/webim/easemob.js?tenantId=13699&hide=false'></script><script src='//kefu.easemob.com/webim/easemob.js?tenantId=13699&hide=false&sat=true'></script>");
    }

    backTop(){
        window.location.href = '#top'
    }

    render() {

        return (
            <div className="toolbar">
                <div className="inner">
                    <div className="toolbar-cent"><span className="toolbar-tab toolbar-ph"><i className="tab-hover">400-711-8898</i><em></em></span>
                        <a target="_blank"
                        className="toolbar-tab toolbar-app">
                        <i className="tab-hover"></i><em></em></a></div>
                    <div className="inner-bot"><span className="toolbar-tab toolbar-top"  onClick={this.backTop}><i
                        className="tab-hover">回到顶部</i>
                        <em id="goTopBtn"></em>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}