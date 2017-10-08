import React, { Component } from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import apiGames from '../actions/igdbClients.js';
import Gamebox from '../components/gameBox.js';
import CommentList from '../components/commentsList.js';

import Icon from 'react-native-vector-icons/Ionicons';
import firebase, {dataBase, auth} from '../actions/firebase.js';

export default class GameDetailView extends Component {

    state = {
            text: '',
            comments: []
    }
    getCommentRef() {
        return dataBase.ref('comments/' + this.props.game.id)
    }
    sendMessege = () => {
        const text = this.state.text;
        const createDate = new Date();
        const { uid, photoURL } = auth.currentUser;
        if(!text && text == '')
        {
            return;
        }
        const commentRef = this.getCommentRef()
        console.log(createDate);
        let newComment = commentRef.push();
        newComment.set({
            text,
            uid,
            userPhoto: photoURL,
            createDate
        })
        this.setState({text: ''})
        Keyboard.dismiss();
    }
    componentWillMount() {
        this.getCommentRef().on('child_added', this.updateComment);
    }
    componentWillUnmount() {
        this.getCommentRef().off('child_added', this.updateComment);
    }
    updateComment = (data) => {
        const comment = data.val();
        let comments = this.state.comments.concat(comment)
        this.setState({comments: comments})
    }
    render() {
        const likeIcon = <Icon name="md-send" size={30} color="#5682a3"/>
        return (
            <View style={styles.container}>
                <Gamebox game={this.props.game}></Gamebox>
                <Text style={styles.titleComments}>
                    Comentarios
                </Text>
                <CommentList comments={this.state.comments}></CommentList>
                <View style={styles.inputContainer}>
                    <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({text})}
                    placeholder="¿Que te parecio el juego?"
                    value={this.state.text}/>
                    <TouchableOpacity onPress={this.sendMessege} style={styles.iconContent}>
                        {likeIcon}
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray',
        paddingTop: 10,
    },
    inputContainer: {
        height: 50,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        height: 50,
        flex: 1
    },
    iconContent: {
    },
    titleComments: {
        fontSize:20,
        paddingHorizontal: 15,
        marginVertical: 5
    }
});