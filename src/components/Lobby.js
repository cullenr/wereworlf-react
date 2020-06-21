import * as firebase from "firebase/app";

import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'

export default function Lobby() {
    const [disabled, setDisabled]         = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const { gameId }    = useParams();
    const name          = useSelector(state => state.game.name);
    const players       = useSelector(state => state.game.players);
    const isHost        = useSelector(state => 
            state.game.host === state.auth.uid);

    const handleClick   = async () => {
        const endpoint = firebase.functions().httpsCallable('startGame');
        setDisabled(true)
        try {
            await endpoint({gameId});
            // if this was succesfuly we just wait for the new round to be added
            // by the server, this will be recieved by the listener set up when
            // we joined the game
        } catch(err) {
            console.log(err);
            setErrorMessage(err.message);
            setDisabled(false)
        }
    };
    const renderPlayer = (player) => {
        return (<li key={player.name}>{player.name}</li>)
    }

    return (
        <div>
            <h1>{name}</h1>
            <h2>waiting in the lobby...</h2>
            <ul>
                {Object.values(players).sort().map(renderPlayer)}
            </ul>
            { isHost && (<>
                <p>You are the host, it is up to you to start the game.</p>
                <button onClick={handleClick} disabled={disabled}>
                    BEGIN PLAY
                </button>
                { errorMessage && <p>{errorMessage}</p>}
            </>) } 
        </div>
    );
}
