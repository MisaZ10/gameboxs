import React, {Component} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import FBSDK, {LoginButton, AccessToken} from 'react-native-fbsdk';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyDjJN2mf5TGnivtHLEbuj8bPW2dGrbRJsE',
    authDomain: 'gameboxs-349fd.firebaseapp.com',
    databaseURL: 'https://gameboxs-349fd.firebaseio.com',
    projectId: 'gameboxs-349fd',
    storageBucket: '',
    messagingSenderId: '476694775950'
};
firebase.initializeApp(config);
const {FacebookAuthProvider} = firebase.auth;
const auth = firebase.auth();
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
                console.log("Sign In Success", user);
                this.setState({user, login: true})
                this.goToHome();
            })
            .catch( (error) => {
                console.log("Sign In Error", error);
            });
    }
    goToHome() {
        Actions.homeMenu();
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
    handleBtn = () => {
        this.goToHome();
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.walcome}>
                    GameBoxs for {this.state.user.displayName}
                </Text>
                <Button style={styles.btn} title="Start GameBoxs" onPress={this.handleBtn}/>
                <LoginButton
                    readPermissions={['public_profile', 'email']}
                    onLoginFinished={this.handleLogin}
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
    },
    btn: {
        marginBottom: 5
    },
    fcBtn: {
        marginTop: 5
    }
});