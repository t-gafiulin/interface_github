import React, {Component} from 'react';
import { connect } from 'react-redux';
import Issue from '../components/Issue';
import { fetchIssue } from '../AC';
import Loader from '../components/LoadingIndicator';
import { LOAD_ISSUE_ERROR } from '../constants';
import Error from '../components/Error';

class IssueContainer extends Component {
    constructor(props){
        super(props);
    }

    componentWillMount(){
        const { login, number, repository } = this.props.match.params;
        this.props.fetchIssue(login, repository, number);
    }

    render(){
        const { loading, issue, comments, loadIssueError } = this.props;

        return loading ? <Loader /> :
                    loadIssueError ? <Error type={LOAD_ISSUE_ERROR} /> :
                    <Issue 
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
        loadIssueError: state.issue.loadIssueError,
    }),
    { fetchIssue }
)(IssueContainer);

