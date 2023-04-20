import React, {useEffect, useState} from 'react';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { UserAvatar } from '../../components/Icons/Icons';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentUserThunk, getUserByIdThunk, getCurrentUserThunk } from '../../store/thunks';
import { useForm } from 'react-hook-form';
import {fileValidation, nameValidation, emailValidationData} from '../../helpers/validation';
import { getUserDataSelector } from '../../store/selectors';
import { ToastContainer } from 'react-toastify';
import { convertToBase64 } from '../../helpers/convertToBase64';
import 'react-toastify/dist/ReactToastify.css';
import './Settings.css';


const ChangeProfile = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector(getUserDataSelector);
    const [avatar, setAvatar] = useState(user.avatar);
    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        }
    });
    useEffect(() => {
        dispatch(getCurrentUserThunk());
        if (userId) {
            dispatch(getUserByIdThunk(userId));
        }
    }, [dispatch, userId]);

        const handelAvatarChange = async (e) => {
            const base64Url = await convertToBase64(e.target.files[0]);
            e.target.value = null;
            setAvatar(base64Url);
        }

    const onSubmit = (data) => {
        dispatch(changeCurrentUserThunk({...data, avatar}))
    }
    const deleteAvatar =() => {
        setAvatar(<UserAvatar/>);
    }

    return (
        <form className="setting-block" onSubmit={handleSubmit(onSubmit)}>
            <ToastContainer/>
            <div className="file-field">
                <label className="label">
                    <div className="btn-floating">
                        {user.avatar ? <img className="avatar-user" src={avatar} alt="avatar"/> : <UserAvatar/>}
                        <div>
                            <Input 
                                type="file" 
                                id="avatar" 
                                name="avatar" 
                                onChange={handelAvatarChange} 
                            />
                        </div>
                    </div>
                </label>
            </div>
            <h3>Change profile</h3>
            <div className="user-data">
                <div className="block">
                    <aside className="aside">
                        <label>Name</label>
                    </aside>
                    <div className="change-text">
                        <div>
                            <Input
                                className="text"
                                id="firstName" 
                                type="text" 
                                name="firstName" 
                                placeholder="First name"
                                error={formState.errors.firstName}
                                {...register('firstName', nameValidation)}
                            />
                        </div>
                        <div className="error-form"></div>
                    </div>
                </div>
                <div className="block">
                    <aside className="aside">
                        <label>Last Name</label>
                    </aside>
                    <div className="change-text">
                        <div>
                            <Input
                                className="text"
                                id="lastName" 
                                type="text" 
                                name="lastName"
                                placeholder="Last name"
                                error={formState.errors.lastName}
                                {...register('lastName', nameValidation)}
                            />
                        </div>
                        <div className="error-form"></div>
                    </div>
                </div>
                <div className="block">
                    <aside className="aside">
                        <label>Email</label>
                    </aside>
                    <div className="change-text">
                        <div>
                            <Input
                                className="text"
                                id="email" 
                                type="text" 
                                name="email" 
                                placeholder="email"
                                error={formState.errors.email}
                                {...register('email', emailValidationData)}
                            />
                        </div>
                    </div>
                </div>
                
                <div className="btn">
                    <Button className="btn-subscribe" name="Change" type="submit"/>
                </div>
            </div>
        </form>                      
    );
}

export default ChangeProfile;