import React, { Component } from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
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
        return dataBase.ref('comment/' + this.props.game.id)
    }
    sendMessege = () => {
        const text = this.state.text;
        const { uid } = auth.currentUser;
        if(!text && text == '')
        {
            return;
        }
        const commentRef = this.getCommentRef();
        let newComment = commentRef.push();
        newComment.set({
            text,
            uid 
        })
        this.setState({text: ''})
    }
    componentWillMount() {
        this.getCommentRef().on('child_added', (data) => {
            const comment = data.val();
            let comments = this.state.comments.push(comment)
            this.setState({
                comments: comment
            })
        });
    }
    render() {
        const likeIcon = <Icon name="md-send" size={30} color="#5682a3"/>
        return (
            <View style={styles.container}>
                <Gamebox game={this.props.game}></Gamebox>
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
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
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
    }
});