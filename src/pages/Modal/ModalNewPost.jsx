import React, { useState } from 'react';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { createPostThunk } from '../../store/thunks';
import { CloseModal } from '../../components/Icons/Icons';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import './modal.css';

const ModalNewPost = ({closeModalNewPostFunction}) => {
    const dispatch = useDispatch();
    const [postImage, updatePostImage] = useState();
    
    const { handleSubmit, register } = useForm();

    // const setPostImage = (e) => {
    //     debugger;
    //     let reader = new FileReader();
    //     let file = e.target.files[0];
    //     reader.onloadend = () => {
    //         updatePostImage(reader.result);
    //     }
    //     reader.readAsDataURL(file)
    // }

    const onSubmit = (value, e) => {
        debugger
        e.preventDefault();
        const file = value.postImg[0];
        const title = value.title;

        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', title);

        dispatch(createPostThunk(formData));
        closeModalNewPostFunction();
    };

    return (
        <div className="modal">
            <div className="modal-new-post">
                <form className="new-post-block" onSubmit={handleSubmit(onSubmit)}>
                    <div className="header">
                        <h3 className="title-header">New publication</h3>
                        <CloseModal closeModal={closeModalNewPostFunction}/>
                    </div>
                    <div className="add-new-photo">
                        {postImage ? <img className="new-photo" src={postImage} alt="postImage"/> : ''}
                        <label className="filebutton">
                            Upload file
                            <span>
                                <Input 
                                    type="file" 
                                    id="image" 
                                    name="image" 
                                    {...register('postImg')}
                                />
                            </span>
                        </label>
                        <div className="error-form"></div>
                    </div>
                    <div>
                        <div>
                            <Input
                                className="photo-caption"
                                id="title" 
                                type="text" 
                                name="title" 
                                placeholder="Add description..."
                                {...register('title')}
                            />
                        </div>
                        <div className="error-form">{}</div>
                    </div>
                    <Button className="btn-add" name="Add"></Button>
                </form>
            </div>
        </div>
    );
}

export default ModalNewPost;