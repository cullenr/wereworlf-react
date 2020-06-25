import './Landing.css'
import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  NavLink,
  useHistory, 
  useRouteMatch,
} from "react-router-dom"
import { useSelector } from "react-redux"
import { DEFAULT_PLAYER_NAME } from '../constants.js'
import ProfileForm from './ProfileForm'
import HostForm from './HostForm'
import JoinForm from './JoinForm'
// TODO : write test to make sure that the profile is shown if the user has not
// set their displayname
//

/**
 *  The first menu page that the user is presented with. All options and forms
 *  stem from here.
 *
 *  From here a user can:
 *
 *  * Start a new game
 *  * Join an existing game
 *  * Update their profile
 *
 *  If a user has not yet set their displayName, the profile option will be
 *  shown prompting the user to change their name, in all other cases the
 *  default route will not show any forms.
 */
export default function Landing() {
    const { path, url } = useRouteMatch();
    const history     = useHistory();
    const displayName = useSelector(state => {
        return state.auth.displayName;
    });

    useEffect(() => {
        if(displayName === DEFAULT_PLAYER_NAME) {
            history.push(`${url}/profile`);
        }
    }, [displayName])

    return (
        <div className='landing'>
            <ul>
                <li>
                    <NavLink to={`${url}/host`}>HOST</NavLink>
                </li>
                <li>
                    <NavLink to={`${url}/join`}>JOIN</NavLink>
                </li>
                <li>
                    <NavLink to={`${url}/profile`}>PROFILE</NavLink>
                </li>
            </ul>

            <Switch>
                <Route exact path={path}>
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
