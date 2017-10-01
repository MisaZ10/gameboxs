import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import GamesList from '../components/gamesList.js';
import apiGames from '../actions/igdbClients.js';

export default class HomeView extends Component {
    state = {
        games: []
    }

    componentDidMount() {
        apiGames
            .getGames(20)
            .then((games) => this.setState({games: games}))
            .catch(err => console.log('Error igdb', err));
    }
    render() {
        const games = this.state.games;
        return (
            <View style={styles.container}>
                <GamesList games={games}/>
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