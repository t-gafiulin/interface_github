import { 
    LOAD_ISSUES_ERROR, LOAD_ISSUES_REQUEST, LOAD_ISSUES_SUCCESS, 
    LOAD_ISSUE_SUCCESS, LOAD_COMMENTS_SUCCESS, LOAD_ISSUE_REQUEST
} from '../constants/index';

const initialState = {
    issues: [],
    login: '',
    repositoryName: '',
    page: 1,
    perPage: '30',
    loading: false,
    error: false,
    issue: null,
    issueLoad: false,
    comments: [],
}

export default function issue(state = initialState, action){
    switch(action.type){
        case LOAD_ISSUES_SUCCESS:
            const {issues, login, repositoryName, page, perPage} = action;
            console.log(action);
            return {
                ...state,
                issues: issues,
                login: login,
                repositoryName: repositoryName,
                page: page,
                perPage: perPage,
                loading: false,
                error: false,
            } 
        case LOAD_ISSUES_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            }
        case LOAD_ISSUES_ERROR:
            return {
                ...state,
                loading: false,
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