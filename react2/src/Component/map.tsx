import * as React from "react";

import * as ReactDOM from "react-dom";

// import createStore from '../redux/store/BaseStore';
import BaseStore from '../redux/store/BaseStore';
 const store = '22';

import { Provider } from 'react-redux';


export class Demo extends React.Component<any,any> {
    render() {
            return (
                <div>sss</div>
            )
    }
}

// const ElementContainer = document.getElementById("content");


ReactDOM.render(
    <Provider store={store}>
        <Demo/>
    </Provider>,
    document.getElementById("content")
);


// import * as React from "react";
// import * as ReactDOM from "react-dom";
//
// class Hello extends React.Component {
//     render() {
//         return <h1>www</h1>;
//     }
// }