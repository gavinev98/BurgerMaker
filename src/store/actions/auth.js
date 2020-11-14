
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
export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        //post data to axios with api key, structure of data to be passed with request.
        const authData = {
            email : email,
            password: password,
            returnSecureToken: true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AAAA6mq6p0c:APA91bEzAWEVl8yya3hwCZwEpqQHX6SiukAUi2yvOFYHVbigFjjVpkRHJvqnmfvgXRNUiy3nra3g7cUCSlLg976LM9Z7k8mHXOOSaM8mphKBUz08hdFn-Pyu7A9yDz8n88cfPjoWy1QQ', authData)
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