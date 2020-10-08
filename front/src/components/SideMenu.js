import React from 'react';
import {NavLink} from 'react-router-dom'
const SideMenu = () => {
    const activeStyle = {

    };
    return (
            <div className ="side-bar">
                <ul>
                    <div> Group Name </div>
                    <li><NavLink exact to="/settings" activeStyle={activeStyle}>Setting</NavLink></li>
                    <li><NavLink exact to="/analytics" activeStyle={activeStyle}>Analytic</NavLink></li>
                    <li><NavLink exact to="/interactions" activeStyle={activeStyle}>Interaction</NavLink></li>
                    <li><NavLink exact to="/messages" activeStyle={activeStyle}>Message</NavLink></li>
                    <li><NavLink exact to="/members" activeStyle={activeStyle}>Member</NavLink></li>
                </ul>
            </div>
    )
}

export default SideMenu;