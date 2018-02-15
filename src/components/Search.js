import React from 'react';
import { Link } from 'react-router-dom';
import '../resource/Search.css';

const Search = ({login, repository, handleFocus, handleChange}) => {         
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
                    onFocus={handleFocus}
                    onChange={(e) => handleChange('repository', e)} 
                    placeholder='Repository name'/>
                <Link 
                    className='search__button' 
                    to={`/${login}/${repository}`}>Search</Link> 
            </div>
        </div>;
}

export default Search;