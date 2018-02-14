import { 
    LOAD_ISSUES_ERROR, LOAD_ISSUES_REQUEST, LOAD_ISSUES_SUCCESS, 
    LOAD_ISSUE_SUCCESS, LOAD_COMMENTS_SUCCESS, LOAD_ISSUE_REQUEST
} from '../constants/index';

const initialState = {
    issues: [],
    login: '',
    repositoryName: '',
    loading: false,
    error: false,
    issue: null,
    issueLoad: true,
    comments: [],
    loadingIssues: true,
}

export default function issue(state = initialState, action){
    switch(action.type){
        case LOAD_ISSUES_SUCCESS:
            const {issues, login, repositoryName} = action;
            return {
                ...state,
                issues: issues,
                login: login,
                repositoryName: repositoryName,
                loadingIssues: false,
                error: false,
            } 
        case LOAD_ISSUES_REQUEST:
            return {
                ...state,
                loadingIssues: true,
                error: false,
            }
        case LOAD_ISSUES_ERROR:
            return {
                ...state,
                loadingIssues: false,
                error: true,
            }
        case LOAD_ISSUE_SUCCESS:
            return {
                ...state,
                issue: action.issue,
                issueLoad: false,
            }
        case LOAD_ISSUE_REQUEST:
            return {
                ...state,
                issueLoad: true,
            }
        case LOAD_COMMENTS_SUCCESS:
            return {
                ...state,
                comments: action.comments,
            }
        default:
            return state;
    }
}