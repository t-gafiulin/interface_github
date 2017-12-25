import React, {Component} from 'react';


export default class Search extends Component {

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
        console.log(this.state.login, this.state.repositoryName);
        this.setState({login: '', repositoryName: ''});
    }

    render(){
        return <div>
            <input value={this.state.login} onChange={this.handleChange.bind(this, 'login')} />
            <input value={this.state.repositoryName} onChange={this.handleChange.bind(this, 'repositoryName')} />
            <button onClick={this.handleClick.bind(this)} >Search</button>
        </div>;
    }
}