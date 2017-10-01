import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import apiGames from '../actions/igdbClients.js';
import Gamebox from '../components/gameBox.js';
export default class GameDetailView extends Component {

    componentDidMount() {

    }
    render() {
        console.log(this.props.game);
        return (
            <View style={styles.container}>
               <Gamebox game={this.props.game}></Gamebox>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray',
        paddingTop: 10
    }
});