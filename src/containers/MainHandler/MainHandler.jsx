import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getAuthStatusSelector} from '../../store/selectors';
import AccountRouter from '../AccountRouter/AccountRouter';
import AuthRouter from '../AuthRouter'
import { initThunk } from '../../store/thunks';

const MainHandler = () => {
    const isAuth = useSelector(getAuthStatusSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initThunk());
      }, [dispatch])

    return isAuth ? <AccountRouter/> : <AuthRouter/>;
}

export default MainHandler;