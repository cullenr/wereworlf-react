import './Lobby.css'
import * as firebase from 'firebase/app';

import React, { useState, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'

function execCopy(link) {
    let res = false;
    const text = document.createElement('textarea');
    text.value = link;
    text.style.position = 'fixed';
    text.style.top = '0';
    text.style.left = '0';

    document.body.appendChild(text);
    text.focus();
    text.select();

    try {
        res = document.execCommand('copy');
    } catch (err) {
        console.error('error copying to clipboard', err);
    }

    document.body.removeChild(text);
    return res;
}

async function share() {
    const link = window.location.href;
    if (navigator.share && navigator.canShare()) {
        return navigator.share({
            title: 'Werewolf',
            text: `Play a game of werewolf`,
            url: link,
        }) 
    } else if (navigator.clipboard) {
        return navigator.clipboard.writeText(link)
                .then(() => ({clipboard: true}))
    } else {
        const res = execCopy(link);
        return res ? Promise.resolve({clipboard: true}) : Promise.reject();
    }
}


export default function Lobby() {
    const [disabled, setDisabled]         = useState(false);
    const [message, setMessage] = useState(false);
    const { gameId }    = useParams();
    const name          = useSelector(state => state.game.name);
    const players       = useSelector(state => state.game.players);
    const isHost        = useSelector(state => 
            state.game.host === state.auth.uid);

    const handleStart   = async () => {
        const endpoint = firebase.functions().httpsCallable('startGame');
        setDisabled(true)
        try {
            await endpoint({gameId});
            // if this was succesfuly we just wait for the new round to be added
            // by the server, this will be recieved by the listener set up when
            // we joined the game
        } catch(err) {
            setMessage(err.message);
            setDisabled(false)
        }
    };

    const handleShare  = useCallback(async () => {
        setDisabled(true)
        try {
            const res = await share();
            if(res.clipboard) {
                setMessage('link copied to clipboard');
            }
        } catch(err) {
            // fallback to getting the user to share the game id more manually
            setMessage(`share this game id ${gameId}`);
        }
        setDisabled(false)
    }, [gameId])

    const renderPlayer = (player) => {
        return (<li key={player.name}>{player.name}</li>)
    }

    return (
        <div className='lobby'>
            <h2>{name}</h2>
            <h3>waiting in the lobby...</h3>
            <ul>
                {Object.values(players).sort().map(renderPlayer)}
            </ul>
            { isHost && (<>
                <p>You are the host, it is up to you to start the game.</p>
                <button onClick={handleStart} disabled={disabled}>
                    BEGIN PLAY
                </button>
            </>) } 

            <button onClick={handleShare}>INVITE LINK</button>
                { message && <p>{message}</p>}
        </div>
    );
}
