import { 
    LOAD_ISSUES_ERROR, LOAD_ISSUES_REQUEST, LOAD_ISSUES_SUCCESS, 
    LOAD_ISSUE_SUCCESS, LOAD_COMMENTS_SUCCESS, LOAD_ISSUE_REQUEST, LOAD_ISSUE_ERROR,
    LOAD_REPOSITORIES_ERROR, LOAD_REPOSITORIES_REQUEST, LOAD_REPOSITORIES_SUCCESS,
} from '../constants/index';

function receiveIssues(json, login, repositoryName){
    return {
        type: LOAD_ISSUES_SUCCESS,
        issues: json,
        login: login,
        repositoryName: repositoryName,
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

function receiveRepositories ( json ) {
    return {
        type: LOAD_REPOSITORIES_SUCCESS,
        repositories: json,
    }
}

export function fetchRepositories(login){
    return function(dispatch){
        dispatch({
            type: LOAD_REPOSITORIES_REQUEST,
        });

        return fetch(`https://api.github.com/users/${login}/repos?per_page=200&client_id=83d15c2761e543bf26ff&client_secret=87fbe74939b37b342e080a59dfe0573632ea1881`)
        .then( response => response.json())
        .then( 
            json => {
                if(!json.message)
                    dispatch(receiveRepositories( json ));
                else
                    dispatch({
                        type: LOAD_REPOSITORIES_ERROR,
                    });
            })
    }
}

export function fetchIssues(login, repositoryName, page, perPage){
    return function(dispatch){
        dispatch({
            type: LOAD_ISSUES_REQUEST,
        });

        return fetch(`https://api.github.com/repos/${login}/${repositoryName}/issues?page=${page}&per_page=${perPage}&client_id=83d15c2761e543bf26ff&client_secret=87fbe74939b37b342e080a59dfe0573632ea1881`)
        .then( response => response.json())
        .then( 
            json => {
                if(!json.message)
                    dispatch(receiveIssues(json, login, repositoryName));
                else
                    dispatch({
                        type: LOAD_ISSUES_ERROR,
                    });
            })
    }
}

export function fetchIssue(login, repositoryName, numberIssue){
    return function(dispatch){
        dispatch({
            type: LOAD_ISSUE_REQUEST,
        });
        
        return Promise.all([
            fetch(`https://api.github.com/repos/${login}/${repositoryName}/issues/${numberIssue}?&client_id=83d15c2761e543bf26ff&client_secret=87fbe74939b37b342e080a59dfe0573632ea1881`)
            .then( response => response.json())
            .then( 
                json => {
                    dispatch(receiveIssue(json)) 

                    if(!json.message)
                        dispatch(receiveIssue(json));
                    else
                        dispatch({
                            type: LOAD_ISSUE_ERROR,
                        });

                }
                
            )
            .catch (error => console.log(error)),

            fetch(`https://api.github.com/repos/${login}/${repositoryName}/issues/${numberIssue}/comments?&client_id=83d15c2761e543bf26ff&client_secret=87fbe74939b37b342e080a59dfe0573632ea1881`)
            .then( response => response.json())
            .then( json => {
                dispatch(receiveComment(json)) 
            })
            .catch (error => console.log(error))
        ])
    }
}