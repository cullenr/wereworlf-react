import * as firebase from 'firebase/app';
import { AUTH_REQUEST_PENDING } from '../constants.js'

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const login = () => async (dispatch, getState) => {
    // early out if we are already logging in
    if(getState().reqStatus === AUTH_REQUEST_PENDING) {
        return;
    }

    dispatch({type: LOGIN_REQUEST});
    try {
        const res = await firebase.auth().signInAnonymously();
        dispatch({type: LOGIN_SUCCESS, user: res.user});
    } catch(err) {
        dispatch({type: LOGIN_FAILURE, message: err.message });
    }
}

export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';
export const updateProfile = (displayName) => async (dispatch, getState) => {
    if(!getState().uid || !firebase.auth().currentUser()) {
        dispatch({type: UPDATE_PROFILE_FAILURE });
        return;
    }

    try {
        await firebase.auth().currentUser().updateProfile({displayName});
        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            // avoid hoisting the user and use the getter, the promise above
            // does not contain the new user.
            uid: firebase.auth().currentUser().uid,
            displayName: firebase.auth().currentUser().displayName,
        });
    } catch(err) {
        dispatch({type: UPDATE_PROFILE_FAILURE, message: err.message });
    }
}
