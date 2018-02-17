import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../resource/Pagination.css';


export default class Pagination extends Component {
    constructor(props){
        super(props);
    }

    getPageButtons(pages, activePageNumber, handleClick, login, repository){
        return <div>
            <button 
                className='firstPrevNextLast ' 
                disabled={activePageNumber === 1}
                onClick={handleClick.bind(null, 1)}
            >
                <Link disabled={activePageNumber === 1} to={`/${login}/${repository}/${1}`}>First</Link>
            </button>
            <button 
                className='firstPrevNextLast ' 
                disabled={activePageNumber === 1}
                onClick={handleClick.bind(null, activePageNumber - 1)}
            >
                <Link disabled={activePageNumber === 1} to={`/${login}/${repository}/${activePageNumber - 1}`}>Prev</Link>
            </button>
            <button 
                className='' 
                onClick={handleClick.bind(null, activePageNumber - 1)}
                hidden={activePageNumber === 1}
            >
                <Link to={`/${login}/${repository}/${activePageNumber - 1}`}>{activePageNumber - 1}</Link>
            </button>
            <button 
                className='active' 
                onClick={handleClick.bind(null, activePageNumber)}
            >
                <Link to={`/${login}/${repository}/${activePageNumber}`}>{activePageNumber}</Link>
            </button>
            <button 
                className='' 
                onClick={handleClick.bind(null, activePageNumber + 1)}
                hidden={activePageNumber === pages}
            >
                <Link to={`/${login}/${repository}/${activePageNumber + 1}`}>{activePageNumber + 1}</Link>
            </button>
            <button 
                className='firstPrevNextLast ' 
                onClick={handleClick.bind(null, activePageNumber + 1)}
                disabled={activePageNumber === pages}
            >
                <Link to={`/${login}/${repository}/${activePageNumber + 1}`}>Next</Link>
            </button>
            <button 
                className='firstPrevNextLast ' 
                onClick={handleClick.bind(null, pages)}
                disabled={activePageNumber === pages}
            >
                <Link to={`/${login}/${repository}/${pages}`}>Last</Link>
            </button>
        </div>      
    }

    render() {
        const { pages, activePageNumber, handleClick, login, repository } = this.props;

        let buttons = this.getPageButtons(pages, activePageNumber, handleClick, login, repository);

        return <div className='pagintaionButtons'>
            {buttons}
        </div>
    }
}