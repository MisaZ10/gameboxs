import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, Image} from 'react-native';
import FBSDK, {LoginButton, AccessToken} from 'react-native-fbsdk';
import {Actions} from 'react-native-router-flux';
import firebase, { auth } from '../actions/firebase.js';

const { FacebookAuthProvider } = firebase.auth;

export default class LoginlView extends Component {

    componentDidMount() {
    }
    constructor(props) {
        super(props);
          AccessToken.getCurrentAccessToken()
                .then((data) => {
                  if(data) {
                    this.authenticate(data.accessToken);
                  }
                })
         this.state = {
            user: {
                displayName: 'YOU'
            },
            login: false
        };
    }
    authenticate = (AccessToken) => {
        let credential = FacebookAuthProvider.credential(AccessToken);
        auth.signInWithCredential(credential)
            .then( (user) => {
                this.setState({user, login: true})
                this.goToHome();
            })
            .catch( (error) => {
                console.log("Sign In Error", error);
            });
    }
    goToHome() {
        Actions.home();
    }
    handleLogin = (error, result) => {
        if (error) {
            console.log("login has error: " + result.error);
        } else if (result.isCancelled) {
            console.log("login is cancelled.");
        } else {
            AccessToken
                .getCurrentAccessToken()
                .then((data) => {
                    this.authenticate(data.accessToken);
                })
        }
    }

    render() {
        const image = Math.round(Math.random()*4) + 1;
        const imgs = [
                require('../assets/backgrounds/1.jpg'),
                require('../assets/backgrounds/2.jpg'),
                require('../assets/backgrounds/3.jpg'),
                require('../assets/backgrounds/4.jpg'),
                require('../assets/backgrounds/5.jpg')
        ]
        return (
            <Image source={imgs[image]} style={styles.container}>
                <Text style={styles.walcome}>
                    GameBoxs for {this.state.user.displayName}
                </Text>
                <Image source={require('../assets/logo.png')} style={styles.logo}/>
                <LoginButton
                    readPermissions={['public_profile', 'email']}
                    onLoginFinished={this.handleLogin}
                    onLogoutFinished={() => alert("logout.")}/>
            </Image>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
        height: null,
        width: null
    },
    walcome: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 5,
        color: '#F0F0F2'
    },
    btn: {
        marginBottom: 5
    },
    fcBtn: {
        marginTop: 5
    },
    logo: {
        height: 90,
        width: 90,
        marginBottom: 5,
    }
});