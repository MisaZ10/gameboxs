import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

export default class LoginlView extends Component {

    componentDidMount() {}
    render() {
        console.log(this.props.game);
        return (
            <View style={styles.container}>
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