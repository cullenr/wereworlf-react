import './Play.css'
import * as firebase from "firebase/app"
import React, { useState } from 'react'

import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Player from './Player.js'

export default function Play() {
    const [disabled, setDisabled] = useState(false);
    const { gameId }    = useParams();
    const uid           = useSelector(state => state.auth.uid);
    const round         = useSelector(state => state.game.round);
    const gameName      = useSelector(state => state.game.name);
    const votes         = useSelector(state => state.game.votes);
    const players       = useSelector(state => state.game.players);

    const dispatch      = useDispatch();
    const handleClick   = async (e) => {
        const endpoint = firebase.functions().httpsCallable('castVote');
        // we cast a vote here, the response will be reflected in the 
        // data.votes collection
        setDisabled(true);
        await endpoint({ gameId, nominee: e.target.value });
        setDisabled(false);
    };


    const renderPlayer = (playerId, renderRadio) => {
        return (<li>
        <input id={playerId} type='radio' name='players'
            value={playerId} onClick={handleClick} />
        <label key={playerId} for={playerId}>
            <Player uid={playerId} showRole={uid !== playerId}/>
        </label> 
        </li>)
    }

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
                    {round.players.map(renderPlayer)}
                </ul>
            </fieldset>
        </form>
    </div>
    );
}
