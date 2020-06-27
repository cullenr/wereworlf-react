import React, { useEffect } from 'react';
import { 
    Switch,
    Route,
    useHistory, 
    useParams,
    useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { joinGame } from '../redux/game-actions.js'
import {
    ASYNC_STATE_INITIAL,
    ASYNC_STATE_PENDING,
    ASYNC_STATE_SUCCESS,
    ASYNC_STATE_FAILURE
} from '../constants.js'

import Play from './Play.js'
import Lobby from './Lobby.js'

export default function Game() {
    const { path, url } = useRouteMatch();
    const { gameId }    = useParams();
    const history       = useHistory();
    const joinReqState  = useSelector(state => state.game.joinReqState);
    const message       = useSelector(state => state.game.message);
    const round         = useSelector(state => state.game.round.number);
    const dispatch      = useDispatch();

    useEffect(() => {
        switch(joinReqState) {
            case ASYNC_STATE_INITIAL :
                dispatch(joinGame(gameId));
                break;
            case ASYNC_STATE_PENDING :
                break;
            case ASYNC_STATE_SUCCESS :
                if(round === 0) {
                    history.push(`${url}/lobby`);
                } else {
                    history.push(`${url}/play`);
                }
                break;
            case ASYNC_STATE_FAILURE :
                history.push(`${url}/join-failed`);
                break;
            default:
        }
    }, [joinReqState, dispatch, gameId, history, round, url]);

    return (
        <Switch>
            <Route path={`${path}/play`}>
                <Play />
            </Route>
            <Route path={`${path}/lobby`}>
                <Lobby />
            </Route>
            <Route path={`${path}/join-failed`}>
                <h3>FAILURE</h3>
                <p>{message}</p>
            </Route>
            <Route path={`${path}`}>
                <h3>Connecting to game...</h3>
            </Route>
        </Switch> 
    );
}
