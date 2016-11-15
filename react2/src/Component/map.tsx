import * as React from "react";

import * as ReactDOM from "react-dom";



import {bindActionCreators} from 'redux';



import { Provider, connect} from 'react-redux';

import {BaseStore} from '../redux/store/BaseStore';


import ComponentsConfig from "./ComponentsConfig";


import {changeActiveAction,switchMenu} from '../redux/actions/MenuAction';


import {getAuthAction,Login} from '../redux/actions/HeaderAction';


import AppBody from './appBody'


import Demo from './demo'

import  AppHeader from './Header';

import AppMenu from './AppMenu'




const css_prefix = ComponentsConfig.css_prefix;
// let detect = new Detect();
let adCls = 1==1 ? `${css_prefix}-layout-mobile-main` : `${css_prefix}-layout-pc-main`;


const store = BaseStore({ });




class Map extends React.Component<any,any>{

    constructor(props) {
        super(props);
    }


    componentWillMount():void {


        console.log(this.props)

        if(1==1){
         //   this.props.Login()
        }

    }



    render() {
        let {MenuReducers,HeaderReducer} = this.props;

        return (

            <div>
                <AppHeader  meu_reducers={MenuReducers} hed_reducers={HeaderReducer}/>

                <Demo></Demo>
            </div>

        )
    }



}


let mapStateToProps = (state) => {
    return {
        HeaderReducer: state.HeaderReducer,
        MenuReducers: state.MenuReducers
    }
}

function mapDispatchToProps(dispatch) {
    // return {
    //     Actions: bindActionCreators({
    //         changeActiveAction,
    //         switchMenu,
    //         getAuthAction
    //     }, dispatch)
    // };


    return bindActionCreators({
        changeActiveAction:  changeActiveAction,
        switchMenu: switchMenu,
        getAuthAction: getAuthAction,
        Login:Login
    }, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Map);


ReactDOM.render(
    <Provider store={store}>
        <Map />
    </Provider>,
    document.getElementById("content")
);


// ReactDOM.render(
//     <map/>,
//     document.getElementById("content")
// )