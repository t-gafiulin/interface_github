import { 
    LOAD_ISSUES_ERROR, LOAD_ISSUES_REQUEST, LOAD_ISSUES_SUCCESS,
} from '../constants/index';

const initialState = {
    issues: [],
    login: '',
    repositoryName: '',
    page: 1,
    perPage: 30,
    loading: false,
}

export default function issue(state = initialState, action){
    switch(action.type){
        case LOAD_ISSUES_SUCCESS:
            const {issues, login, repositoryName, page, perPage} = action;
            return {
                ...state,
                issues: issues,
                login: login,
                repositoryName: repositoryName,
                page: page,
                perPage: perPage,
                loading: false,
            } 
        case LOAD_ISSUES_REQUEST:
            return {
                ...state,
                loading: true,
            }
        default:
            return state;
    }
}