import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Comments from './Comments'
import Showdown from 'showdown';
import '../resource/Issue.css';
import Loader from './LoadingIndicator';

var converter = new Showdown.Converter();

class Issue extends Component {
    constructor(props){
        super(props);
    }

    bodyParser(body){
        const str = converter.makeHtml(body);
        return {__html: str}
    }

    render(){
        let src;
        let author_url;
        let author_name;
        let body_issue;

        const data = <Loader />; 
        const { loading, issue } = this.props;
        
        if(!loading) {
            src = issue.user.avatar_url;
            author_url = issue.user.html_url;
            author_name = issue.user.login;
            body_issue = issue.body;
        }

        
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
                        <div class='issue-header-meta__state'></div>
                        <div class='issue-header-meta__author'></div>
                        <div class='issue-header-meta__date'></div>
                        <div class='issue-header-meta__comments'></div>
                    </div>
                </div>
            </div>
            // <div class='container'>
            //     <Link to="/"><button class='back-button'>Back to Search</button></Link>
            //     <div class='user'>
            //         <img class='user__image' src={src} alt="" width='300px' height='300px'/><br/>
            //         <a class='user__link' href={author_url}>
            //             <button class='user__github-button'>{author_name} GitHub profile</button>
            //         </a>   
            //     </div>
            //     <div class='issue-info'>
            //         <div class='issue-info__number'>#{issue.number}</div>
            //         <div class='issue-info__title'>{issue.title}</div>
            //         <div class='issue-info__state'>{issue.state}</div>
            //         <div class='labels'>
            //             labels
            //         </div>
            //         <div class='issue-info__created'>{issue.created_at}</div>
            //     </div>
            //     <div class='issue-body clear' dangerouslySetInnerHTML={this.bodyParser(body_issue)} />
            // </div>;

    }
}



export default connect(
    state => ({
        issue: state.issue.issue,
        loading: state.issue.issueLoad,
    })  
)(Issue);