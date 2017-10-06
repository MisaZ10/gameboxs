import React, {Component} from 'react';
import {StyleSheet, Text, Image, ListView, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';

import Comment from './comment.js';

export default class CommentsList extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: ds
        };
    }
    componentDidMount() {
        console.log('Comentario', this.props.comments)

        this.updateDataSource(this.props.comments);
    }
    componentWillReceiveProps(newProps) {
        if (newProps.comments != this.props.comments) {
            this.updateDataSource(newProps.comments);
        }
    }
    updateDataSource = (comments) => {
        this.setState({
            dataSource: this
                .state
                .dataSource
                .cloneWithRows(comments)
        })
    }

    render() {
        return (<ListView
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={(comment) => {
            return (
                <Comment comment={comment.text}></Comment>
            )
        }}/>);
    }
}