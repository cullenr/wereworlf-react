import * as firebase from 'firebase/app';
import 'firebase/auth';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { login } from './redux/actions.js'
import rootReducer from './redux/reducers.js'

const firebaseConfig = {
  apiKey: 'AIzaSyD_2RZs_a4t_z00JUrO5YatFd_HFv12GI4',
  authDomain: 'werewolf-78e38.firebaseapp.com',
  databaseURL: 'https://werewolf-78e38.firebaseio.com',
  projectId: 'werewolf-78e38',
  storageBucket: 'werewolf-78e38.appspot.com',
  messagingSenderId: '559863765046',
  appId: '1:559863765046:web:500f040efd840c54d22097',
  measurementId: 'G-675KXC6L02'
};

firebase.initializeApp(firebaseConfig);

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, createLogger())
)

store.dispatch(login()).then(() => console.log('data: ', store.getState()));

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
