import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './Users.css'

import User from '../User/User';
import store from '../../store';

import { getCurrentUserThunk, getUsersThunk } from '../../store/thunks';
import { getCurrentUserStateSelector, getFoundUsers } from '../../store/selectors';





// function component Users
const Users = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const usersList = useSelector(getFoundUsers);


useEffect(() => {
  dispatch(getCurrentUserThunk())
  dispatch(getUsersThunk())

}, [dispatch])


    const currentUser = useSelector(getCurrentUserStateSelector);
  return (
    <>
        {usersList.length ?
          <div className='users'>
            {usersList.map(user => <p>{user.name}</p>)}
          </div>
          :
            <p>{currentUser}</p>
        }
    </>
  );
}

export default Users;