import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Comment from './Comment'
import Showdown from 'showdown';
import '../resource/Issue.css';
import Loader from './LoadingIndicator';

var converter = new Showdown.Converter();

export default class Issue extends Component {
    constructor(props){
        super(props);
    }

    bodyParser(body){
        const str = converter.makeHtml(body);
        return {__html: str}
    }

    render(){
        let src, author_url, author_name, body_issue, comments_amount, created_at, labels;

        const data = <Loader />; 
        const { loading, issue, commentsList } = this.props;
        
        if(!loading) {
            src = issue.user.avatar_url;
            author_url = issue.user.html_url;
            author_name = issue.user.login;
            body_issue = issue.body;
            comments_amount = issue.comments === 1 ? issue.comments + ' comment' : issue.comments + ' comments';
            created_at = issue.created_at;

            labels = issue.labels.map((elem) => {
                return <div class='issue-labels__label' style={{backgroundColor: '#' + elem.color}}>
                    {elem.name}
                </div>
            })

            
        }
        
        const comments = commentsList.map((elem) => {
            return <div class='issue-comments__comment'>
                <Comment 
                    url={elem.user.html_url} 
                    login={elem.user.login} 
                    date={elem.created_at} 
                    avatar_url={elem.user.avatar_url}
                    text={this.bodyParser(elem.body)}
                />
            </div>
        })
        
        return loading ? <Loader /> :  
            <div class='container'>
                <div class='issue-body'>
                    <div class='issue-header-show'>
                        <div class='issue-header-show__button'>
                            <Link to="/"><button>Back</button></Link>
                        </div>
                        <h1 class='issue-header-show__title'>
                            <span class='issue-header-show__text-header'>{issue.title}</span>
                            <span class='issue-header-show__number'> #{issue.number}</span>
                        </h1>
                    </div>
                    <div class='issue-header-meta'>
                        <div class='issue-header-meta__state'>{issue.state}</div>
                        <a class='issue-header-meta__author' href={author_url}>{author_name}</a>
                        <div class='issue-header-meta__date'>opened this issue {created_at} </div>
                        <div class='issue-header-meta__comments'> - {comments_amount}</div>
                    </div>
                    <div class='issue-labels'>
                        <h2 class='issue-labels__header'>Labels</h2>
                        {labels}
                    </div>
                    <div class='issue-comments'>
                        <Comment 
                            url={author_url} 
                            login={author_name} 
                            date={created_at} 
                            avatar_url={src}
                            text={this.bodyParser(body_issue)}
                        />
                        {comments}
                    </div>
                    
                </div>
            </div>
    }
}