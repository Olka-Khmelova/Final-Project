import React, {useEffect} from 'react';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { UserAvatar } from '../../components/Icons/Icons';
import { useSelector } from 'react-redux';
import { getSelectedPostSelector, getLikes } from '../../store/selectors';
import { Like } from '../../components/Icons/Icons';
import { Forward } from '../../components/Icons/Icons';
import { getPostByIdThunk, likePostThunk } from '../../store/thunks';
import { useDispatch } from 'react-redux';
import './modal.css';

const ModalPost = ({avatar, login, currentUserLogin, closeModalFunction, postId}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPostByIdThunk(postId))
    }, [postId, dispatch]);
    
    const post = useSelector(getSelectedPostSelector);

    const likes = useSelector(getLikes);
    const likePost = () => {
        dispatch(likePostThunk(postId));
    }
    
    const isLiked = () => {
        return (likes && likes.map(user => user.login).find(userLogin => userLogin === currentUserLogin)) ? true : false;
    }

    return (
        <div className="modal" onClick={closeModalFunction}>
            <div className="modal-conteiner" onClick={(e)=> e.stopPropagation()}>
                <div className="photo-block">
                    <img className="photo" src={post.imgUrl} alt="post"/>
                </div>
                <div className="common">
                    <div className="modal-content">
                        <div className="modal-user">
                            <div className="avatar-modal-block">
                                {avatar ? <img className="avatar-modal" src={avatar} alt="avatar" /> : <UserAvatar/>}
                            </div>
                            <div className="modal-title">{login}</div>
                        </div>
                        <div className="comments-view">
                            {post.title} 
                        </div>
                    </div>
                    <form className="modal-form">
                        <div className="modal-active">
                            <ul className="icon-items">
                                <li className="icon" onClick={likePost}>
                                    <Like isLiked={isLiked()}/>
                                </li>
                                <li className="icon">
                                    <Forward/>
                                </li>
                            </ul>
                            <div>
                               <LikesBlock likes={post.likes}/>
                            </div>
                                
                        </div>
                        <div className="comments-block">
                            <div>
                                <Input className="comment" placeholder="Add comments..."/>
                            </div>
                            <Button className="button-send" name="Send"></Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

const LikesBlock = ({likes}) => {
    if (likes && likes.length > 0) {
        return (
            <div className="number-likes">
                Likes <span>{likes[0].login || ''}</span> and <span>{likes.length - 1}</span> other...
            </div>
        );
    }
    return (<div className="number-likes"></div>);
}

export default ModalPost;