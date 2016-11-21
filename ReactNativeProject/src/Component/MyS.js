'usr strict';

import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class MyS extends Component {
    static defaultProps = {
        title: 'MyScene'
    };

    render() {
        return (
            <View>
                <Text>Hi! My name is {this.props.title}.</Text>
            </View>
        )
    }
}