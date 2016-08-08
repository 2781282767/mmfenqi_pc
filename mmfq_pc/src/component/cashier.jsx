/**
 * Created by sheldon on 2016/7/8.
 */
'use strict';

class R_Cashier extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div style={{borderBottom:'1px solid #fd657a'}}>
                <div style={{width:1200,margin:'0px auto'}}>
                    <div style={{padding:'20px 100px'}}>
                        <a href="index.html"><img src="../static/images/common/logo.png" alt=""/></a>

                        <div style={{width:96,display:'inline-block'}}>
                            <div style={{display:this.props.one=='1' ? 'inline-block' :'none',width: 2, height: 24, backgroundColor: '#e8e8e8', margin: '0 47px'}}></div>
                        </div>

                        <div style={{width:82,display:'inline-block'}}>
                            <img src="../static/images/cashier/cashier.png" style={{display:this.props.two=='2'? 'inline-block':'none'}} />
                        </div>

                        <div  style={{display:'inline-block',textAlign:'right',width:541}}>
                            <img src="../static/images/cashier/step1.png" alt="" style={{display:this.props.three=='3' ? 'inline-block':'none'}}/>
                            <img src="../static/images/cashier/step2.png" alt="" style={{display:this.props.four=='4' ? 'inline-block':'none'}}/>
                            <img src="../static/images/cashier/step3.png" alt="" style={{display:this.props.five=='5' ? 'inline-block':'none'}}/>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
