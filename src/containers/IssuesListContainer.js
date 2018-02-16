import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchIssues } from '../AC';
import { Link } from 'react-router-dom';
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
            pages: 13,
        }
    }

    componentWillMount(){
        const { login, repository } = this.props.match.params;
        this.props.fetchIssues(login, repository, this.state.page, this.state.perPage);   
    }

    handleChange = (stateName, event) => {
        this.setState({[stateName]: event.target.value});
    }

    handleClick = (nextOrPrevButton) => {
        const { login, repository } = this.props.match.params;
        const { fetchIssues } = this.props;
        let currentPage = this.state.page;
        if(nextOrPrevButton === 'next') {
            ++currentPage;
        } else if (nextOrPrevButton === 'prev') {
            --currentPage;
        } else if (nextOrPrevButton === 'first'){
            currentPage = 1;
        } else if (nextOrPrevButton === 'last') {
            currentPage = this.state.pages;
        } else {
            currentPage = +nextOrPrevButton;
        }



        
        
        
        // else if (nextOrPrevButton === 'perPage') {
        //     currentPage = 1;
        //     //fetchIssues(login, repository, currentPage, this.state.perPage);
        // } 
        fetchIssues(login, repository, currentPage, this.state.perPage);

        this.setState({page: currentPage});
    }

    render(){
        const { login, repository } = this.props.match.params;
        const { issues, loading } = this.props;

        return loading ? <Loader /> :
        <div>
            <BackButton />

            <Pagination 
                pages={this.state.pages}
                activePageNumber={this.state.page}
                handleClick={this.handleClick}
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
        loading: state.issue.loadingIssues,
        loadIssuesError: state.issue.loadIssuesError,
    }),
    { fetchIssues }
)(IssuesListContainer);

