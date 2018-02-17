import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../resource/Pagination.css';


export default class Pagination extends Component {
    constructor(props){
        super(props);
    }

    getPageButtons(pages, activePageNumber, handleClick, login, repository){
        return <div className='pagination-block'>
            <button 
                className='firstPrevNextLast pagination-block__button' 
                disabled={activePageNumber <= 1}
                onClick={handleClick.bind(null, 1)}
            >
            {
                activePageNumber > 1 ? 
                <Link className='pagination-block__link' to={`/${login}/${repository}/${1}`}>First</Link> :
                'First'
            }
            </button>
            <button 
                className='firstPrevNextLast pagination-block__button' 
                disabled={activePageNumber <= 1}
                onClick={handleClick.bind(null, activePageNumber - 1)}
            >
            {
                activePageNumber > 1 ? 
                <Link className='pagination-block__link' to={`/${login}/${repository}/${activePageNumber - 1}`}>Prev</Link> :
                'Prev'
            }
            </button>
            <button 
                className='numbers pagination-block__button' 
                onClick={handleClick.bind(null, activePageNumber - 1)}
                hidden={activePageNumber <= 1}
            >
                <Link className='pagination-block__link' to={`/${login}/${repository}/${activePageNumber - 1}`}>{activePageNumber - 1}</Link>
            </button>
            <button 
                className='pagination-block__button pagination-block__button--active' 
                onClick={handleClick.bind(null, activePageNumber)}
            >
                <Link className='pagination-block__link pagination-block__link--active' to={`/${login}/${repository}/${activePageNumber}`}>{activePageNumber}</Link>
            </button>
            <button 
                className='pagination-block__button' 
                onClick={handleClick.bind(null, activePageNumber + 1)}
                hidden={activePageNumber >= pages}
            >
                <Link className='pagination-block__link' to={`/${login}/${repository}/${activePageNumber + 1}`}>{activePageNumber + 1}</Link>
            </button>
            <button 
                className='firstPrevNextLast pagination-block__button' 
                onClick={handleClick.bind(null, activePageNumber + 1)}
                disabled={activePageNumber >= pages}
            >
            {
                activePageNumber < pages ? 
                <Link className='pagination-block__link' to={`/${login}/${repository}/${activePageNumber + 1}`}>Next</Link>:
                'Next'
            }
            </button>
            <button 
                className='firstPrevNextLast pagination-block__button' 
                onClick={handleClick.bind(null, pages)}
                disabled={activePageNumber >= pages}
            >
                {
                    activePageNumber < pages ? 
                        <Link className='pagination-block__link' to={`/${login}/${repository}/${pages}`}>Last</Link> :
                        'Last'
                }
            </button>
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