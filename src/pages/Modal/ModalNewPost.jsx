import React, { useState, useDispatch} from 'react';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { createPostThunk } from '../../store/thunks';
import { CloseModal } from '../../components/Icons/Icons';
import { useForm } from 'react-hook-form';
import './modal.css';

const ModalNewPost = ({closeModalNewPostFunction}) => {
    const [postImage, updatePostImage] = useState();
    
    const { handleSubmit, register, errors, setError} = useForm();

    const setPostImage = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            updatePostImage(reader.result);
        }
        reader.readAsDataURL(file)
    }

    const dispatch = useDispatch();
    const onSubmit = (value, e) => {
        e.preventDefault();
        const file = value.image[0];
        const title = value.title;

        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', title);

        if(file.size > 2e6) {
            setError("image", {
                type: "filesize",
                message: "File size should be no more than 2 Mb"
            })
            return;
        }

        dispatch(createPostThunk(formData));
        closeModalNewPostFunction();
    };

    const refTitle = () => {
        return {
            required: "Required",
            maxLength: {
                value: 20,
                message: "Invalid title. The title should be no more than 20 characters"
            }
        }
    }

    const refFile = () => {
        return {
            required: "Required",
            pattern: {
                value: /^.+(png|PNG|jpeg|JPEG|jpg|JPG)$/i,
                message: "Invalid file name"
            }
        }
    }

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
                                    onChange={setPostImage} 
                                    {...register('postImg', refFile)}
                                />
                            </span>
                        </label>
                        <div className="error-form">{errors.image && errors.image.message}</div>
                    </div>
                    <div>
                        <div>
                            <Input
                                className="photo-caption"
                                id="title" 
                                type="text" 
                                name="title" 
                                placeholder="Add description..."
                                {...register('title', refTitle)}
                            />
                        </div>
                        <div className="error-form">{errors.title && errors.title.message}</div>
                    </div>
                    <Button className="btn-add" name="Add"></Button>
                </form>
            </div>
        </div>
    );
}

export default ModalNewPost;