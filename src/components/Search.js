import React from 'react';
import { Link } from 'react-router-dom';
import '../resource/Search.css';

const Search = ({login, repository, handleChange}) => {   
        console.log(`/${login}/${repository}`);        
        return <div className='container'>
            <div className='search'>
                <input 
                    className='search__login'
                    value={login} 
                    onChange={(e) => handleChange('login', e)}
                    placeholder='Login for Github' />
                <input 
                    className='search__repository'
                    value={repository} 
                    onChange={(e) => handleChange('repository', e)} 
                    placeholder='Repository name'/>
                <Link 
                    className='search__button' 
                    to={`/${login}/${repository}`}>Search</Link> 
            </div>
        </div>;
}

export default Search;