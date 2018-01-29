import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchIssues, fetchIssue } from '../AC';
import Loader from './LoadingIndicator';
import Issue from './Issue';
import IssuesItem from './IssuesItem'
import { Link } from 'react-router-dom';
import '../resource/Search.css';

class Search extends Component {
    constructor(props){
        super(props);

        //this.handleClickIssue = this.handleClickIssue.bind(this);

        this.state = {
            login: '',
            repositoryName: '',
            perPage: '30',
        }
    
    }

    handleChange(stateName, event){
        this.setState({[stateName]: event.target.value});
    }

    handleClick(nextOrPrevButton){
        const {login, repositoryName, page, perPage} = this.props;
        if(nextOrPrevButton === 'next') {
            this.props.fetchIssues(login, repositoryName, page + 1, this.state.perPage);
        } else if (nextOrPrevButton === 'prev') {
            this.props.fetchIssues(login, repositoryName, page - 1, this.state.perPage);
        } else if (nextOrPrevButton === 'perPage') {
            this.props.fetchIssues(login, repositoryName, 1, this.state.perPage);
        } else {
            this.setState({login: '', repositoryName: ''});
            this.props.fetchIssues(this.state.login, this.state.repositoryName, this.props.page, this.state.perPage);
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
                <p>Not found</p> : <div class='list-issue'><div class='list-issue-header'>Issues</div>{issues}</div>);
                
        return <div class='container'>
            <div class='search'>
                <input 
                    class='search__login'
                    value={this.state.login} 
                    onChange={this.handleChange.bind(this, 'login')}
                    placeholder='Login for Github' />
                <input 
                    class='search__repository'
                    value={this.state.repositoryName} 
                    onChange={this.handleChange.bind(this, 'repositoryName')} 
                    placeholder='Repository name'/>
                <button 
                    class='search__button'
                    onClick={this.handleClick.bind(this)}>Search</button>
            </div>

            <h3>{(this.props.login + ' ' + this.props.repositoryName)}</h3>

            <div class='pagination'>
                <button class='pagination__prev' onClick={this.handleClick.bind(this, 'prev')} disabled={this.props.page === 1}>Prev</button>
                    <span class='pagination__page'>{this.props.page}</span>
                <button class='pagination__next' onClick={this.handleClick.bind(this, 'next')} disabled={issues.length < this.props.perPage}>Next</button>
            </div>

            <select 
                class='select-block'
                value={this.props.perPage} 
                onChange={this.handleChange.bind(this, 'perPage')} 
                onClick={this.handleClick.bind(this, 'perPage')}
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