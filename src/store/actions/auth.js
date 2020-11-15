
import * as actionTypes from './actionTypes';
//synchronous action creators for adding and removing items from burger.
import axios from 'axios';


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
            dispatch(authSuccess(response.data));
        })
        .catch(err => {
            console.log(err);
            dispatch(authFailure(err))
        });
        

    }
}