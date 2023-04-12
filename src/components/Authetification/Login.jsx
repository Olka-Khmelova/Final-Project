import React  from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { loginThunk } from '../../store/thunks';
import { ToastContainer} from 'react-toastify';
import { useForm } from 'react-hook-form';
import { loginValidationData, passwordValidationData } from '../../helpers/validation';
import AuthWrapper from '../../containers/AuthWrapper/AuthWrapper';
import InputPassword from '../InputPassword';
import './index.css';

const Login = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState} = useForm();
  
    const onSubmit = (value) => {
      dispatch(loginThunk(value))
    }
  
    return (
        <AuthWrapper>
        <div className="content-block">
            <ToastContainer/>
            <p className="heading">Sign Up</p>
            <form className="form-block" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                    label="Login"
                        className="input-block"
                        id="Login" 
                        type="text" 
                        name="login" 
                        placeholder="Enter your login"
                        error={formState.errors.login}
                        {...register("login")}
                    />
                    <InputPassword
                    label="Password"
                        className="input-block"
                        id ="password" 
                        name="password" 
                        placeholder="Enter your password"
                        error={formState.errors.password}
                        {...register("password")}
                    />
                <Button className="submit-button style-button-submit" type="submit"  name="Sign up"></Button>
            </form>
            <div className="link-block">
                If you don't have account you can <NavLink className="link" to='/registration'>Registration</NavLink>
            </div>
        </div>
        </AuthWrapper>
    );
}

export default Login;