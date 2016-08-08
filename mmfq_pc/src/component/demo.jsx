'use strict';

class Dr2 extends React.Component {
    constructor(props){
        super(props);

        this.state={
            temp2:this.props.temp
        }





    }

    change(){
        var temp3='ljb'
        this.setState({
            temp2:temp3
        })
        this.props.cb(temp3)
    }

    render() {
        return (
            <div style={{height:100,width:100,backgroundColor:'#999'}} onClick={this.change.bind(this)}>

                <div>{this.props.temp}</div>

            </div>

        )
    }

}


class Dr extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            temp:1,
            blockOrnone:false,
        }

        this.config = {
            width: '400px',
            height: '300px',
            position: 'fixed',
            zIndex: 10,
            marginLeft: '-200px',
            left: '50%',
            top: '50%',
            marginTop: '-150px',


        };

        this.foot={
            issure:true,
            iscancle:true
        }

        this.content = {
            position: 'relative',
            backgroundColor: '#FFFFff',
            height: 100,
            textAlign: 'left'
        };
        
        
        this.img={
            abc: <img src="../static/images/app.jpg" alt=""/>
        }
    }


    change(temp3){
        this.setState({
            temp:temp3,


        })
    }

    alert(){
        this.setState({
            blockOrnone:true

        })
    }


    yescb(){
        this.setState({
            blockOrnone:false

        })
    }

    nocb(temp3){
        this.setState({
            blockOrnone:temp3

        })
    }

    render() {

        var temp = this.state.temp;
        console.log(this.state.blockOrnone);
        return (

            <div>

                <Dr2 temp={temp} cb={this.change.bind(this)} />

                {temp}

                <R_Flex  option={this.config} content={this.content} blockOrnone={this.state.blockOrnone} yescb={this.yescb.bind(this)} nocb={this.nocb.bind(this)} img={this.img} foot={this.foot} />


                <div onClick={this.alert.bind(this)}>ssssllslsllssfs</div>

            </div>
        )
    }
}
