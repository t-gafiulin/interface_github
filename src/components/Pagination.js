import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../resource/Pagination.css';


export default class Pagination extends Component {
    constructor(props){
        super(props);
    }

    getPageButtons(pages, activePageNumber, handleClick, login, repository){
        return <div className='pagination-block'>

            <Link className='pagination-block__link' to={`/${login}/${repository}/${1}`}>
                <button 
                    className={`firstPrevNextLast pagination-block__button ${activePageNumber <= 1 ? 'pagination-block__button--disabled': ''}`}
                    disabled={activePageNumber <= 1}
                    onClick={handleClick.bind(null, 1)}
                >
                    First
                </button>
            </Link>
            <Link className='pagination-block__link' to={`/${login}/${repository}/${activePageNumber - 1}`}>
                <button 
                    className={`firstPrevNextLast pagination-block__button ${activePageNumber <= 1 ? 'pagination-block__button--disabled': ''}`}
                    disabled={activePageNumber <= 1}
                    onClick={handleClick.bind(null, activePageNumber - 1)}
                >
                    Prev
                </button>
            </Link>
            <Link className='pagination-block__link' to={`/${login}/${repository}/${activePageNumber - 1}`}>
                <button 
                    className='numbers pagination-block__button' 
                    onClick={handleClick.bind(null, activePageNumber - 1)}
                    hidden={activePageNumber <= 1}
                >
                    {activePageNumber - 1}
                </button>
            </Link>
            <Link className='pagination-block__link pagination-block__link--active' to={`/${login}/${repository}/${activePageNumber}`}>
                <button 
                    className='pagination-block__button pagination-block__button--active' 
                    onClick={handleClick.bind(null, activePageNumber)}
                >
                    {activePageNumber}
                </button>
            </Link>
            <Link className='pagination-block__link' to={`/${login}/${repository}/${activePageNumber + 1}`}>
                <button 
                    className='pagination-block__button' 
                    onClick={handleClick.bind(null, activePageNumber + 1)}
                    hidden={activePageNumber >= pages}
                >
                    {activePageNumber + 1}
                </button>
            </Link>
            <Link className='pagination-block__link' to={`/${login}/${repository}/${activePageNumber + 1}`}>
                <button 
                    className={`firstPrevNextLast pagination-block__button ${activePageNumber >= pages ? 'pagination-block__button--disabled': ''}`}
                    onClick={handleClick.bind(null, activePageNumber + 1)}
                    disabled={activePageNumber >= pages}
                >
                    Next
                </button>
            </Link>
            <Link className='pagination-block__link' to={`/${login}/${repository}/${pages}`}>
                <button 
                    className={`firstPrevNextLast pagination-block__button ${activePageNumber >= pages ? 'pagination-block__button--disabled': ''}`}
                    onClick={handleClick.bind(null, pages)}
                    disabled={activePageNumber >= pages}
                >
                    Last
                </button>
            </Link>
        </div>      
    }

    render() {
        const { pages, activePageNumber, handleClick, login, repository } = this.props;

        let buttons = this.getPageButtons(pages, activePageNumber, handleClick, login, repository);

        return <div className='pagination'>
            {buttons}
        </div>
    }
}