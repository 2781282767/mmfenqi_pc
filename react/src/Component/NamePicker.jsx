'usr strict';
import React, {Component, PropTypes} from 'react';
import Picker from 'react-mobile-picker';
import ReactDOM, {render} from 'react-dom';


import '../../src/less/example.less'

export default class NamePicker extends Component {
    constructor(props) {
        super(props);


        this.state = {
            isPickerShow: this.props.isPickerShow,
            valueGroups: {
                radius: '500米',


            },
            optionGroups: {
                radius: ['100米', '200米', '300米', '400米', '500米', '600米', '700米', '800米', '900米', '1000米'],

            }
        };
    }

    componentWillMount() {

        if (this.props.radius == 'null') {

            this.props.handleChange(this.state.valueGroups.radius.replace('米', ''));
        }
    }


    handleChange(name, value) {

        this.setState({
            valueGroups: {
                radius: value
            }
        });

        this.props.handleChange(value.replace('米', ''));

    }


    componentWillReceiveProps(nextProps) {

        if (nextProps.isPickerShow) {
            this.setState({
                isPickerShow: nextProps.isPickerShow,
                valueGroups: {
                    radius: nextProps.radius + '米'
                }
            })
        }

    }


    togglePicker() {

        this.setState({
            isPickerShow: false
        });
    };


    render() {

        const {optionGroups, valueGroups, isPickerShow} = this.state;

        const maskStyle = {
            display: isPickerShow ? 'block' : 'none'
        };

        //   const pickerModalClass = 'picker-modal${isPickerShow' ? 'picker-modal-toggle' : '';
        const pickerModalClass = `picker-modal${isPickerShow ? ' picker-modal-toggle' : ''}`;


        return (

            <div className="example-container">
                <div className="picker-modal-container">
                    <div className="picker-modal-mask" style={maskStyle}></div>
                    <div className={pickerModalClass}>
                        <header>
                            <div className="title"><a href="javascript:;" onClick={this.togglePicker.bind(this)}>取消</a>
                            </div>
                            <a href="javascript:;" onClick={this.togglePicker.bind(this)}>确定</a>
                        </header>
                        <Picker
                            optionGroups={optionGroups}
                            valueGroups={valueGroups}
                            onChange={this.handleChange.bind(this)}/>
                    </div>
                </div>
            </div>
        );
    }
}