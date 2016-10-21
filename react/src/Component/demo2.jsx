'usr strict';

import React, {Component, PropTypes} from 'react';

import ReactDOM, {render} from 'react-dom';
import '../less/swiperout.less';








export default class Demo2 extends Component {
    constructor(props) {
        super(props);
        this.state={
            class1:{
                width:'100%',
                height:'40px',
                border:'1px solid red',
                float:'left',
            },
            class2:{
                width:'0',
                height:'40px',
                border:'1px solid blue',
                float:'left',
                textAlign:'center',

            }
        }
    }

    componentDidMount(){

        var self=this;


        const contentwidth=this.refs.demo.offsetWidth-2
        console.log(contentwidth)

        console.log(contentwidth/4)
        var _box1 = document.getElementById('_box1')
        var statusdiv = document.getElementById('statusdiv')
        var startx = 0
        var dist = 0

        _box1.addEventListener('touchstart', function(e){
            var touchobj = e.changedTouches[0] // reference first touch point (ie: first finger)
            startx = parseInt(touchobj.clientX) // get x position of touch point relative to left edge of browser
            statusdiv.innerHTML = 'Status: touchstart<br> ClientX: ' + startx + 'px'

            console.log(startx)
            e.preventDefault()
        }, false)

        _box1.addEventListener('touchmove', function(e){
            var touchobj = e.changedTouches[0] // reference first touch point for this event
            var dist = parseInt(touchobj.clientX) - startx
            statusdiv.innerHTML = 'Status: touchmove<br> Horizontal distance traveled: ' + dist + 'px'
            e.preventDefault()


            console.log('111'+parseInt(-dist))

            console.log(parseInt(contentwidth/4))


if(dist<0){

    if(parseInt(-dist)>parseInt(contentwidth/4)||parseInt(-dist)==parseInt(contentwidth/4)) {

        var leftWidth = contentwidth + dist;



        self.setState({
            class1: {
                width: contentwidth-79,
                height: '40px',
                border: '1px solid red',
                float: 'left',
                transition:'width 1s',
                transitionTimingFunction:'ease-in'
            },
            class2: {
                width: '79px',
                height: '40px',
                border: '1px solid blue',
                float: 'left',
                textAlign: 'center',
                transition:'width 1s',
                transitionTimingFunction:'ease-in'

            }
        });

    }else if(parseInt(-dist)<30){

            var leftWidth = contentwidth + dist;


            self.setState({
                class1: {
                    width: leftWidth,
                    height: '40px',
                    border: '1px solid red',
                    float: 'left',
                    transitionTimingFunction:'ease-out'
                },
                class2: {
                    width: parseInt(-dist),
                    height: '40px',
                    border: '1px solid blue',
                    float: 'left',
                    textAlign: 'center',
                    transitionTimingFunction:'ease-out'

                }
            });

        }


}






        }, false);

        _box1.addEventListener('touchend', function(e){
            var touchobj = e.changedTouches[0] // reference first touch point for this event
            statusdiv.innerHTML = 'Status: touchend<br> Resting x coordinate: ' + touchobj.clientX + 'px';

                console.log('end'+startx-touchobj.clientX)

                if(startx-touchobj.clientX<30) {

                    console.log('end');
                    self.setState({
                        class1: {
                            width: contentwidth,
                            height: '40px',
                            border: '1px solid red',
                            float: 'left',
                            transition:'width 1s',
                            transitionTimingFunction: 'ease-out'
                        },
                        class2: {
                            width: '0',
                            height: '40px',
                            border: '1px solid blue',
                            float: 'left',
                            textAlign: 'center',
                            transition:'width 1s',
                            transitionTimingFunction: 'ease-out'

                        }
                    });
                }else{
                    self.setState({
                        class1: {
                            width: contentwidth-79,
                            height: '40px',
                            border: '1px solid red',
                            float: 'left',
                            transitionTimingFunction: 'ease-in'
                        },
                        class2: {
                            width: '79px',
                            height: '40px',
                            border: '1px solid blue',
                            float: 'left',
                            textAlign: 'center',
                            transitionTimingFunction: 'ease-in'

                        }
                    });
                }


            e.preventDefault()
        }, false)


    }




    render() {

        const {class1,class2} =this.state;




        return (
            <div style={{width:'100%',height:'300px',border:'1px solid red'}}>
                <div ref='demo'  style={{width:'100%',height:'40px',border:'1px solid red',overflow:'hidden'}}>
                    <div style={class1} id="_box1" >sss</div>
                    <div style={class2}>李建彬</div>
                </div>

                <div ref='demo'  style={{width:'100%',height:'40px',border:'1px solid red',overflow:'hidden'}}>
                    <div style={class1} id="_box1" >sss</div>
                    <div style={class2}>李建彬</div>
                </div>

                <div style={{width:'100%',height:'100px'}} id="statusdiv"></div>
            </div>
        );
    }
}