import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Comments from './Comments'


class Issue extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const src = this.props.issue ? this.props.issue.user.avatar_url : "";


        return <div>
            <Link to="/"><button>Back to Search</button></Link>
            <img src={src} alt="" width='300px' height='300px'/>
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