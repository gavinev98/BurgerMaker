
import * as actionTypes from './actionTypes';


export const authStart = () => {

    return {

        type: actionTypes.AUTH_START
 
    };
};

export const authSuccess = (authData) => {

    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFailure = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

//asynch action creator which will be doing the auth stuff.
export const auth = (email, pasword) => {
    return dispatch => {
        dispatch(authStart());

        

    }
}