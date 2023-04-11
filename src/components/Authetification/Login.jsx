import React  from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { loginThunk } from '../../store/thunks';
import { ToastContainer} from 'react-toastify';
import { useForm } from 'react-hook-form';
import { loginValidationData, passwordValidationData } from '../../helpers/validation';
import InputPassword from '../InputPassword';

const Login = () => {
    debugger;
    const dispatch = useDispatch();
    const { register, handleSubmit, formState} = useForm();
  
    const onSubmit = (value) => {
        debugger
      dispatch(loginThunk(value))
    }
  
    return (
        <div className="content-block">
            <ToastContainer/>
            <p className="heading">Sign Up</p>
            <form className="form-block" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                    label="login"
                        className="input-block"
                        id="login" 
                        type="text" 
                        name="login" 
                        placeholder="Enter your login"
                        error={formState.errors.login}
                        {...register("login")}
                    />
                    <label>Password</label>
                    <Input
                    label="password"
                        className="input-block"
                        id ="password" 
                        type="password" 
                        name="password" 
                        placeholder="Enter your password"
                        error={formState.errors.password}
                        {...register("password")}
                    />
                <Button className="submit-button style-button-submit" type="submit"  name="Sign up"></Button>
            </form>
            <div className="link-block">
                If you not have account you can <NavLink className="link" to='/registration'>Registration</NavLink>
            </div>
        </div>
    );
}

export default Login;