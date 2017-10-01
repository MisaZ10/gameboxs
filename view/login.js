import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class LoginlView extends Component {

    componentDidMount() {}
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    GameBoxs
                </Text>
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