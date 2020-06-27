import React from 'react';

import { useHistory } from "react-router-dom";

/**
 * Allow a user to join a game.
 * 
 * Joining happens on the `game` route to allow easy sharing of urls to games.
 *
 * The input must be 20 chars - https://firebase.googleblog.com/2015/02/the-2120-ways-to-ensure-unique_68.html.
 */
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
            <input type='text' name='gameId' autoComplete='off'
                   minLength='20' maxLength='20' required/>
            <input type='submit' value='GO'/>
        </fieldset>
    </form>);
}
