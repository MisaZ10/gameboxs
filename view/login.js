import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import FBSDK, {LoginButton, AccessToken} from 'react-native-fbsdk';
import {Actions} from 'react-native-router-flux';

export default class LoginlView extends Component {

    componentDidMount() {}

    goToHome() {
        Actions.home();
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.walcome}>
                    GameBoxs
                </Text>
                <LoginButton
                readPermissions={['public_profile', 'email']}
                onLoginFinished={
                    (error, result) => {
                    if (error) {
                        console.log("login has error: " + result.error);
                    } else if (result.isCancelled) {
                        this.goToHome();
                        console.log("login is cancelled.");
                    } else {
                        AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            console.log(data.accessToken.toString())
                        }
                        )
                    }
                    }
                }
          onLogoutFinished={() => alert("logout.")}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center'
    },
    walcome: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 20
    }
});