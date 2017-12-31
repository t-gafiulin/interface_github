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

    handleClick(){
        this.props.fetchIssues(this.state.login, this.state.repositoryName);
        this.setState({login: '', repositoryName: ''});
    }

    render(){
        const issues = this.props.issues.map(child => 
            <p>{child.number} {child.title} {child.created_at}</p>
        )
        return <div>
            <input value={this.state.login} onChange={this.handleChange.bind(this, 'login')} />
            <input value={this.state.repositoryName} onChange={this.handleChange.bind(this, 'repositoryName')} />
            <button onClick={this.handleClick.bind(this)} >Search</button>
            <p>{issues}</p>
        </div>;
    }
}

export default connect(
    state => ({
        issues: state.issue.issues
    }),
    { fetchIssues }
)(Search);