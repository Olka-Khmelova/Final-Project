import React, { useState, useEffect }  from 'react';
import { NavLink} from 'react-router-dom';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { Like } from '../../components/Icons/Icons';
import { Forward } from '../../components/Icons/Icons';
import { UserAvatar } from '../../components/Icons/Icons';
import { getUserFetch } from '../../services/Api/UserApi';
import { getFeedsSelector, getUserDataSelector} from '../../store/selectors';
import { getFeedThunk, likePostFromFeedThunk, getCurrentUserThunk } from '../../store/thunks';
import { useDispatch, useSelector } from 'react-redux';
import './Feeds.css';

const Feeds = () => {
    const dispatch = useDispatch();
    const feeds = useSelector(getFeedsSelector);
    const currentUser = useSelector(getUserDataSelector);


    // useEffect(() => {
    //     dispatch(getCurrentUserThunk());
    //     if (userId) {
    //         dispatch(getUserByIdThunk(userId));
    //     }
    // }, [dispatch, userId]);


    useEffect(() => {
        dispatch(getFeedThunk());
        dispatch(getCurrentUserThunk());
    }, [dispatch]);



    const currentLogin = currentUser ? currentUser.login : '';

    const likePost = (postId) => {
        dispatch(likePostFromFeedThunk(postId));
    }
    const getFeedById = (postId) => {
        if (feeds) {
            return feeds.find(feed => feed._id === postId);
        }
        return [];
    }

    const isLiked = (postId) => {
        const feed = getFeedById(postId);
        return feed.likes.map(user => user.login).find(userLogin => userLogin === currentLogin) ? true : false;
    }

    return (
        <>
            <Header title="Feeds"/>
            <div className="wrapper">
                <div className="common-block">
                    <div className="feeds-wrapper">
                        <div className="post-block">
                            {
                                feeds.slice(0).reverse().map(element => {
                                    return(
                                        <div className="post">
                                            <div className="photo-wrapper">
                                                <NavLink to={`/profile/${element.ownerId}`}>
                                                    <div className="autor-post-info">
                                                        {<UserAvatar />}
                                                        <p className="autor-post-title">{element.ownerId}</p>
                                                        </div>

                                                <img className="post-photo" src={element.imgUrl} alt="post"/>
                                                </NavLink>
                                            </div>
                                            <form className="modal-form">
                                                <div className="modal-active">
                                                    <ul className="icon-items">
                                                        <li className="icon" onClick={() => likePost(element._id)}>
                                                            <Like isLiked={isLiked(element._id)}/>
                                                        </li>
                                                        <li className="icon">
                                                            <Forward/>
                                                        </li>
                                                    </ul>
                                                    {element.likes.length > 0 ? 
                                                        <div className="number-likes">
                                                            Liked by <span>{element.likes.map((elem, i) => i === 0 ? elem.login : null)}</span> {element.likes.length > 1 ? <>and <span>{element.likes.length-1}</span> other...</> : null}
                                                        </div>
                                                        : null
                                                    }
                                                </div>
                                                <div className="comments-block">
                                                    <div>
                                                        <Input className="comment" placeholder="Add comments..."/>
                                                    </div>
                                                    <Button className="button-send" name="Send"></Button>
                                                </div>
                                            </form>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Feeds;