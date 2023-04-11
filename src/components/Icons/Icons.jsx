import React from 'react';
import {ReactComponent as LikeIcon} from '../../assets/icons/like_icon.svg';
import {ReactComponent as ForwardIcon} from '../../assets/icons/forward_icon.svg';
import {ReactComponent as NotFound} from '../../assets/icons/not_found_user.svg';
import {ReactComponent as Avatar} from '../../assets/icons/avatar.svg';
import {ReactComponent as User} from '../../assets/icons/user_icon.svg';
import {ReactComponent as Logout} from '../../assets/icons/logout_icon.svg';
import {ReactComponent as Search} from '../../assets/icons/icons_search2.svg';
import {ReactComponent as Plus} from '../../assets/icons/icons-plus.svg';
import {ReactComponent as Home} from '../../assets/icons/icons_home.svg';
import eye from '../../assets/icons/eye.png';
import eyeSlash from '../../assets/icons/eye_slash.png';
import close from '../../assets/icons/icons_close.png';
import './index.css'


export const Like = ({isLiked}) => {
    console.log(isLiked);
    return (
        <div>
            <LikeIcon className={isLiked ? 'like' : ''}/>
        </div>
    );
}

export const Forward = () => {
    return (
        <div>
            <ForwardIcon/>
        </div>
    );
}
export const EyeIcon = () => {
    return (
        <div >
            <img src={eye} alt="show password" className="show_password_icon"/>
        </div>
    );
}
export const EyeslashIcon = () => {
    return (
        <div >
            <img src={eyeSlash} alt="hide password" className="hide_password_icon"/>
        </div>
    );
}

export const NotFoundUser = () => {
    return (
        <div>
            <NotFound className="not-found"/>
        </div>
    );
}

export const UserAvatar = () => {
    return (
        <Avatar />
    );
}

export const UserProfile = () => {
    return (
        <div>
            <User />
        </div>
    );
}

export const LogoutUser = () => {
    return (
        <div>
            <Logout />
        </div>
    );
}

export const SearchUser = () => {
    return (
        <div>
            <Search />
        </div>
    );
}

export const PlusPost = () => {
    return (
        <div>
            <Plus />
        </div>
    );
}

export const CloseModal = ({closeModal}) => {
    return (
        <div onClick={closeModal} className="close-modal">
            <img src={close} alt="close" className="close-icon"/>
        </div>
    );
}

export const OpenFeeds = () => {
    return (
        <div>
            <Home />
        </div>
    );
}