import React from 'react';

const SelectQuantity = ({ perPage, handleChange, handleClick }) => {
    return <select 
        className='select-block'
        value={perPage} 
        onChange={(e) => handleChange('perPage', e)} 
        onClick={() => handleClick('perPage')}
    >
        <option value="1">1</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="30">30</option>
        <option value="50">50</option>
        <option value="100">100</option>
    </select>
}

export default SelectQuantity;