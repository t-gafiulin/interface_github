import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchRepositories } from '../AC';
import Search from '../components/Search';

class SearchContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            login: this.props.match.params.login || '',
            repository: '',
        }
    }

    componentWillMount(){
        const { login } = this.props.match.params;
        if(login)
            this.props.fetchRepositories(login);   
    }

    handleChange = (stateName, event) => {
        this.setState({[stateName]: event.target.value});
    }

    render(){

        return <div>
            <Search
                login={this.state.login}
                repository={this.state.repository}
                handleChange={this.handleChange.bind(this)}
            />
        </div>
        ;
    }
}

export default connect(
    state => ({
        repositories: state.issue.repositories,
    }),
    { fetchRepositories }
)(SearchContainer);

