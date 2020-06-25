
export const AUTH_REQUEST_PENDING = 'AUTH_REQUEST_PENDING';
export const AUTH_REQUEST_SUCCESS = 'AUTH_REQUEST_SUCCESS';
export const AUTH_REQUEST_FAILURE = 'AUTH_REQUEST_FAILURE';

export const ASYNC_STATE_INITIAL = 'ASYNC_STATE_INITIAL';
export const ASYNC_STATE_PENDING = 'ASYNC_STATE_PENDING';
export const ASYNC_STATE_SUCCESS = 'ASYNC_STATE_SUCCESS';
export const ASYNC_STATE_FAILURE = 'ASYNC_STATE_FAILURE';

export const DEFAULT_PLAYER_NAME = 'unnamed player';

export const firebaseConfig = window.location.hostname === 'localhost'
    ? {
        apiKey: 'AIzaSyD_2RZs_a4t_z00JUrO5YatFd_HFv12GI4',
        authDomain: 'werewolf-78e38.firebaseapp.com',
        databaseURL: 'localhost:8080',
        projectId: 'werewolf-78e38',
        storageBucket: 'werewolf-78e38.appspot.com',
        messagingSenderId: '559863765046',
        appId: '1:559863765046:web:500f040efd840c54d22097',
        measurementId: 'G-675KXC6L02'
    }
    : {
        apiKey: 'AIzaSyD_2RZs_a4t_z00JUrO5YatFd_HFv12GI4',
        authDomain: 'werewolf-78e38.firebaseapp.com',
        databaseURL: 'https://werewolf-78e38.firebaseio.com',
        projectId: 'werewolf-78e38',
        storageBucket: 'werewolf-78e38.appspot.com',
        messagingSenderId: '559863765046',
        appId: '1:559863765046:web:500f040efd840c54d22097',
        measurementId: 'G-675KXC6L02'
    };
