import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Comments from './Comments'


class Issue extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return <div>
            Hello, Issue!
            <Link to="/"><button>Back to Search</button></Link>
            <p />
            <Comments />
        </div>
    }
}

export default connect(
    state => ({
        issue: state.issue.issue,
        comments: state.issue.comments,
    })  
)(Issue);