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

export function fetchIssues(login, repositoryName, page, perPage){
    return function(dispatch){
        dispatch({
            type: LOAD_ISSUES_REQUEST,
        });

        return fetch(`https://api.github.com/repos/${login}/${repositoryName}/issues?page=${page}&per_page=${perPage}`)
        .then( response => response.json())
        .then( 
            json => {
                if(!json.message)
                    dispatch(receiveIssues(json, login, repositoryName, page, perPage));
                else
                    dispatch({
                        type: LOAD_ISSUES_ERROR,
                    });
            })
        .error( error => console.log(error))
    }
}