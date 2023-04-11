import React from "react";
import { Navigate, Route, Routes } from 'react-router-dom';
import WrapperContainer from '../WrapperContainer/WrapperContainer';
import Login from "../../components/Authetification/Login";
import Registration from "../../components/Authetification/Registration";


const AuthRouter = () => {
    return(
        <WrapperContainer>
            <Routes path="/">
            <Route index element={<Login />}/>
                <Route path="/registration" element={<Registration />}/>
                <Route path="*" element={<Navigate to="/login"/>}/>
            </Routes>
        </WrapperContainer>
    )
}
export default AuthRouter;