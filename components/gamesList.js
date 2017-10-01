import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    Image,
    ListView,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';

import Gamebox from './gameBox.js';

export default class GamesList extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: ds
        };
    }
    componentDidMount() {
       this.updateDataSource(this.props.games);
    }
    componentWillReceiveProps(newProps){
        if(newProps.games != this.props.games) {
            this.updateDataSource(newProps.games);
        }
    }
    updateDataSource = (games) => {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(games)
        })
    }
    gamePress(game) {
        Actions.gameDetail({game});
    }
    render() {
        return (
            <ListView
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={(game) => {
                    return (
                        <TouchableOpacity onPress={() => this.gamePress(game)}>
                            <Gamebox game={game}></Gamebox>
                        </TouchableOpacity>
                    )
                }}
            />
        );
    }
}
