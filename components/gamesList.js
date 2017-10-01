import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    Image,
    ListView,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Gamebox from './gameBox.js';

export default class GamesList extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        const games = this.props.games;
        this.state = {
            dataSource: ds.cloneWithRows(games)
        };
    }

    componentWillReceiveProps(newProps){
        if(newProps.games != this.props.games) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(newProps.games)
            })
        }
    }
    updateDataSource() {

    }
    render() {
        return (
            <ListView
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={(game) => <Gamebox game={game}></Gamebox>}
            />
        );
    }
}
