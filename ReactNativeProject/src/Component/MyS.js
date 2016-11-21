'usr strict';

import React, { Component,PropTypes } from 'react';
import { View, Text,TouchableHighlight } from 'react-native';

export default class MyS extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        onForward: PropTypes.func.isRequired,
        onBack: PropTypes.func.isRequired,
    };

    _onPressButton() {
        alert(111)
    }

    render() {
        return (
            <View style={{paddingTop:20}}>
                <Text style={{textAlign:'center'}}>{this.props.title}</Text>
                <Text>Current Scene: { this.props.title }</Text>
                <TouchableHighlight onPress={this.props.onForward}>
                    <Text>点我进入下一场景</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.props.onBack}>
                    <Text>点我返回上一场景</Text>
                </TouchableHighlight>


                <TouchableHighlight onPress={this._onPressButton}>
                    <Text style={{color:'red'}}>李建彬111111</Text>
                </TouchableHighlight>
            </View>
        )
    }
}