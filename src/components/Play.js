import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

export default function Play() {
    const round         = useSelector(state => state.game.round);
    const name          = useSelector(state => state.game.name);
    const players       = useSelector(state => state.game.players);
    const votes         = useSelector(state => state.game.votes);

    const dispatch      = useDispatch();
    const handleClick   = async (e) => {
        // we cast a vote here, the response will be reflected in the 
        // data.votes collection
        console.log('KILL', e.target.value);
    };
    const renderPlayer = playerId => {
        return (<label key={playerId}>
            {players[playerId].name}
            <input type='radio' name='players' onClick={handleClick} />
        </label>)
    }

    return (<div>
        <h1>{name}</h1>
        <h2><span>{round.phase}</span> {Math.floor(round.round / 2) + 1}</h2>
        <form>
            {round.players.map(renderPlayer)}
        </form>
        </div>
    );
}
