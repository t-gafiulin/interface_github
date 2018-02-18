import React, {Component} from 'react';
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

        return <div className='comment'>
            <img className='comment__img' src={avatar_url} />
            <div className='comment__text'>
                <div className='comment__header'>
                    <a className='comment__author' href={url}>{login}</a>
                    <div className='comment__date'>created {this.dateParser(date)}</div>
                </div>
                <div className='comment__body' dangerouslySetInnerHTML={text}></div>
            </div>
        </div>
    }
}