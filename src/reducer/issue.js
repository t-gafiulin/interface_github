import { LOAD_ISSUES_ERROR, LOAD_ISSUES_REQUEST, LOAD_ISSUES_SUCCESS } from '../constants/index';

const initialState = {
    issues: []
}

export default function issue(state = initialState, action){
    switch(action.type){
        case LOAD_ISSUES_SUCCESS:
            return {
                ...state,
                issues: action.issues
            } 
        default:
            return state;
    }
}