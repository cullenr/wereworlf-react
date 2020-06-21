import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom"

import { useSelector } from "react-redux"
import ProfileForm from './components/ProfileForm'
import HostForm from './components/HostForm'
import JoinForm from './components/JoinForm'
import Game from './components/Game'
import Messages from './components/Messages'

import './App.css'
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
                          <Link to="/landing">Landing</Link>
                      </li>
                  </ul>
              </nav>

              <Switch>
                  <Route path="/game/:gameId"> 
                      <Game />
                  </Route>
                  <Route path="/landing">
                      <Landing />
                  </Route>
                  <Route path="/">
                      <Splash />
                  </Route>
              </Switch>
              <Messages />
          </div>
      </Router>
  );
}

function Splash() {
    return <h2>Splash</h2>;
}

function Landing() {
    let { path, url } = useRouteMatch();
    const uid = useSelector(state => {
        return state.auth.uid;
    });
    return (
        <div>
            <h2>Landing</h2>
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
                    <HostForm />
                </Route>
                <Route path={`${path}/join`}>
                    <JoinForm />
                </Route>
                <Route path={`${path}/profile`}>
                    <ProfileForm /> 
                </Route>
            </Switch>
        </div>
    );
}
