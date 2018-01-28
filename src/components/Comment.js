import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../resource/Comment.css';


export default class Comment extends Component {
    constructor(props){
        super(props);
    }

    dateParser(date){
        return date.split('T').join(' ').slice(0, -1);
    }

    render(){
        const { url, login, date, avatar_url, text } = this.props; 

        return <div class='comment'>
            <img class='comment__img' src={avatar_url} />
            <div class='comment__text'>
                <div class='comment__header'>
                    <a class='comment__author' href={url}>{login}</a>
                    <div class='comment__date'>created {this.dateParser(date)}</div>
                </div>
                <div class='comment__body' dangerouslySetInnerHTML={text}></div>
            </div>
        </div>
    }
}