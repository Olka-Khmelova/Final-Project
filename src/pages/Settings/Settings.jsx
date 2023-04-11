import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import ChangeProfile from './ChangeProfile';
import ChangePassword from './ChangePassword';
import { useDispatch } from 'react-redux';
import { getCurrentUserThunk } from '../../store/thunks';
import './Settings.css';


const Setting = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUserThunk());
    }, [dispatch]);

    return (
        <>
            <Header title="Settings"/>
            <div className="wrapper">
                <div className="common-block">
                    <div className="setting-wrapper">
                        <ChangeProfile/>
                        <ChangePassword/>
                    </div>
                </div>
            </div>
        </>  
    );
}

export default Setting;