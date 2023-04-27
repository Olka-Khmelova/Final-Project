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
    getUserFollowingsByLoginThunk,
    // getFollowingsByIdThunk,
    // getFollowersByIdThunk
    
} from '../../store/thunks';
import { useSelector } from 'react-redux';
import { getUserDataSelector, getFoundUsers } from '../../store/selectors';
import { NavLink, useParams } from 'react-router-dom';
import { UserAvatar } from '../../components/Icons/Icons';
import { getFollowingsAndFollowersByIdFetch } from '../../services/Api/UserApi';
import './Search.css';
import Loader from '../../components/Loader';

const FoundUsers = ({value, userId, users, following, followers, getFollowButtonName, followUser, currentUserId }) => {
    let userElements = null;
    if ( following.length > 0) {
        userElements =  following.filter(user=> user.id !== currentUserId)
        .map(user => <FoundUser value={value} user={user} getFollowButtonName={getFollowButtonName} 
            followUser={followUser} key={ user.id }/>)
        } else if (followers.length > 0) {
         userElements =  followers.filter(user=> user.id !== currentUserId)
        .map(user => <FoundUser value={value} user={user} getFollowButtonName={getFollowButtonName} 
            followUser={followUser} key={user.id}/>)
        } else {
        userElements = users.filter(user=> user._id !== currentUserId)
    .map(user => <FoundUser value={value} user={user} getFollowButtonName={getFollowButtonName} 
        followUser={followUser} key={value ? user.id : user._id}/>)
    } 
    
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

const Search = () => {
    const { value, userId } = useParams();
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCurrentUserThunk())
        .then(() => {
            setLoading(false);
          })
    }, [dispatch]);

    const [searchValue, updateSearchValue] = useState('');
    
    const currentUser = useSelector(getUserDataSelector);
    const currentUserId = currentUser.id;

    useEffect(() => {
    if (value === 'followers' && userId) {
        return async () => {
                const { followers } = await getFollowingsAndFollowersByIdFetch(userId);
                let users = [];
                if (followers) {
                    users = followers.filter(user => user.login && user.login.toLowerCase().includes(searchValue.toLowerCase()));
                }
                setFollowers(users);
        }
    } else if (value === 'followings' && userId) {
        return async () => {
            const { following } = await getFollowingsAndFollowersByIdFetch(userId);
            let users = [];
                if (following) {
                    users = following.filter(user => user.login && user.login.toLowerCase().includes(searchValue.toLowerCase()));
                }

            setFollowing(following);
        }
    } else if (value === 'followers') {
            dispatch(getUserFollowersByLoginThunk(searchValue, currentUser));
        } else if (value === 'followings') {
            dispatch(getUserFollowingsByLoginThunk(searchValue, currentUser));
        }
        else { 
            dispatch(getUsersByLoginThunk(searchValue));
        }
    }, [dispatch, value, searchValue, currentUser, userId]);

    const followUser = (userId) => {
        dispatch(followUserThunk(userId));
    }

    const users = useSelector(getFoundUsers);
    // const followers = useSelector(getFollowers);
    // const following = useSelector(getFollowings);
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
                {loading ? <Loader /> :
                (
                <div className="common-block">
                    { userId ?
                        (( followers.length > 0) || (following.length > 0) ?
                        <FoundUsers value={value} followers={followers} following={following}
                            getFollowButtonName={getFollowButtonName} 
                            followUser={followUser}
                            currentUserId={currentUserId}
                            userId={userId}/>
                        :
                        <NotFound/> )
                        :
                        ((users && users.length > 0) ?
                        <FoundUsers value={value} users={users} followers={followers} following={following}
                            getFollowButtonName={getFollowButtonName} 
                            followUser={followUser}
                            currentUserId={currentUserId}/>
                        :
                        <NotFound/> )
                }
                </div>
                )
            }
            </div>
        </>
    );
}



export default Search;