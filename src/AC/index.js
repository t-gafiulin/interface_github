import { 
    LOAD_ISSUES_ERROR, LOAD_ISSUES_REQUEST, LOAD_ISSUES_SUCCESS, 
    LOAD_ISSUE_SUCCESS, LOAD_COMMENTS_SUCCESS,
} from '../constants/index';

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

function receiveIssue( json ){
    return {
        type: LOAD_ISSUE_SUCCESS,
        issue: json,
    }
}

function receiveComment ( json ) {
    return {
        type: LOAD_COMMENTS_SUCCESS,
        comments: json,
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

export function fetchIssue(login, repositoryName, numberIssue){
    return function(dispatch){

        return Promise.all([
            fetch(`https://api.github.com/repos/${login}/${repositoryName}/issues/${numberIssue}`)
            .then( response => response.json())
            .then( json => {
                dispatch(receiveIssue(json)) 
            })
            .catch (error => console.log(error)),

            fetch(`https://api.github.com/repos/${login}/${repositoryName}/issues/${numberIssue}/comments`)
            .then( response => response.json())
            .then( json => {
                dispatch(receiveComment(json)) 
            })
            .catch (error => console.log(error))
        ])
    }
}