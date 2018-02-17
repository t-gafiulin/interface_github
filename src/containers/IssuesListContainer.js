import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchIssues, fetchIssuesCount } from '../AC';
import Loader from '../components/LoadingIndicator';
import IssuesList from '../components/IssuesList';
import BackButton from '../components/BackButton';
import { LOAD_ISSUES_ERROR } from '../constants';
import Error from '../components/Error';
import Pagination from '../components/Pagination';

class IssuesListContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            perPage: '30',
            page: +this.props.match.params.page || 1,
        }
    }

    componentWillMount(){
        const { login, repository } = this.props.match.params;
        this.props.fetchIssuesCount(login, repository);
        this.props.fetchIssues(login, repository, this.state.page, this.state.perPage); 
    }

    handleChange = (stateName, event) => {
        this.setState({[stateName]: event.target.value});
    }

    handleClick = (nextOrPrevButton) => {
        const { login, repository } = this.props.match.params;
        const { fetchIssues } = this.props;
        let currentPage = this.state.page;   

        if (nextOrPrevButton === 'perPage') {
            currentPage = 1;
        } else {
            currentPage = +nextOrPrevButton; 
        }
        fetchIssues(login, repository, currentPage, this.state.perPage);

        this.setState({page: currentPage});
    }

    render(){
        const { login, repository } = this.props.match.params;
        const { issues, loading, issuesCount } = this.props;

        return loading ? <Loader /> :
        <div>
            <BackButton />

            <Pagination 
                pages={Math.ceil(issuesCount/this.state.perPage)}
                activePageNumber={this.state.page}
                handleClick={this.handleClick}
                login={login}
                repository={repository}
            />

            <select 
                className='select-block'
                value={this.state.perPage} 
                onChange={(e) => this.handleChange('perPage', e)} 
                onClick={() => this.handleClick('perPage')}
            >
                <option value="1">1</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="30">30</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
            {this.props.loadIssuesError ? <Error type={LOAD_ISSUES_ERROR} /> :
            <div className='list-issue'>
                <div className='list-issue-header'>Issues</div>
                <IssuesList 
                    issues={issues} 
                    login={login}
                    repository={repository}
                />
            </div>
            }
        </div>
        ;
    }
}

export default connect(
    state => ({
        issues: state.issue.issues,
        issuesCount: state.issue.issuesCount,
        loading: state.issue.loadingIssues,
        loadIssuesError: state.issue.loadIssuesError,
    }),
    { fetchIssues, fetchIssuesCount }
)(IssuesListContainer);

