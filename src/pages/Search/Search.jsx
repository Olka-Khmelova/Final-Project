import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import NotFound from './NotFound.jsx';
import { useDispatch } from 'react-redux';
import { 
    getUsersByLoginThunk, 
    followUserThunk, 
    getCurrentUserThunk,
    getUserFollowersByLoginThunk,
    getUserFollowingsByLoginThunk
} from '../../store/thunks';
import { useSelector } from 'react-redux';
import { getUserDataSelector, getFoundUsers } from '../../store/selectors';
import { NavLink, useParams } from 'react-router-dom';
import { UserAvatar } from '../../components/Icons/Icons';
import './Search.css';

const Search = () => {
    const { value } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCurrentUserThunk());
    }, [dispatch]);

    const currentUser = useSelector(getUserDataSelector);
    const currentUserId = currentUser.id;

    const [searchValue, updateSearchValue] = useState('');

    useEffect(() => {
        if (value === 'followers') {
            dispatch(getUserFollowersByLoginThunk(searchValue, currentUser));
        } else if (value === 'followings') {
            dispatch(getUserFollowingsByLoginThunk(searchValue, currentUser));
        }
        else { 
            dispatch(getUsersByLoginThunk(searchValue));
        }
    }, [dispatch, value, searchValue, currentUser]);

    const followUser = (userId) => {
        dispatch(followUserThunk(userId));
    }

    const users = useSelector(getFoundUsers);
    const getFollowButtonName = (userId) => {
        if (currentUser && currentUser.following) {
            return currentUser.following.find(el => el.id === userId) ? 'Unfollow' : 'Follow';
        }
        return 'Follow';
    }

    return (
        <>
            <Header isSearch="true" updateSearchValue={updateSearchValue} title="Search"/>
            <div className="wrapper">
                <div className="common-block">
                    {(users && users.length > 0) ?
                        <FoundUsers value={value} users={users} 
                            getFollowButtonName={getFollowButtonName} 
                            followUser={followUser}
                            currentUserId={currentUserId}/>
                        :
                        <NotFound/> 
                    }
                </div>
            </div>
        </>
    );
}

const FoundUsers = ({value, users, getFollowButtonName, followUser, currentUserId }) => {
    const userElements = users.filter(user=> user._id !== currentUserId)
    .map(user => <FoundUser value={value} user={user} getFollowButtonName={getFollowButtonName} 
        followUser={followUser} key={value ? user.id : user._id}/>)
    return (
        <div className="search-wrapper">
            {userElements}
        </div>
    )
}

const FoundUser = ({value, user, getFollowButtonName, followUser}) => {
    return (
        <div className="user-block">
            <div className="user">
                <NavLink to={`/profile/${value ? user.id : user._id}`}>
                    <div className="avatar-block">
                        {user.avatar ?
                        <img className="user-avatar" src={user.avatar} alt="avatar" />
                        : <UserAvatar/>}
                    </div>
                </NavLink>
                <div className="name-block">
                    {user.login}
                </div>
            </div>
            <Button className="btn-subscribe" 
            name={getFollowButtonName(value ? user.id : user._id)} 
            onClick={() => followUser(value ? user.id : user._id)}></Button>
        </div>
    );
}

export default Search;