import React from "react";
import { Navigate, Route, Routes } from 'react-router-dom';
import WrapperContainer from '../WrapperContainer/WrapperContainer';
import Feeds from '../../pages/Feeds/Feeds'
import Search from '../../pages/Search/Search'
import Profile from '../../pages/Profile/Profile'
import Settings from '../../pages/Settings/Settings'
import AuthWrapper from "../AuthWrapper/AuthWrapper";


const AccountRouter = () => {
    return(
        <WrapperContainer>
                <Routes path="/">
                <Route index element={<Feeds />}/>
                    <Route path="search" element={<Search />}/>
                    <Route path="search/:value" element={<Search />}/>
                    <Route path="profile/:userId" element={<Profile />}/>
                    <Route path="profile" element={<Profile />}/>
                    <Route path="feeds" element={<Feeds />}/>
                    <Route path="settings" element={<Settings />}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
        </WrapperContainer>
    )
}
export default AccountRouter;