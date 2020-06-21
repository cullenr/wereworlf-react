import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

export default function Play() {
    const uid           = useSelector(state => state.auth.uid);
    const round         = useSelector(state => state.game.round);
    const name          = useSelector(state => state.game.name);
    const votes         = useSelector(state => state.game.votes);
    const players       = useSelector(state => state.game.players);

    const dispatch      = useDispatch();
    const handleClick   = async (e) => {
        // we cast a vote here, the response will be reflected in the 
        // data.votes collection
        console.log('KILL', e.target.value);
    };
    const renderPlayer = playerId => {
        return (<label key={playerId}>
            {players[playerId].name}
            <input type='radio' name='players' 
                    value={playerId} onClick={handleClick} />
        </label>)
    }

    console.log('round data', round);

    return (<div>
        <h1>{name}</h1>
        <h2><span>{round.type}</span> <span>{Math.floor(round.number / 2) + 1}</span></h2>
        <form>
            {round.players.filter(e => e !== uid).map(renderPlayer)}
        </form>
        </div>
    );
}
