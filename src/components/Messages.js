import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { HIDE_MESSAGE } from '../redux/game-actions.js'
export default function Lobby() {

    const messages      = useSelector(state => state.game.messages);
    const dispatch      = useDispatch();
    const handleClick   = (messageId) => 
            dispatch({type: HIDE_MESSAGE, id: messageId});

    const renderMessage = (message) => {
        return (<li key={message.id}>
            {JSON.stringify(message)}
            <button onClick={() => handleClick(message.id)}>DISMISS</button>
        </li>)
    }

    return (
        <div>
            <h3>Messages</h3>
            <ul>
                {Object.values(messages).map(renderMessage)}
            </ul>
        </div>
    );
}
