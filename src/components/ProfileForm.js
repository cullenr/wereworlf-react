import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../redux/actions.js'
import {
    AUTH_REQUEST_PENDING,
    AUTH_REQUEST_FAILURE
} from '../constants.js'

export default function ProfileForm() {
    // get the whole object as we will use the reqStatus and message if 
    // anything goes wrong
    const data      = useSelector(state => state.auth);
    const dispatch  = useDispatch();
    // get the new value from the submit 
    const handleSubmit = (e) => {
        e.preventDefault();
        const newName = e.target.elements.displayName.value;
        if(data.name != newName) {
            dispatch(updateProfile(newName));
        }
    };
    return (<form  onSubmit={handleSubmit}>
        <h3>Name yourself, {data.displaName}</h3>
        <fieldset disabled={data.reqStatus === AUTH_REQUEST_PENDING}>
            <input type='text' placeholder={data.displayName} name='displayName' />
            <input type='submit' />
        </fieldset>
        { data.reqStatus === AUTH_REQUEST_FAILURE && <p>{data.message}</p> }
    </form>);
}
