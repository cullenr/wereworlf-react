import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { hostGame } from '../redux/game-actions.js'
import {
    ASYNC_STATE_PENDING,
    ASYNC_STATE_SUCCESS,
    ASYNC_STATE_FAILURE
} from '../constants.js'

export default function HostForm() {
    const history       = useHistory();
    const hostReqState  = useSelector(state => state.game.hostReqState);
    const message       = useSelector(state => state.game.message);
    const gameId        = useSelector(state => state.game.gameId);
    const dispatch      = useDispatch();
    const handleSubmit  = (e) => {
        e.preventDefault();
        const name = e.target.elements.gameName.value;
        dispatch(hostGame(name));
    };

    useEffect(() => {
        if(hostReqState === ASYNC_STATE_SUCCESS) {
            history.push(`/game/${gameId}`);
        }
    }, [hostReqState, history, gameId])

    return (
        <form onSubmit={handleSubmit}>
            <h3>Name the Game</h3>
            <fieldset disabled={hostReqState === ASYNC_STATE_PENDING}>
                <input type='text' placeholder="game name" name='gameName' />
                <input type='submit' />
            </fieldset>
            { hostReqState === ASYNC_STATE_FAILURE && 
                    <p>{message}</p> }
        </form>
    );
}

// TODO: remove the data.message stuff and add it to the messages collection
