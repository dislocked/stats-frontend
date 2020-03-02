import React from 'react';
import '../App.css'

function Nav(){
    return(
        <nav className="nav">
            <img src={require('../images/logo-solo.png')}></img>
            <ul>
                <li>Home</li>
                <li>Players</li>
            </ul>
        </nav>
    )
}

export default Nav