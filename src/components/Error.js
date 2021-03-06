import React from 'react';
import { 
    LOAD_ISSUES_ERROR, 
    LOAD_REPOSITORIES_ERROR,
    LOAD_USER_ERROR,
    LOAD_ISSUE_ERROR,
    USER_HAS_NOT_REPOSITORIES,
    
} from '../constants/index';

const Error = ({type}) => {
    let error_message;
    switch(type){
        case LOAD_ISSUES_ERROR:
            error_message = "This page of issues doesn't exist";
            break;
        case LOAD_USER_ERROR:
            error_message = "This user doesn't exist";
            break;
        case LOAD_REPOSITORIES_ERROR:
            error_message = "This user doesn't exist";
            break;
        case LOAD_ISSUE_ERROR:
            error_message = "This issue doesn't exist";
            break;
        case USER_HAS_NOT_REPOSITORIES:
            error_message = "This user hasn't any repositories";
            break;
        default:
            error_message = "Unknown error";
    }

    return <h3>{error_message}</h3>
}

export default Error;