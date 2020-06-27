import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../redux/auth-actions.js'
import {
    AUTH_REQUEST_PENDING,
    AUTH_REQUEST_FAILURE
} from '../constants.js'

export default function ProfileForm() {
    const auth          = useSelector(state => state.auth);
    const dispatch      = useDispatch();
    const handleSubmit  = (e) => {
        e.preventDefault();
        const newName = e.target.elements.displayName.value;
        if(auth.displayName !== newName) {
            dispatch(updateProfile(newName));
        }
    };
    return (<form  onSubmit={handleSubmit}>
        <h3>Name yourself, {auth.displayName}</h3>
        <fieldset disabled={auth.reqStatus === AUTH_REQUEST_PENDING}>
            <input type='text' name='displayName' autocomplete='off'
                   minLength='2' maxLength='16' required/>
            <input type='submit' value='GO' />
        </fieldset>
        { auth.reqStatus === AUTH_REQUEST_FAILURE && <p>{auth.message}</p> }
    </form>);
}
