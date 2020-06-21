import { combineReducers } from 'redux'

import auth from "./auth-reducer.js";
import game from "./game-reducer.js";

export default combineReducers({ auth, game });
