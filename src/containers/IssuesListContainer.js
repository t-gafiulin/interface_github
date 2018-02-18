import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchIssues, fetchIssuesCount } from '../AC';
import Loader from '../components/LoadingIndicator';
import IssuesList from '../components/IssuesList';
import BackButton from '../components/BackButton';
import { LOAD_ISSUES_ERROR } from '../constants';
import Error from '../components/Error';
import Pagination from '../components/Pagination';
import SelectQuantity from '../components/SelectQuantity';

class IssuesListContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            perPage: '1',
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

        if(this.state.page > Math.ceil(issuesCount/this.state.perPage)){
            this.setState({page: 1});
            this.props.fetchIssues(login, repository, 1, this.state.perPage);
        }

        return loading ? <Loader /> :
        <div>
            <BackButton />

            <Pagination 
                pages={Math.ceil(issuesCount/this.state.perPage)}
                activePageNumber={this.state.page > issuesCount ? '1' : this.state.page}
                handleClick={this.handleClick}
                login={login}
                repository={repository}
            />
            
            <SelectQuantity 
                perPage={this.state.perPage}
                handleClick={this.handleClick}
                handleChange={this.handleChange}
            />

            {this.props.loadIssuesError ? <Error type={LOAD_ISSUES_ERROR} /> :
                <IssuesList 
                    issues={issues} 
                    login={login}
                    repository={repository}
                />
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

