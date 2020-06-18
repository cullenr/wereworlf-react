import { combineReducers } from 'redux'
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
} from './actions.js';

import {
    AUTH_REQUEST_PENDING,
    AUTH_REQUEST_SUCCESS,
    AUTH_REQUEST_FAILURE    
} from '../constants.js'

const auth = (state = {
    name: 'unnamed player'
}, action) => {
    switch(action.type) {
        case LOGIN_REQUEST:
        case UPDATE_PROFILE_REQUEST:
            return Object.assign({}, state, {
                reqStatus: AUTH_REQUEST_PENDING,
                message: action.message
            });
        case LOGIN_FAILURE:
        case UPDATE_PROFILE_REQUEST:
            return Object.assign({}, state, {
                reqStatus: AUTH_REQUEST_FAILURE,
                message: action.message
            });
        case LOGIN_SUCCESS:
        case UPDATE_PROFILE_SUCCESS:
            const obj = Object.assign({}, state, {
                reqStatus: AUTH_REQUEST_SUCCESS,
                uid: action.user.uid,
                name: action.user.displayName
            });
            return obj;
        default:
            return state;
    }
}

export default combineReducers({ auth });
