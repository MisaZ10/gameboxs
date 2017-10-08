import React, {Component} from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class CommentsList extends Component {

    render() {
        const { text, userPhoto, createDate } = this.props.comment;
        return (
            <View style={styles.otherComment}>
                <View style={styles.infoComment}>
                    <Image style={styles.avatar} source={{uri: userPhoto}}/>
                    <Text style={styles.createDate}>{createDate}</Text>
                </View>
                <Text style={styles.text}>{text}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    otherComment: {
        backgroundColor: '#ecf0f1',
        padding: 10,
        margin: 3,
        borderRadius: 3,
    },
    myComment: {
        backgroundColor: 'lightgray'
    },
    avatar: {
        height: 32,
        width: 32,
        borderRadius: 50
    },
    infoComment: {
        flexDirection: 'row',
    },
    text: {
        fontSize: 20,
    },
    createDate: {
        marginHorizontal: 10
    }
});