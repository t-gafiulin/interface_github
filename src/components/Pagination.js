import React, { Component } from 'react';
import '../resource/Pagination.css';


export default class Pagination extends Component {
    constructor(props){
        super(props);
    }

    getPageButtons(pages, activePageNumber, handleClick){

        if(activePageNumber === 1){
            return <div>
                <button className='firstPrevNextLast ' disabled>First</button>
                <button className='firstPrevNextLast ' disabled>Prev</button>
                <button className='active' onClick={handleClick.bind(null, 1)}>1</button>
                <button className='' onClick={handleClick.bind(null, 2)}>2</button>
                <button className='' onClick={handleClick.bind(null, 3)}>3</button>
                <button className='firstPrevNextLast ' onClick={handleClick.bind(null, activePageNumber + 1)}>Next</button>
                <button className='firstPrevNextLast ' onClick={handleClick.bind(null, pages)}>Last</button>
            </div>
        } else if (activePageNumber === pages) {
            return <div>
                <button className='firstPrevNextLast ' onClick={handleClick.bind(null, 1)}>First</button>
                <button className='firstPrevNextLast ' onClick={handleClick.bind(null, pages - 1)}>Prev</button>
                <button className='' onClick={handleClick.bind(null, pages - 2)}>{pages - 2}</button>
                <button className='' onClick={handleClick.bind(null, pages - 1)}>{pages - 1}</button>
                <button className='active' onClick={handleClick.bind(null, pages)}>{pages}</button>
                <button className='firstPrevNextLast ' disabled>Next</button>
                <button className='firstPrevNextLast ' disabled>Last</button>
            </div>
        } else {
            return <div>
                <button className='firstPrevNextLast ' onClick={handleClick.bind(null, 1)}>First</button>
                <button className='firstPrevNextLast ' onClick={handleClick.bind(null, activePageNumber - 1)}>Prev</button>
                <button className='' onClick={handleClick.bind(null, activePageNumber - 1)}>{activePageNumber - 1}</button>
                <button className='active' onClick={handleClick.bind(null, activePageNumber)}>{activePageNumber}</button>
                <button className='' onClick={handleClick.bind(null, activePageNumber + 1)}>{activePageNumber + 1}</button>
                <button className='firstPrevNextLast ' onClick={handleClick.bind(null, activePageNumber + 1)}>Next</button>
                <button className='firstPrevNextLast ' onClick={handleClick.bind(null, pages)}>Last</button>
            </div>
        }
        
    }

    render() {
        const { pages, activePageNumber, handleClick } = this.props;

        let buttons = this.getPageButtons(pages, activePageNumber, handleClick);

        return <div className='pagintaionButtons'>
            {buttons}
        </div>
    }
}