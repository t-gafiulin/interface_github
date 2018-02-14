import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchIssues } from '../AC';
import { Link } from 'react-router-dom';
import Loader from '../components/LoadingIndicator';
import IssuesList from '../components/IssuesList';

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
            fetchIssues(login, repository, ++(currentPage), this.state.perPage);
        } else if (nextOrPrevButton === 'prev') {
            fetchIssues(login, repository, --(currentPage), this.state.perPage);
        } else if (nextOrPrevButton === 'perPage') {
            currentPage = 1;
            fetchIssues(login, repository, currentPage, this.state.perPage);
        } 

        this.setState({page: currentPage});
    }

    render(){
        const { login, repository } = this.props.match.params;
        const { issues, loading } = this.props;

        return loading ? <Loader /> :
        <div>
            <div className='pagination'>
                <button className='pagination__prev' onClick={() => this.handleClick('prev')} disabled={this.state.page === 1}>
                    <Link 
                        className='search__button' 
                        to={`/${login}/${repository}/${this.state.page - 1}`}
                    >
                        Prev
                    </Link>
                </button>
                    <span className='pagination__page'>{this.state.page}</span>
                <button className='pagination__next' onClick={() => this.handleClick('next')} disabled={issues.length < this.state.perPage}>
                    <Link 
                        className='search__button' 
                        to={`/${login}/${repository}/${this.state.page + 1}`}
                    >
                        Next
                    </Link>
                </button>
            </div>

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
            <div className='list-issue'>
                <div className='list-issue-header'>Issues</div>
                <IssuesList 
                    issues={issues} 
                    login={login}
                    repository={repository}
                />
            </div>
        </div>
        ;
    }
}

export default connect(
    state => ({
        issues: state.issue.issues,
        loading: state.issue.loadingIssues,
    }),
    { fetchIssues }
)(IssuesListContainer);

