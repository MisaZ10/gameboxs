import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import GamesList from './components/gamesList.js';
import apiGames from './actions/igdbClients.js';

export default class App extends Component {
    state = {
        games: []
    }

    componentDidMount() {
        apiGames.getGames(10)
        .then((games) => this.setState({games: games}));
        // console.log(apiGames.getGames(10))
    }
    render() {
        const games = this.state.games;
        console.log('Games  ', this.state.games);
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