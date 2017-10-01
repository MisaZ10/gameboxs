import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Gamebox extends Component {

    render() {
        const { imgUrl, name, likes, comments } = this.props.game;
        return (
            <View style={styles.gameBox}>
                <Image source={{uri: imgUrl}} style={styles.image}/>
                <View style={styles.info}>
                    <Text style={styles.name}>{name}</Text>
                    <View style={styles.row}>
                        <View style={styles.iconContent}>
                            <Icon name="ios-heart-outline" size={30} color="#184169"/>
                            <Text>{likes}</Text>
                        </View>
                        <View style={styles.iconContent}>
                            <Icon name="ios-chatboxes-outline" size={30} color="#184169"/>
                            <Text>{comments}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    gameBox: {
        backgroundColor: 'white',
        flexDirection: 'row',
        margin: 6,
        shadowColor: 'black',
        shadowOpacity: .3,
        shadowOffset: {
            height: 1,
            width: -2,
        },
        elevation: 5
    },
    info: {
        flex: 1,
        backgroundColor: '#F2F3F2',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 30,
        marginTop: 10
    },
    name: {
        fontSize: 25,
        marginTop: 5,
        color: '#333'
    },
    iconContent: {
        flex: 1,
        alignItems: 'center'
    },
    image: {
       width: 150,
       height: 150
    },
});