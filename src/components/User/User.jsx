import React, { useState } from 'react';
import { Link } from 'react-router-dom';


import { useDispatch, useSelector } from 'react-redux';
import { followUserThunk } from '../../store/thunks';
import { useEffect } from 'react';
import { getCurrentUserStateSelector } from '../../store/selectors';

// custom useUser Hook
const useUser = (user) => {
  const [isFollow, setIsFollow] = useState(false);
  const dispatch = useDispatch()
  let { following } = useSelector(getCurrentUserStateSelector);

  useEffect(() => {
    following.forEach(follow => {
      follow.id === user._id && setIsFollow(true)
    })
  }, [following, user._id]);

  const handleClickFollow = () => {
    dispatch(followUserThunk(user._id))
    setIsFollow(!isFollow);
  }

  return { isFollow, handleClickFollow }
}

const User = ({ user }) => {
  const { isFollow, handleClickFollow } = useUser(user);

  return (
    <>
      <Link to={'/profile/' + user._id}>
            {user.avatar ? <img src={user.avatar} alt="" /> : <p>No image</p>}
            {user.login}
      </Link>

      <buttom
      isFollow={isFollow}
      handleClick={handleClickFollow}>
        {isFollow ? "UnFollow" : "Follow"}
        </buttom>
        </>
  )
}

export default User;