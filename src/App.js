import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useState
} from "react-router-dom";

import { useSelector, connect } from "react-redux";
import ProfileForm from './components/ProfileForm';
export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">SPLASH</Link>
            </li>
            <li>
              <Link to="/options">Options</Link>
            </li>
            <li>
              <Link to="/lobby">Users</Link>
            </li>
            <li>
              <Link to="/round/0">Round</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/round/:roundId">
            <Round />
          </Route>
          <Route path="/options">
            <Options />
          </Route>
          <Route path="/lobby">
            <ConnectedLobby />
          </Route>
          <Route path="/">
            <Splash />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Splash() {
    return <h2>Splash</h2>;
}

function Options() {
    let { path, url } = useRouteMatch();
    const uid = useSelector(state => {
        console.log('useSelector', state);
        return state.auth.uid;
    });
    console.log('Options')
    return (
      <div>
        <h2>Options</h2>
        <p>hello {uid}</p>
        <ul>
          <li>
            <Link to={`${url}/host`}>HOST</Link>
          </li>
          <li>
            <Link to={`${url}/join`}>JOIN</Link>
          </li>
          <li>
            <Link to={`${url}/profile`}>PROFILE</Link>
          </li>
        </ul>

        <Switch>
          <Route exact path={path}>
            <h3>Please select a topic.</h3>
          </Route>
          <Route path={`${path}/host`}>
            <h3>HOST FORM</h3>
          </Route>
          <Route path={`${path}/join`}>
            <h3>JOIN FORM</h3>
          </Route>
          <Route path={`${path}/profile`}>
            <ProfileForm /> 
          </Route>
        </Switch>
      </div>
    );
}


function Lobby({uid}) {
    return <h2>Lobby { uid }</h2>;
}
const ConnectedLobby = connect(state => ({uid : state.auth.uid}))(Lobby)

function Round() {
    const { roundId } = useParams();
    console.log(roundId);
    return <h2>Round {roundId} </h2>;
}
