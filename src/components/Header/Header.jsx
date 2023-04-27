import React from 'react';
import { NavLink } from 'react-router-dom';
import Input from '../Input/Input';
import { useDispatch } from 'react-redux';
import { logoutThunk } from '../../store/thunks';
import { UserProfile } from '../Icons/Icons';
import { LogoutUser } from '../Icons/Icons';
import { SearchUser } from '../Icons/Icons';
import { OpenFeeds } from '../Icons/Icons';
import './Header.css';

const Header = ({isSearch, title, updateSearchValue}) => {
    const dispatch = useDispatch();
    
    const logoutUser = () => {
        dispatch(logoutThunk());
    }

    const heandlerSearch = (timer=null) => (e) => {
        let value = e.target.value;
        if(timer) {
            clearTimeout(timer)
        }
        timer = setTimeout (() =>  {
            e.preventDefault();
            updateSearchValue(value);
        }, 1500)
    }

    return (
        <header className="header">
            <div className="search-block">
                {isSearch ?
                    <Input id="search" name="search" className="search" onChange={heandlerSearch()} placeholder="Search..."/> 
                    :
                    <NavLink className="btn-edit-profile" to="/search">
                        <ul>
                            <li className="icon-loupe" title="Search user">
                                <SearchUser/>
                            </li>
                        </ul> 
                    </NavLink> 
                }
            </div>
            <div className="header-title">{title}</div>
                <ul className="icons-block">
                    <li className="icon" title="Feed"><NavLink to="/feeds"><OpenFeeds/></NavLink></li>
                    <li className="icon" title="Go to profile"><NavLink to="/profile"><UserProfile/></NavLink></li>
                    <li className="icon" title="Logout" onClick={logoutUser}><NavLink to="/"><LogoutUser/></NavLink></li>
                </ul>
        </header>
    );
}

export default Header;