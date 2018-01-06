import { LOAD_ISSUES_ERROR, LOAD_ISSUES_REQUEST, LOAD_ISSUES_SUCCESS } from '../constants/index';

function receiveIssues(json, login, repositoryName, page, perPage){
    return {
        type: LOAD_ISSUES_SUCCESS,
        issues: json,
        login: login,
        repositoryName: repositoryName,
        page: page,
        perPage: perPage,
    }
}

function loadIssuesRequest(){
    return {
        type: LOAD_ISSUES_REQUEST,
    }
}

export function fetchIssues(login, repositoryName, page, perPage){
    return function(dispatch){
        dispatch(loadIssuesRequest());

        return fetch(`https://api.github.com/repos/${login}/${repositoryName}/issues?page=${page}&per_page=${perPage}`)
        .then( response => response.json())
        .then( 
            json => {
                dispatch(receiveIssues(json, login, repositoryName, page, perPage))
            })
        .error( error => console.log(error))
    }
}