import React, { Component } from 'react';


export default class Pagination extends Component {
    constructor(props){
        super(props);
    }

    getPageButtons(pages, activePageNumber, handleClick){

        if(activePageNumber === 1){
            return <div>
                <button disabled>First</button>
                <button disabled>Prev</button>
                <button onClick={handleClick.bind(null, 1)}>1</button>
                <button onClick={handleClick.bind(null, 2)}>2</button>
                <button onClick={handleClick.bind(null, 3)}>3</button>
                <button onClick={handleClick.bind(null, activePageNumber + 1)}>Next</button>
                <button onClick={handleClick.bind(null, pages)}>Last</button>
            </div>
        } else if (activePageNumber === pages) {
            return <div>
                <button onClick={handleClick.bind(null, 1)}>First</button>
                <button onClick={handleClick.bind(null, pages - 1)}>Prev</button>
                <button onClick={handleClick.bind(null, pages - 2)}>{pages - 2}</button>
                <button onClick={handleClick.bind(null, pages - 1)}>{pages - 1}</button>
                <button onClick={handleClick.bind(null, pages)}>{pages}</button>
                <button disabled>Next</button>
                <button disabled>Last</button>
            </div>
        } else {
            return <div>
                <button onClick={handleClick.bind(null, 1)}>First</button>
                <button onClick={handleClick.bind(null, activePageNumber - 1)}>Prev</button>
                <button onClick={handleClick.bind(null, activePageNumber - 1)}>{activePageNumber - 1}</button>
                <button onClick={handleClick.bind(null, activePageNumber)}>{activePageNumber}</button>
                <button onClick={handleClick.bind(null, activePageNumber + 1)}>{activePageNumber + 1}</button>
                <button onClick={handleClick.bind(null, activePageNumber + 1)}>Next</button>
                <button onClick={handleClick.bind(null, pages)}>Last</button>
            </div>
        }
        
    }

    render() {
        const { pages, activePageNumber, handleClick } = this.props;

        let buttons = this.getPageButtons(pages, activePageNumber, handleClick);

        return <div>
            {buttons}
        </div>
    }
}