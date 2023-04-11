import React from "react";
import { NavLink } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
    return (
        <div className="navbar_container">
        <ul className="navbar_list">
            <li className="navbar_item">
            <NavLink to="/">Feed</NavLink>
            </li>
            <li className="navbar_item">
            <NavLink to="/users">Users</NavLink>
            </li>
        </ul>
        </div>
    )
}

export default Navbar;