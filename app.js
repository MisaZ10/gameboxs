import React, {Component} from 'react';
import {
    Platform,
} from 'react-native';
import HomeView from './view/home.js';
import GameDetailView from './view/gameDetail.js';
import LoginView from './view/login.js';
import { Scene, Router } from 'react-native-router-flux';

export default class App extends Component {

    render() {
        const isAndroid = Platform.OS == 'android';
        return (
            <Router>
                <Scene key="root">
                    <Scene key="login" component={LoginView}  hideNavBar={true}/>
                    <Scene key="home" component={HomeView}  hideNavBar={true}/>
                    <Scene key="gameDetail" component={GameDetailView}  hideNavBar={isAndroid}/>
                </Scene>            
            </Router>
        );
    }
}
