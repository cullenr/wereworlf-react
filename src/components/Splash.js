import './Splash.css'
import React, { useEffect } from 'react';
import { useHistory, useRouteMatch } from "react-router-dom"

export default function Splash() {
    const { path, url }      = useRouteMatch();
    const history            = useHistory();
    const handleAnimationEnd = (e) => {
        if(e.animationName === 'anim-b') {
            console.log('splash complete')
            // using `url` from :
            // const { path, url } = useRouteMatch();
            // will cause firefox to throw: 
            // SecurityError: The operation is insecure
            // for this reason we need to make sure that landing is hard coded
            // like so.
            history.push(`/landing`);
        }
    };

    return <>
        <svg width="0" height="0">
            <filter id="metaball">
                <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur"></feGaussianBlur>
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 100 -20" result="metaball"></feColorMatrix>
                <feComposite in="SourceGraphic" in2="metaball" operator="atop"></feComposite>
            </filter>
        </svg>
        <h1 className="splash" onAnimationEnd={handleAnimationEnd}></h1>
    </>;
}
