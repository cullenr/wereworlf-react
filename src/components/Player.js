import * as firebase from "firebase/app";
import React, { useState } from 'react'

import { useSelector } from 'react-redux';

export default function Player(props) {
    const uid           = useSelector(state => state.auth.uid);
    const players       = useSelector(state => state.game.players);
    const round         = useSelector(state => state.game.round);
    const votes         = useSelector(state => state.game.votes);
    const roles         = useSelector(state => state.game.roles);
    const getName = id => players[id]?.name;

    return (
        <span>
            {uid === props.uid && (<span>[you] </span>)}
            {round.ghosts.includes(props.uid) && <span>[dead] </span>}
            {props.showRole && <span>{roles[uid]?.type} </span>}
            {getName(props.uid)}
            {props.showVote && (<span> 
                voted for 
                <Player uid={votes[uid].nominee} />
            </span>)}
        </span>
    );
}
