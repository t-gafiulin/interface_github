import { LOAD_ISSUES_ERROR, LOAD_ISSUES_REQUEST, LOAD_ISSUES_SUCCESS } from '../constants/index';

function receiveIssues(json){
    return {
        type: LOAD_ISSUES_SUCCESS,
        issues: json
    }
}


export function fetchIssues(login, repositoryName){
    return function(dispatch){
        return fetch(`https://api.github.com/repos/${login}/${repositoryName}/issues`)
        .then( response => response.json())
        .then( json => dispatch(receiveIssues(json)))
        //.catch( error => console.log(error.message))
    }
}