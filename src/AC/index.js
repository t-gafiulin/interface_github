import { LOAD_ISSUES_ERROR, LOAD_ISSUES_REQUEST, LOAD_ISSUES_SUCCESS } from '../constants/index';

function receiveIssues(json, login, repositoryName, page){
    return {
        type: LOAD_ISSUES_SUCCESS,
        issues: json,
        login: login,
        repositoryName: repositoryName,
        page: page,
    }
}

export function fetchIssues(login, repositoryName, page){
    return function(dispatch){
        console.log(login, repositoryName, page);
        return fetch(`https://api.github.com/repos/${login}/${repositoryName}/issues?page=${page}`)
        .then( response => response.json())
        .then( 
            json => {
                dispatch(receiveIssues(json, login, repositoryName, page))
            })
    }
}