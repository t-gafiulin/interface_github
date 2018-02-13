import React, {Component} from 'react';
import { connect } from 'react-redux';
import Issue from './Issue';

class IssueContainer extends Component {
    constructor(props){
        super(props);
    }


    render(){
        const { loading, issue, comments } = this.props;

        return <Issue 
            loading={loading}
            issue={issue}
            commentsList={comments}
        />
    }
}

export default connect(
    state => ({
        issue: state.issue.issue,
        loading: state.issue.issueLoad,
        comments: state.issue.comments,
    }),
    { }
)(IssueContainer);

