import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase, {dataBase, auth} from '../actions/firebase.js';

export default class Gamebox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: false,
            likeCount: 0,
            comments: 0
        };
    }
    componentWillMount() {
        const { uid } = auth.currentUser;
        this.getGameRef()
        .on('value', snapshot => {
            const game = snapshot.val();
            if(game) {
                this.setState({
                    likeCount: game.likeCount,
                    liked: game.likes && game.likes[uid]
                })
            }
        })
        this.getCommentRef().on('child_added', this.updateComment);
    }
    componentWillUnmount() {
        this.getCommentRef().off('child_added', this.updateComment);
    }
    setLike = () => {
        this.toggleLike(!this.state.liked);
    }
    getGameRef = () => {
       return dataBase.ref('game/' + this.props.game.id);
    }
    getCommentRef = () => {
        return dataBase.ref('comments/' + this.props.game.id)
    }
    updateComment = (data) => {
        // const comment = data.val();
        const comments = this.state.comments;
        console.log(comments);
        this.setState({comments: comments + 1})
    }
    toggleLike = (liked) => {
        const { uid } = auth.currentUser;
        this.getGameRef()
        .transaction((game) => {
            if (game) {
                if (game.likes && game.likes[uid]) {
                    game.likeCount--;
                    game.likes[uid] = null;
                } else {
                    game.likeCount++;
                    if (!game.likes) {
                    game.likes = {};
                    }
                    game.likes[uid] = true;
                }
            }
            return game || {
                likeCount: 1,
                likes: {
                    [uid]: true
                },
                name: this.props.game.name,
                imgUrl: this.props.game.imgUrl
            };
        });
    }
    render() {
        const { imgUrl, name, likes, comments } = this.props.game;
        const likeIcon = this.state.liked ? 
         <Icon name="ios-heart" size={30} color="#e74c3c"/>
         :  <Icon name="ios-heart-outline" size={30} color="#184169"/>
        return (
            <View style={styles.gameBox}>
                <Image source={{uri: imgUrl}} style={styles.image}/>
                <View style={styles.info}>
                    <Text style={styles.name}>{name}</Text>
                    <View style={styles.row}>
                        <TouchableOpacity onPress={this.setLike} style={styles.iconContent}>
                                {likeIcon}
                                <Text>{this.state.likeCount}</Text>
                        </TouchableOpacity>
                        <View style={styles.iconContent}>
                            <Icon name="ios-chatboxes-outline" size={30} color="#184169"/>
                            <Text>{this.state.comments}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    gameBox: {
        backgroundColor: 'white',
        flexDirection: 'row',
        margin: 6,
        shadowColor: 'black',
        shadowOpacity: .3,
        shadowOffset: {
            height: 1,
            width: -2,
        },
        elevation: 5
    },
    info: {
        flex: 1,
        backgroundColor: '#F2F3F2',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 30,
        marginTop: 10
    },
    name: {
        fontSize: 25,
        marginTop: 5,
        color: '#333'
    },
    iconContent: {
        flex: 1,
        alignItems: 'center'
    },
    image: {
       width: 150,
       height: 150
    },
});