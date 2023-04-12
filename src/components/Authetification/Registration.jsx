import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { registrationThunk } from '../../store/thunks';
import { ToastContainer} from 'react-toastify';
import { useForm } from 'react-hook-form';
import { loginValidationData,
    emailValidationData,
    passwordValidationData } from '../../helpers/validation';
import AuthWrapper from '../../containers/AuthWrapper/AuthWrapper';
import InputPassword from '../InputPassword';
import './index.css';


const Registration = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState } = useForm();
    let navigate = useNavigate();

     
  
    const redirectToLogin = () => {
        navigate('/');
    }
  
    const onSubmit = (value) => {
      dispatch(registrationThunk(value, redirectToLogin))
    }
  
    return (
        <AuthWrapper>
        <div className="content-block">
            <p className="heading">Sign Up</p>
            <ToastContainer/>
            <form className="form-block" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Input
                        className="input-block"
                        label="Login"
                        type="text" 
                        name="login" 
                        placeholder="Enter your login"
                        error={formState.errors.login}
                        {...register("login", loginValidationData)}
                    />
                    <div className="error-form">{}</div>
                    <Input
                        className="input-block"
                        label="Email"
                        type="text" 
                        name="email" 
                        placeholder="Enter your email"
                        error={formState.errors.email}
                        {...register("email", emailValidationData)}
                    />
                    <div className="error-form">{}</div>
                    <InputPassword
                        className="input-block"
                        label="Password"
                        name="password" 
                        placeholder="Enter your password"
                        error={formState.errors.password}
                        {...register("password", passwordValidationData)}
                    />
                    <div className="error-form">{}</div>
                </div>
                <Button className="submit-button style-button-submit" id="submit-button" name="Sign up" type="submit"></Button>
            </form>
            <div className="link-block">
                If you have account you can <NavLink className="link" to='/'>Login</NavLink>
            </div>
        </div>
        </AuthWrapper>
    );
};

export default Registration;