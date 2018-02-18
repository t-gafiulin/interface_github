import React from 'react';
import { Link } from 'react-router-dom';

const BackButton = ({path}) => {
    console.log(path);
    return <div className='back-button'>
        <Link to={path}><button>Back</button></Link>
    </div>;
}

export default BackButton;