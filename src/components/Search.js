import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchIssues, fetchIssue } from '../AC';
import Loader from './LoadingIndicator';
import { Link } from 'react-router-dom';
import IssuesItem from './IssuesItem';
import '../resource/Search.css';

class Search extends Component {
    constructor(props){
        super(props);

        this.state = {
            login: '',
            repositoryName: '',
            perPage: '30',
        }
  
    }

    handleChange = (stateName, event) => {
        this.setState({[stateName]: event.target.value});
    }

    handleClick = (nextOrPrevButton) => {
        const {login, repositoryName, page, fetchIssues} = this.props;
        if(nextOrPrevButton === 'next') {
           fetchIssues(login, repositoryName, page + 1, this.state.perPage);
        } else if (nextOrPrevButton === 'prev') {
            fetchIssues(login, repositoryName, page - 1, this.state.perPage);
        } else if (nextOrPrevButton === 'perPage') {
            fetchIssues(login, repositoryName, 1, this.state.perPage);
        } else {
            this.setState({login: '', repositoryName: ''});
            fetchIssues(this.state.login, this.state.repositoryName, page, this.state.perPage);
        }
    }

    handleClickIssue(number){
        const { fetchIssue, login, repositoryName } = this.props;
        fetchIssue(login, repositoryName, number);
    }

    render(){
        const issues = this.props.issues.map((child, index) => 
            <IssuesItem 
                title={child.title}
                number={child.number}
                date={child.created_at}
                login={child.user.login}
                url={child.user.html_url}
                labels={child.labels}
                comments_amount={child.comments}
                handleClick={this.handleClickIssue.bind(this)}
            />
        )

        let data = this.props.loading ? 
            <Loader /> : (this.props.error ? 
                <p>Not found</p> : <div className='list-issue'><div className='list-issue-header'>Issues</div>{issues}</div>);
                
        return <div className='container'>
            <div className='search'>
                <input 
                    className='search__login'
                    value={this.state.login} 
                    onChange={(e) => this.handleChange('login', e)}
                    placeholder='Login for Github' />
                <input 
                    className='search__repository'
                    value={this.state.repositoryName} 
                    onChange={(e) => this.handleChange('repositoryName', e)} 
                    placeholder='Repository name'/>
                <Link 
                    className='search__button' 
                    onClick={this.handleClick}
                    to={`/${this.state.login}/${this.state.repositoryName}`}>Search</Link> 
            </div>
            

            <div className='pagination'>
                <button className='pagination__prev' onClick={() => this.handleClick('prev')} disabled={this.props.page === 1}>Prev</button>
                    <span className='pagination__page'>{this.props.page}</span>
                <button className='pagination__next' onClick={() => this.handleClick('next')} disabled={issues.length < this.props.perPage}>Next</button>
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
            {data}
        </div>;
    }
}

export default connect(
    state => ({
        issues: state.issue.issues,
        page: state.issue.page,
        login: state.issue.login,
        repositoryName: state.issue.repositoryName,
        perPage: state.issue.perPage,
        loading: state.issue.loading,
        error: state.issue.error,
    }),
    { fetchIssues, fetchIssue }
)(Search);