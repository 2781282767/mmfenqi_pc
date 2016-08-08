
class R_Flex extends React.Component{

    constructor(props){
        super(props);
        this.state={
            blockOrnone:this.props.blockOrnone
        }
    }


    // componentDidUpdate(){
    //     this.setState({
    //         blockOrnone:false
    //     })
    //
    //
    //     //console.log(this.props.blockOrnone)
    //
    // }

    yescb(){
        this.props.yescb()
    }

    // nocb(){
    //
    //    this.props.nocb()
    // }

    nocb(){

       // this.props.nocb()
        var new2=false;
        this.setState({
            blockOrnone:new2
        })

        this.props.nocb(new2)
    }




    render(){
0

        var img=this.props.img;
        var img2=img.abc;
        var foot=this.props.foot;

        console.log(foot.iscancle)
        return (
                <div className="none" style={{display:(this.props.blockOrnone==true)?'block':'none'}} >
                    <div className="_z"></div>
                    <div style={this.props.option}>

                        <div className="header">
                            <div className="title">提示</div>
                            <div className="cance" >x</div>
                        </div>
                        <div style={this.props.content}>
                            <div>

                                <img src={img2.props.src} alt=""/>

                            </div>

                        </div>
                        <div className="foot">
                            <div className="btn cancle_btn" style={{display:foot.iscancle?'none':'block'}} onClick={this.nocb.bind(this)}>取消</div>
                            <div className="btn sure_btn" onClick={this.yescb.bind(this)}>确定</div>
                        </div>
                    </div>
                </div>

        )
    }
}
