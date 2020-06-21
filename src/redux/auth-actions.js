import * as firebase from 'firebase/app';
import { AUTH_REQUEST_PENDING } from '../constants.js'

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const login = () => async (dispatch, getState) => {
    // ignore duplicated requests
    if(getState().reqStatus === AUTH_REQUEST_PENDING) {
        return;
    }

    dispatch({type: LOGIN_REQUEST});
    try {
        const res = await firebase.auth().signInAnonymously();
        dispatch({type: LOGIN_SUCCESS, user: {
            uid: res.user.uid,
            displayName: res.user.displayName
        }});
    } catch(err) {
        dispatch({type: LOGIN_FAILURE, message: err.message });
    }
}

export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';
export const updateProfile = (displayName) => async (dispatch, getState) => {
    // alternativly we could just let the reqiest fail
    if(!getState().auth.uid || !firebase.auth().currentUser) {
        dispatch({type: UPDATE_PROFILE_FAILURE });
        return;
    }

    // ignore duplicated requests - this brittle, in theis scenario it doesnt
    // matter but the pending request is also used for logging in which means we
    // could silently lose a request to update the profile if a user is not
    // logged in - it may be best to store the last action and reduce that to a
    // new map of pending operations or somthing.
    if(getState().reqStatus === AUTH_REQUEST_PENDING) {
        return;
    }

    dispatch({type: UPDATE_PROFILE_REQUEST});
    try {
        await firebase.auth().currentUser.updateProfile({displayName});
        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            user: {
                uid: firebase.auth().currentUser.uid,
                displayName: firebase.auth().currentUser.displayName
            }
        });
    } catch(err) {
        dispatch({type: UPDATE_PROFILE_FAILURE, message: err.message });
    }
}
