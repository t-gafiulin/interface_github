import React, { Component } from 'react';
import '../resource/Pagination.css';


export default class Pagination extends Component {
    constructor(props){
        super(props);
    }

    getPageButtons(pages, activePageNumber, handleClick){
        return <div>
            <button 
                className='firstPrevNextLast ' 
                disabled={activePageNumber === 1}
                onClick={handleClick.bind(null, 1)}
            >First</button>
            <button 
                className='firstPrevNextLast ' 
                disabled={activePageNumber === 1}
                onClick={handleClick.bind(null, activePageNumber - 1)}
            >Prev</button>
            <button 
                className='' 
                onClick={handleClick.bind(null, activePageNumber - 1)}
                hidden={activePageNumber === 1}
            >{activePageNumber - 1}</button>
            <button 
                className='active' 
                onClick={handleClick.bind(null, activePageNumber)}>{activePageNumber}</button>
            <button 
                className='' 
                onClick={handleClick.bind(null, activePageNumber + 1)}
                hidden={activePageNumber === pages}
            >{activePageNumber + 1}</button>
            <button 
                className='firstPrevNextLast ' 
                onClick={handleClick.bind(null, activePageNumber + 1)}
                disabled={activePageNumber === pages}
            >Next</button>
            <button 
                className='firstPrevNextLast ' 
                onClick={handleClick.bind(null, pages)}
                disabled={activePageNumber === pages}
            >Last</button>
        </div>      
    }

    render() {
        const { pages, activePageNumber, handleClick } = this.props;

        let buttons = this.getPageButtons(pages, activePageNumber, handleClick);

        return <div className='pagintaionButtons'>
            {buttons}
        </div>
    }
}