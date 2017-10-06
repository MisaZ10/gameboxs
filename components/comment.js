import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class CommentsList extends Component {

    render() {
        return (
            <View>
                <Text>{this.props.text}</Text>
            </View>
        );
    }
}