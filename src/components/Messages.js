import './Messages.css'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { HIDE_MESSAGE } from '../redux/game-actions.js'

import Player from './Player.js'

export default function Messages() {

    const messages      = useSelector(state => state.game.messages);
    const dispatch      = useDispatch();
    const handleClick   = (messageId) => 
            dispatch({type: HIDE_MESSAGE, id: messageId});

    const renderContent = (message) => {
        switch(message.type) {
            case 'executioner-elected' : 
                return (<div>
                    <h3>Todays executioner is</h3>
                    <Player uid={message.content}/>
                </div>);
            case 'execution' : 
                return (<div>
                    <h3>Chosen for death</h3>
                    <Player uid={message.content.player}/> was sentenced to death with {message.content.votes} votes.
                </div>);
            case 'game-over' : 
                return (<div>
                    <h3>Game Over</h3>
                    <p>The {message.content.victors} team has won</p>
                </div>);
            case 'seer-success' : 
                return (<div>
                    <h3>A killer is identified</h3>
                    <Player uid={message.content}/>
                </div>);
            case 'seer-failure' : 
                return (<div>
                    <h3>A killer was not identified</h3>
                </div>);
            case 'eliminations' : 
                return (<div>
                    <h3>Death in the Night!</h3> 
                    {message.content.map(e => (<p>
                        <Player uid={e} /> was killed
                    </p>))}
                </div>);
            case 'resurections' : 
                return (<div>
                    <h3>Miraculous healings!</h3> 
                    {message.content.map(e => (<p>
                        <Player uid={e} /> was saved
                    </p>))}
                </div>);
            case 'role-assigned' : 
                return (<h3> You are a {message.content.toLowerCase()} </h3>);
        }
    }
    const renderMessage = message => {
        return (<li key={message.id}>
            {renderContent(message)}
            <button onClick={() => handleClick(message.id)}>OK</button>
        </li>)
    }

    return (<ul className='messages'>{Object.values(messages).map(renderMessage)}</ul>);
}
