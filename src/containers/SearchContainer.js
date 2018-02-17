import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../AC';
import Search from '../components/Search';
import Error from '../components/Error';
import { LOAD_REPOSITORIES_ERROR, LOAD_USER_ERROR, USER_HAS_NOT_REPOSITORIES } from '../constants/index';

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
            this.props.fetchUser(login);   
    }

    handleFocus = () => {
        this.props.fetchUser(this.state.login);  
    }

    handleChange = (stateName, event) => {
        this.setState({[stateName]: event.target.value});
    }

    render(){
        const { count_rep, loadUserError, loadRepositoriesError } = this.props;

        const errors = <div>
                {loadUserError ? <Error type={LOAD_USER_ERROR} /> : 
                    loadRepositoriesError ? 
                        <Error type={LOAD_REPOSITORIES_ERROR} /> : 
                        count_rep === 0 ?
                            <Error type={USER_HAS_NOT_REPOSITORIES} /> : ''
                }
            </div>

        return <div>
            <Search
                login={this.state.login}
                repository={this.state.repository}
                handleFocus={this.handleFocus}
                handleChange={this.handleChange}
            />
            <div>{errors}</div>
        </div>
        ;
    }
}

export default connect(
    state => ({
        count_rep: state.issue.count_rep,
        loadUserError: state.issue.loadUserError,
        loadRepositoriesError: state.issue.loadRepositoriesError,
    }),
    { fetchUser }
)(SearchContainer);

