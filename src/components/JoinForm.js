import React from 'react';

import { useHistory } from "react-router-dom";

export default function JoinForm() {
    const history       = useHistory();
    const handleSubmit  = (e) => {
        e.preventDefault();
        const gameId = e.target.elements.gameId.value;
        history.push(`/game/${gameId}`);
    };
    return (<form onSubmit={handleSubmit}>
        <h3>Enter a Game ID</h3>
        <fieldset>
            <input type='text' placeholder="game id" name='gameId' />
            <input type='submit' />
        </fieldset>
    </form>);
}
