import './Play.css'
import * as firebase from "firebase/app"
import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Player from './Player.js'

export default function Play() {
    const [disabled, setDisabled] = useState(false);
    const { gameId }    = useParams();
    const uid           = useSelector(state => state.auth.uid);
    const round         = useSelector(state => state.game.round);
    const gameName      = useSelector(state => state.game.name);
    const dispatch      = useDispatch();
    const handleClick   = async (e) => {
        const endpoint = firebase.functions().httpsCallable('castVote');
        // we cast a vote here, the response will be reflected in the 
        // data.votes collection
        setDisabled(true);
        await endpoint({ gameId, nominee: e.target.value });
        setDisabled(false);
    };
    const isAlive = () => round.players.includes(uid);
    const renderPlayerInput = (playerId) => {
        return (<li key={playerId}>
            <input id={playerId} type='radio' name='players'
                value={playerId} onClick={handleClick}  /> 
            <label  htmlFor={playerId}>
                <Player uid={playerId} showRole={uid !== playerId}/>
            </label> 
        </li>)
    }
    const renderPlayer = (playerId) => {
        return (<li key={playerId}>
            <Player uid={playerId} showRole={true}/>
        </li>)
    }
    useEffect(() => {
        const radios = document.querySelectorAll('input[type=radio]');
        radios.forEach(e => e.checked = false);

    }, [round])

    return (<div className='game'>
        <h1></h1>
        <h3>
            <span>{gameName} - </span>
            <span>{round.type} </span>
            <span>{Math.floor(round.number / 2) + 1}</span>
        </h3>
        <form>
            <fieldset disabled={disabled}>
                <ul>
                    {isAlive() 
                        ? round.players.map(renderPlayerInput)
                        : round.players.map(renderPlayer)}
                </ul>
            </fieldset>
        </form>
    </div>
    );
}
