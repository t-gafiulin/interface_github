import React, {Component} from 'react';
import { connect } from 'react-redux';
import Issue from '../components/Issue';
import { fetchIssue } from '../AC';
import Loader from '../components/LoadingIndicator';

class IssueContainer extends Component {
    constructor(props){
        super(props);
    }

    componentWillMount(){
        const { login, number, repository } = this.props.match.params;
        this.props.fetchIssue(login, repository, number);
        //console.log( login, number, repository );
    }

    render(){
        const { loading, issue, comments } = this.props;
        console.log(loading, issue, comments);

        return loading ? <Loader /> :
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
    }),
    { fetchIssue }
)(IssueContainer);

