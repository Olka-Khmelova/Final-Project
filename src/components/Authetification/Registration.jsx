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
import InputPassword from '../InputPassword';


const Registration = () => {
    debugger;
    const dispatch = useDispatch();
    const { register, handleSubmit, formState } = useForm();
    let navigate = useNavigate();

     
  
    const redirectToLogin = () => {
        navigate('/');
    }
  
    const onSubmit = (value) => {
        debugger
      dispatch(registrationThunk(value, redirectToLogin))
    }
  
    return (
        <div className="content-block">
            <p className="heading">Sign Up</p>
            <ToastContainer/>
            <form className="form-block" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Login</label>
                    <Input
                        className="input-block"
                        id="login" 
                        type="text" 
                        name="login" 
                        placeholder="Enter your login"
                        error={formState.errors.login}
                        {...register("login", loginValidationData)}
                    />
                    <div className="error-form">{}</div>
                    <label>Email</label>
                    <Input
                        className="input-block"
                        id ="email" 
                        type="text" 
                        name="email" 
                        placeholder="Enter your email"
                        error={formState.errors.email}
                        {...register("email", emailValidationData)}
                    />
                    <div className="error-form">{}</div>
                    <label>Password</label>
                    <Input
                        className="input-block"
                        id ="password" 
                        type="password" 
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
    );
};

export default Registration;