import React from 'react';
import Button from '../../components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { updatePasswordThunk } from '../../store/thunks';
import { useForm } from 'react-hook-form';
import { getUserDataSelector } from '../../store/selectors'
import './Settings.css';
import { toast, Slide, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { passwordValidationData } from '../../helpers/validation';
import Input from '../../components/Input/Input';
import InputPassword from '../../components/InputPassword';



const ChangePassword = () => {
        const user = useSelector(getUserDataSelector);
        const { register, handleSubmit, formState,   getValues } = useForm({
            defaultValues: {
                password: user.password,
                confirmPassword: null,
            }
        });
    
    const refPassword = {
        required: {
            value: true,
        },
        pattern: {
            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/,
            message: 'Password must contains alphabet symbols, numbers and special characters!'
        }
    }
    
    const refConfirmPassword ={
        required: {
            value: true,
        },
        pattern: {
            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/,
            message: 'The passwords do not match!'
        }
    
    }
    const dispatch = useDispatch();
    const onSubmitPassword = ({ password, confirmPassword }) => {
        debugger
        if (password !== confirmPassword) {
          toast.error('Passwords are not equal', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            transition: Slide,
          });
          return;
        }
        dispatch(updatePasswordThunk({
          password,
          confirmPassword
        }))
      }

    return (
        <form className="setting-block" onSubmit={handleSubmit(onSubmitPassword)}>
            <ToastContainer/>
            <h3>Change password</h3>
            <div className="user-data">
                <div className="block">
                    <aside className="aside">
                        <label>New Password</label>
                    </aside>
                    <div className="change-text">
                        <Input
                            className="text"
                            id="password" 
                            type="password" 
                            name="password" 
                            placeholder="password"
                            error={formState.errors.message}
                            {...register("password", {
                                required: true
                               })}
                        />
                        <div className="error-form"></div>
                    </div>
                </div>
                <div className="block">
                    <aside className="aside">
                        <label>Confirm new password</label>
                    </aside>
                    <div className="change-text">
                        <Input
                            className="text"
                            id="confirmPassword" 
                            type="password" 
                            name="confirmPassword" 
                            placeholder="confirm password"
                            error={formState.errors.message}
                            {...register("confirmPassword", {
                                required: true,
                                    validate: (value) => { 
                                        const { password } = getValues();
                                        return password === value || 'Passwords are not equal';
                                  }
                                })}
                        />
                        <div className="error-form"></div>
                    </div>
                </div>
                <div className="btn">
                    <Button className="btn-subscribe" name="Change" type="submit" disabled={!formState.isValid && formState.isSubmitted}/>
                </div>
            </div>
        </form>
    );
}

export default ChangePassword;