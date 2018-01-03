import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchIssues } from '../AC';


class Search extends Component {
    constructor(props){
        super(props);

        this.state = {
            login: '',
            repositoryName: ''
        }
    
    }

    handleChange(stateName, event){
        this.setState({[stateName]: event.target.value});
    }

    handleClick(nextOrPrevButton){
        if(nextOrPrevButton === 'next') {
            this.props.fetchIssues(this.props.login, this.props.repositoryName, this.props.page + 1);
        } else if (nextOrPrevButton === 'prev') {
            this.props.fetchIssues(this.props.login, this.props.repositoryName, this.props.page - 1);
        } else {
            this.props.fetchIssues(this.state.login, this.state.repositoryName, this.props.page);
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
            <button onClick={this.handleClick.bind(this)} >Search</button>
            <br />
            <button onClick={this.handleClick.bind(this, 'prev')}>Prev</button>
                {this.props.page}
            <button onClick={this.handleClick.bind(this, 'next')}>Next</button>
            <p>{issues}</p>
        </div>;
    }
}

export default connect(
    state => ({
        issues: state.issue.issues,
        page: state.issue.page,
        login: state.issue.login,
        repositoryName: state.issue.repositoryName,
    }),
    { fetchIssues }
)(Search);