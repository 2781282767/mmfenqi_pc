/**
 * Created by sheldon on 2016/7/11.
 */
'use strict';

class R_Nav extends React.Component {
    render() {
        return (
            <div className="mainNav">
                <div className="wrap pos_rel">
                    <div className="navCont">
                        {this.props.now == 1 ? <a href="index.html" className='now'> 首页</a>:<a href="index.html" > 首页</a>}
                        {this.props.now == 2 ? <a href="combo.html" className='now'> 网红套餐</a>:<a href="combo.html" > 网红套餐</a>}
                        {this.props.now == 3 ? <a href="goods.html" className='now'> 限时秒杀</a>:<a href="goods.html" > 限时秒杀</a>}
                    </div>
                    <span className="hoverLine"></span>
                </div>
            </div>
        )
    }
}
