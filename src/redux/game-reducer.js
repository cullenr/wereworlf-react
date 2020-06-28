import {
    ASYNC_STATE_INITIAL,
} from '../constants.js'

import {
    INIT_GAME_STATE,
    HOST_GAME,
    JOIN_GAME,
    ADD_ROUND,
    ADD_PLAYER,
    ADD_VOTE,
    ADD_MESSAGE,
    HIDE_MESSAGE,
} from './game-actions.js'

const initialState = {
    hostReqState: ASYNC_STATE_INITIAL,
    joinReqState: ASYNC_STATE_INITIAL,
    message: '', // TODO : remove this in favour of another messages store
    name: '',
    host: '',
    gameId: '', // TODO : remove, this is a param so we can rejoin/refresh
    round: {
        id: 'r-', // NOTE ids are lexographically compared in the action dispatcher. The document ids follow the convention of r + the round number. '-' < '0'.
        players: [],
        ghosts: [],
        number: -1,
        phase: ''
    },
    players: {},
    votes: {},
    roles: {},
    messages: []
};
export default (state, action) => {
    if(!state) {
        return JSON.parse(JSON.stringify(initialState));
    }
    switch(action.type) {
        case INIT_GAME_STATE:
            return JSON.parse(JSON.stringify(initialState));
        case HOST_GAME :
            return {
                ...state,
                ...action.res,
                hostReqState: action.hostReqState,
            };
        case JOIN_GAME :
            return {
                ...state,
                ...action.res,
                joinReqState: action.joinReqState,
            };
        case ADD_ROUND :
            return {
                ...state,
                round: { ...action.doc, id: action.id },
                votes: {} // empty the votes when a round starts
            };
        case ADD_PLAYER : {
            const players = Object.assign({}, state.players, {
                [action.id]: action.doc
            });
            return { ...state, players };
        }
        case ADD_VOTE : {
            // private collections can contain a roundId that specifies which
            // round they are relevant for - we can prevent data for old rounds
            // being dispatched to the reducer here. This means the results of
            // old rounds are not shown to the user as messages and things like
            // old votes dont muddy the state of the ui.
            //
            // Some data may not contain a round Id such as the initial messages
            // notifying the role of the player, these should always be
            // dispatched.

            // filtering is done here in the reducer instead of in the action
            // that dispatches the update as these actions come from long lived
            // connections to the datastore. This means that a reference to
            // getState would need to be passed to the callback that is
            // registered against the firebase store to get the current round.
            if(action.doc.roundId < state.round.id) {
                return state;
            } 

            const votes = Object.assign({}, state.votes, {
                [action.id]: action.doc
            }); 
            return { ...state, votes };
        }
        case ADD_MESSAGE : 
            // append the message to the messages array
            return {
                ...state,
                messages: [
                    ...state.messages,
                    { 
                        id: action.id,
                        ...action.doc
                    }
                ].sort((a, b) => a.received - b.received)
            };
        case HIDE_MESSAGE :
            return {
                ...state,
                messages: state.messages.filter(e => e.id !== action.id)
            }
        default:
            return state;
    }
};
