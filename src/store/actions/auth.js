
import * as actionTypes from './actionTypes';
//synchronous action creators for adding and removing items from burger.
import axios from 'axios';


export const authStart = () => {

    return {

        type: actionTypes.AUTH_START
 
    };
};

export const authSuccess = (token, userId) => {


    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFailure = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};


export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return {

        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            //logoutmethod
            dispatch(logout());
        }, expirationTime * 1000);
    }
}

//asynch action creator which will be doing the auth stuff.
export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        //post data to axios with api key, structure of data to be passed with request.
       //store data in auth javascript object.
        const authData = {
            email : email,
            password: password,
            returnSecureToken: true
        }
        //different links for endpoints to signing in and signing up.
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDURCHiHFax8SkAahbidFX6ai1EFfbIvWA';
        if(!isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDURCHiHFax8SkAahbidFX6ai1EFfbIvWA';
        }

        axios.post(url, authData)
        .then(response => {
            console.log(response);
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);

            dispatch(authSuccess(response.data.idToken, response.data.localId));
            //check auth expiration time.
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err => {
            dispatch(authFailure(err.response.data.error))
        });
        

    }
}

//synchronous action creator for the auth redirect
export const setAuthRedirect = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate > new Date){
                dispatch(authSuccess(token, ));
            } else {
            dispatch(logout());
            }
        }
    }
}