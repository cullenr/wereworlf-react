import './index.css';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { login } from './redux/auth-actions.js'
import rootReducer from './redux/root.js'

import { firebaseConfig } from './constants.js' 

firebase.initializeApp(firebaseConfig);
if (window.location.hostname === 'localhost') {
    firebase.firestore().settings({ host: 'localhost:8080', ssl: false });
    firebase.functions().useFunctionsEmulator('http://localhost:5001');
}

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, createLogger())
)

// wait for the user to log in before doing anything - for now we have automatic
// login to an anonymous account.
store.dispatch(login()).then(() => {
    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>,
        document.getElementById('root')
    );
});

