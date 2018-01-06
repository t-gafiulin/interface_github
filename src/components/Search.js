import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchIssues } from '../AC';
import Loader from './LoadingIndicator';

class Search extends Component {
    constructor(props){
        super(props);

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
        if(nextOrPrevButton === 'next') {
            this.props.fetchIssues(this.props.login, this.props.repositoryName, this.props.page + 1, this.state.perPage);
        } else if (nextOrPrevButton === 'prev') {
            this.props.fetchIssues(this.props.login, this.props.repositoryName, this.props.page - 1, this.state.perPage);
        } else if (nextOrPrevButton === 'perPage') {
            this.props.fetchIssues(this.props.login, this.props.repositoryName, this.props.page, this.state.perPage);
        } else {
            this.props.fetchIssues(this.state.login, this.state.repositoryName, this.props.page, this.state.perPage);
            this.setState({login: '', repositoryName: ''});
        }
    }

    render(){
        const issues = this.props.issues.map(child => 
            <p>{child.number} {child.title} {child.created_at}</p>
        )



        return <div>
            <input 
                value={this.state.login} 
                onChange={this.handleChange.bind(this, 'login')}
                placeholder='Login for Github' />
            <input 
                value={this.state.repositoryName} 
                onChange={this.handleChange.bind(this, 'repositoryName')} 
                placeholder='Repository name'/>
            <button onClick={this.handleClick.bind(this)}>Search</button>
            <h3>{(this.props.login + ' ' + this.props.repositoryName)}</h3>

            <button onClick={this.handleClick.bind(this, 'prev')} disabled={this.props.page === 1}>Prev</button>
                {this.props.page}
            <button onClick={this.handleClick.bind(this, 'next')} disabled={issues.length < this.props.perPage}>Next</button>

            <select 
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
            {this.props.loading ? <Loader /> : <p>{issues}</p> }
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
    }),
    { fetchIssues }
)(Search);