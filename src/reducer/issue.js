import { 
    LOAD_ISSUES_ERROR, LOAD_ISSUES_REQUEST, LOAD_ISSUES_SUCCESS, 
    LOAD_ISSUE_SUCCESS, LOAD_ISSUE_ERROR, LOAD_ISSUE_REQUEST, 
    LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_ERROR,
    LOAD_USER_ERROR, LOAD_USER_REQUEST, LOAD_USER_SUCCESS,
    LOAD_ISSUES_COUNT_SUCCESS,
} from '../constants/index';

const initialState = {
    issues: [],
    login: '',
    repositoryName: '',
    loading: false,
    loadIssueError: false,
    loadIssuesError: false,
    loadRepositoriesError: false,
    loadUserError: false,
    loadCommentsError: false,
    issue: null,
    issueLoad: true,
    comments: [],
    loadingIssues: true,
    count_rep: -1,
    issuesCount: 1,
}

export default function issue(state = initialState, action){
    switch(action.type){
        case LOAD_ISSUES_SUCCESS:
            const {issues, login, repositoryName, perPage} = action;
            return {
                ...state,
                issues: issues,
                login: login,
                repositoryName: repositoryName,
                loadingIssues: false,
                loadIssuesError: false,
            } 
        case LOAD_ISSUES_REQUEST:
            return {
                ...state,
                loadingIssues: true,
                loadIssuesError: false,
            }
        case LOAD_ISSUES_ERROR:
            return {
                ...state,
                loadingIssues: false,
                loadIssuesError: true,
            }
        case LOAD_ISSUE_SUCCESS:
            return {
                ...state,
                issue: action.issue,
                issueLoad: false,
                loadIssueError: false
            }
        case LOAD_ISSUE_REQUEST:
            return {
                ...state,
                issueLoad: true,
                loadIssueError: false,
            }
        case LOAD_ISSUE_ERROR:
            return {
                ...state,
                loadIssueError: true,
            }
        case LOAD_COMMENTS_SUCCESS:
            return {
                ...state,
                comments: action.comments,
                loadCommentsError: false,
            }
        case LOAD_COMMENTS_ERROR:
            return {
                ...state,
                loadCommentsError: true,
            }
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                count_rep: action.count_rep,
                loadUserError: false,
            }
        case LOAD_USER_ERROR:
            return {
                ...state,
                loadUserError: true,
            }
        case LOAD_ISSUES_COUNT_SUCCESS:
            return {
                ...state,
                issuesCount: action.issuesCount,
            }
        default:
            return state;
    }
}