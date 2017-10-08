import React, {Component} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import GamesList from '../components/gamesList.js';
import apiGames from '../actions/igdbClients.js';

export default class HomeView extends Component {
    state = {
        games: null
    }

    componentDidMount() {
        apiGames
            .getGames(20)
            .then((games) => this.setState({games: games}))
            .catch(err => console.log('Error igdb', err));
    }
    render() {
        const games = this.state.games;
        if(!games) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large"/>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                {games && <GamesList games={games}/>}
                {!games &&  <ActivityIndicator  style={styles.container} size="large"/>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray',
        paddingTop: 10
    },
    indicator: {
        flex: 1,
        opacity: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 50,
    }
});