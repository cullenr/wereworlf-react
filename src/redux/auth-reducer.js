import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
} from './auth-actions.js';

import {
    DEFAULT_PLAYER_NAME,
    AUTH_REQUEST_PENDING,
    AUTH_REQUEST_SUCCESS,
    AUTH_REQUEST_FAILURE    
} from '../constants.js'

export default (state = {
    displayName: DEFAULT_PLAYER_NAME,
    message: ''
}, action) => {
    switch(action.type) {
        case LOGIN_REQUEST:
        case UPDATE_PROFILE_REQUEST:
            return Object.assign({}, state, {
                reqStatus: AUTH_REQUEST_PENDING,
                message: action.message
            });
        case LOGIN_FAILURE:
        case UPDATE_PROFILE_FAILURE:
            return Object.assign({}, state, {
                reqStatus: AUTH_REQUEST_FAILURE,
                message: action.message
            });
        case LOGIN_SUCCESS:
        case UPDATE_PROFILE_SUCCESS:
            const out = Object.assign({}, state, {
                reqStatus: AUTH_REQUEST_SUCCESS,
                uid: action.user.uid,
            });

            // displayname can be null from the remote, to preserve the default
            // we have to assign it explicitly (no destructure or Object.assign)
            if(action.user.displayName) {
                out.displayName = action.user.displayName;
            }
            return out;
        default:
            return state;
    }
}

