import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Comments from './Comments'
import Showdown from 'showdown';

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
        const src = this.props.issue ? this.props.issue.user.avatar_url : "";
        const author_url = this.props.issue ? this.props.issue.user.html_url : "";
        const body_issue = this.props.issue ? this.props.issue.body : "";
        const body = this.bodyParser(body_issue);

        return <div>
            <Link to="/"><button>Back to Search</button></Link>
            <img src={src} alt="" width='300px' height='300px'/>
            <a href={author_url}>Github Profile</a>
            <div dangerouslySetInnerHTML={this.bodyParser(body_issue)} />
            <Comments />
        </div>
    }
}



export default connect(
    state => ({
        issue: state.issue.issue,
    })  
)(Issue);