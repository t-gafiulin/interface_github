import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import '../resource/Search.css';

class Search extends Component {
    constructor(props){
        super(props);

        this.state = {
            login: '',
            repositoryName: '',
        }
  
    }

    handleChange = (stateName, event) => {
        this.setState({[stateName]: event.target.value});
    }

    render(){                
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
                    to={`/${this.state.login}/${this.state.repositoryName}`}>Search</Link> 
            </div>
        </div>;
    }
}

export default Search;