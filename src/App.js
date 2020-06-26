import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom"

import { useSelector } from "react-redux"
import Game from './components/Game'
import Messages from './components/Messages'
import Landing from './components/Landing'
import Splash from './components/Splash'

import './App.css'

export default function App() {
    const phase    = useSelector(state => state.game.round.type);
    const location = useLocation();
    let headerClass;

    if(/^\/$/.test(location.pathname)) {
        headerClass = 'hidden';
    } else if (/^\/landing.*/.test(location.pathname)) {
        headerClass = 'expanded';
    } else if (/^\/game.*/.test(location.pathname)) {
        headerClass = 'contracted';
    }
    console.log(phase)

    return (
    <main className={phase}>
        <header className={headerClass}>
            <h1>WeReWolf</h1>
        </header>
        <section>
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
        </section>
        <Messages />
    </main>
    );
}


