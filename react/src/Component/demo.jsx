'usr strict';

import React, {Component, PropTypes} from 'react';

// import Picker from 'react-mobile-picker';

import ReactDOM, {render} from 'react-dom';

// import NamePicker from './NamePicker'


// import DatePicker from '../Component/DatePicker/DatePicker'


// import '../../src/less/example.less'







export default class Demo extends Component {
    constructor(props) {
        super(props);
    }


    handleValChange(value){
        alert(value)
    }


    render() {
        return (
            // <div className="page">
            //     <header className="page-header">
            //         <h1 className="page-title">React Mobile Picker</h1>
            //     </header>
            //     <main className="page-body">
            //         <p className="description">React Mobile Picker is a super simple component with no restriction, which means you can use it in any way you want.</p>
            //         <p className="description">Here are two examples:</p>
            //         <NamePicker />
            //         <BirthPicker />
            //     </main>
            // </div>
            <div>
                {/*<DatePicker onChange={this.handleValChange.bind(this)}/>*/}

                sss

            </div>
        );
    }
}