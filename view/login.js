import React, {Component} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';

export default class LoginlView extends Component {

    componentDidMount() {}
    _doLoginWithFacebook = () => {

        FBLoginManager.loginWithPermissions([
            "email", "user_friends"
        ], (error, data) => {
            // //console.warn('error ' + JSON.stringify(error)); //console.warn('data ' +
            // JSON.stringify(data));
            if (!error) {
                if (data.credentials.token) {

                    var token = data.credentials.token;
                    //console.warn(token);
                    console.log(data.credentials);

                } else {
                    console.warn("Error: ", error);
                }
            }
        })
    }
    render() {
        return (
            <View style={styles.container}>
              <Button
                large={false}
                onPress={()=> {this._doLoginWithFacebook()}}
                buttonStyle={{backgroundColor:'#fff', borderRadius: 10, marginTop:20}}
                textStyle={{textAlign: 'center', fontWeight: 'bold',  fontSize: 15}}
                title={'Ingresar con facebook'} />
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