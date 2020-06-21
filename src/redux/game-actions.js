import * as firebase from 'firebase/app';

import {
    ASYNC_STATE_PENDING,
    ASYNC_STATE_SUCCESS,
    ASYNC_STATE_FAILURE
} from '../constants.js';


/**
 * Dispatches an action for firestore collection write actions.
 *
 * @param {object} db - firestore
 * @param {function} dispatch - redux dispatcher
 * @param {string} path - the path to the collection to watch.
 * @param {string} actionType - the redux action `type` to mark the action with.
 */
const onCollectionWrite = (db, dispatch, path, actionType) => db
    .collection(path)
    .onSnapshot(snap => snap.docChanges().forEach(change => {
        if (change.type === 'added' || change.type === 'updated') {
            dispatch({
                type: actionType, 
                id: change.doc.id,
                doc: change.doc.data()
            })
        }
    }));

/**
 *  Dispatches an action for firestore collection write actions that are
 *  protected by a whitelist.
 *
 * @param {object} db - firestore
 * @param {function} dispatch - redux dispatcher
 * @param {string} path - the path to the collection to watch.
 * @param {string} actionType - the redux action `type` to mark the action with.
 * @param {string} uid - the firebase uid for the current user
 */
const onPrivateCollectionWrite = (db, dispatch, path, actionType, uid) => db
    .collection(path)
    .where('viewers', 'array-contains', uid)
    .onSnapshot(snap => snap.docChanges().forEach(change => {
        if (change.type === 'added' || change.type === 'updated') {
            dispatch({
                type: actionType, 
                id: change.doc.id,
                doc: change.doc.data()
            })
        }
    }));

/**
 *  This action resets the game store. We use this for starting new games
 *  so that any prvious data is wiped from the last game. It is also useful for
 *  resetting the status of the redux-thunks incase the user endtered a bad game
 *  id when they tried to connect.
 */
export const INIT_GAME_STATE = 'INIT_GAME_STATE'

/**
 *  This is dispatched when a user wants to create a new game for players to
 *  join
 */
export const HOST_GAME = 'HOST_GAME';

/**
 *  Start game action thunk called by the game host to initiate play.
 *
 * @param {string} gameName - user chosen name for the game
 * @return {Promise} - awaitable redux thunk
 */
export const hostGame = (gameName) => async (dispatch, getState) => {
    // ignore duplicates
    if(getState().hostReqState === ASYNC_STATE_PENDING) {
        return;
    }

    dispatch({ type: INIT_GAME_STATE });
    dispatch({ type: HOST_GAME, hostReqState: ASYNC_STATE_PENDING, res: {}});

    try {
        const uid = getState().auth.uid;
        const db = firebase.firestore();
        const res = await db
            .collection(`games`)
            .add({
                isOpen: true,
                name: gameName,
                host: uid
            });

        dispatch({
            type: HOST_GAME, 
            hostReqState: ASYNC_STATE_SUCCESS,
            res: {
                gameId: res.id
            }
        });
    } catch (err) {
        dispatch({type: HOST_GAME, hostReqState: ASYNC_STATE_FAILURE, res: {
            message: err.message
        }})
    }
}

export const JOIN_GAME    = 'JOIN_GAME';
export const ADD_PLAYER   = 'ADD_PLAYER';
export const ADD_ROUND    = 'ADD_ROUND';
export const ADD_VOTE     = 'ADD_VOTE';
export const ADD_MESSAGE  = 'ADD_MESSAGE';
export const HIDE_MESSAGE = 'HIDE_MESSAGE';
/**
 * Allows a player to attempt to join a game.
 *
 * @param {string} gameId - the games database id
 * @return {Promise} - awaitable redux thunk
 */
export const joinGame = (gameId) => async (dispatch, getState) => {
    // ignore duplicates
    if(getState().game.joinReqState === ASYNC_STATE_PENDING) {
        return;
    }
    const uid = getState().auth.uid;
    if(!uid) {
        dispatch({type: JOIN_GAME, joinReqState: ASYNC_STATE_FAILURE, res: {
            message: 'you must be logged in to join a game'
        }});
        return;
    }

    dispatch({ type: INIT_GAME_STATE });
    dispatch({ type: JOIN_GAME, joinReqState: ASYNC_STATE_PENDING });

    try {
        // we get a reference to the db here, promoting this is not easy as
        // firebase must be initialised before it is called.
        const db = firebase.firestore();
        // this should be optional incase the user is already added
        // and has accidentaly navigated away - we use set to achieve this.
        await db
            .doc(`games/${gameId}/players/${uid}`)
            .set({ name: getState().auth.displayName });

        const game = await db.doc(`games/${gameId}`).get();

        onCollectionWrite(db, dispatch, `games/${gameId}/players`, 
            ADD_PLAYER);
        onCollectionWrite(db, dispatch, `games/${gameId}/rounds`, 
            ADD_ROUND);

        onPrivateCollectionWrite(db, dispatch, `games/${gameId}/messages`, 
            ADD_MESSAGE, uid);
        onPrivateCollectionWrite(db, dispatch, `games/${gameId}/votes`, 
            ADD_VOTE, uid);

        dispatch({
            type: JOIN_GAME, 
            joinReqState: ASYNC_STATE_SUCCESS,
            res: game.data()
        });
    } catch (err) {
        dispatch({type: JOIN_GAME, joinReqState: ASYNC_STATE_FAILURE, res: {
            message: err.message
        }})
    }
}

