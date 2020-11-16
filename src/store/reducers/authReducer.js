import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../utility';
import { auth } from '../actions';


initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};


const authStart = (state, action) => {
    return  updateObject(state, {error: null, loading: true});
}

const authSucess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userID: action.userId,
        error: null,
        loading: false

    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false

    });
}



const reducer = (state, action) => {

    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSucess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
            default:
                return state;
    }

};




export default authReducer;