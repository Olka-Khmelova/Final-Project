import {loginFetch, registrationFetch} from '../services/Api/AuthApi';
import { toast, Slide } from 'react-toastify';
import {
    getUserFetch, 
    updateCurrentUserFetch, 
    createPostFetch,
    getPostByIdFetch,
    updatePasswordFetch,
    getUsersByLoginFetch,
    followUserFetch,
    getFeedFetch,
    likePostFetch,
    getUsersFetch,
    // getFollowingsAndFollowersByIdFetch
} from '../services/Api/UserApi';
import {
    loginAction, 
    logoutAction, 
    getUserAction, 
    getUserByIdAction,
    changeCurrentUserAction, 
    getPostByIdAction,
    getUserByLoginAction,
    getFeedAction,
    getUsersAction,
    // getFollowingsByIdAction,
    // getFollowersByIdAction
} from './actions';

export const registrationThunk = (userData, redirectToLogin) => {
    return async () => {
      try {
        await registrationFetch(userData);
  
        toast.success('Registration success', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          transition: Slide,
          onClose: () => redirectToLogin(),
        });
      } catch (e) {
        toast.error(e.response.data);
       }
    }
  }

export const loginThunk = (userData) => {
    return async (dispatch) => {
      try {
        const { access_token } = await loginFetch(userData);
        localStorage.setItem('access_token', access_token);
        dispatch(getCurrentUserThunk())
        dispatch(loginAction(access_token))
      } catch (error) { 
        toast.error('Login or password entered incorrectly');
      }
    }
  }

export const getCurrentUserThunk = () => {
    return async (dispatch) => {
        try {
            const {id, login, avatar, firstName, lastName, following, followers, posts, email} = await getUserFetch('current');
            dispatch(getUserAction({id, login, avatar, firstName, lastName, following, followers, posts, email}));
        }
        catch(e) {
            console.log(e);
        }
    }
}

export const getUserByIdThunk = (userId) => {
    return async (dispatch) => {
        try {
            const {id, login, avatar, firstName, lastName, followingsCount, followersCount, posts, email} = await getUserFetch(userId);
            dispatch(getUserByIdAction({id, login, avatar, firstName, lastName, followingsCount, followersCount, posts, email}));
        }
        catch(e) {
            console.log(e);
        }
    }
}


export const changeCurrentUserThunk = (data) => {
    return async (dispatch) => {
        try {
            const {id, login, avatar, firstName, lastName, email} = await updateCurrentUserFetch(data);
            dispatch(changeCurrentUserAction({id, login, avatar, firstName, lastName, email}));
            toast('Profile changed successfully');
        }
        catch(e) {
            console.log(e);
        }   
    }
}

export const createPostThunk = (data) => {
    return async (dispatch) => {
        try {
            await createPostFetch(data);
            dispatch(getCurrentUserThunk());
        }
        catch(e) {
            console.log(e);
        } 
    }
}

export const likePostThunk = (postId) => {
    return async (dispatch) => {
        try {
            await likePostFetch(postId);
            dispatch(getPostByIdThunk(postId));
        }
        catch(e) {
            console.log(e);
        }
    }
}

export const likePostFromFeedThunk = (postId) => {
    return async (dispatch) => {
        try {
            await likePostFetch(postId);
            dispatch(getFeedThunk());
        }
        catch(e) {
            console.log(e);
        }
    }
}

export const updatePasswordThunk = (data) => {
    return async () => {
        try {
            debugger
            await updatePasswordFetch(data);
            toast('Password changed successfully');
        }
        catch(e) {
            console.log(e);
            toast.error(e.response.data);
        }
    }
}

export const getPostByIdThunk = (id) => {
    return async (dispatch) => {
        try {
            const {_id, imgUrl, title, likes, ownerId} = await getPostByIdFetch(id);
            dispatch(getPostByIdAction({_id, imgUrl, title, likes, ownerId}));
        }
        catch(e) {
            console.log(e); 
        }
        
    }
}

export const getFeedThunk = () => {
    return async (dispatch) => {
        try {
            const feed = await getFeedFetch();
            dispatch(getFeedAction(feed));
        }
        catch(e) {
            console.log(e); 
        }
    }
}

export const getUsersByLoginThunk = (userLogin) => {
    return async (dispatch) => {
        try {
            const users = await getUsersByLoginFetch(userLogin);
            dispatch(getUserByLoginAction(users));
        }
        catch(e) {
            console.log(e); 
        }
    }
}
export const getUsersThunk = () => {
    return async (dispatch) => {
        try {
            const usersList = await getUsersFetch();
            dispatch(getUsersAction(usersList));
        }
        catch(e) {
            console.log(e); 
        }
    }
}

export const getUserFollowersByLoginThunk = (userLogin, currentUser) => {
    return async (dispatch) => {
        try {
            let users = [];
            if (currentUser.followers) {
                users = currentUser.followers.filter(user => user.login && user.login.toLowerCase().includes(userLogin.toLowerCase()));
            }
            dispatch(getUserByLoginAction(users));
        }
        catch(e) {
            console.log(e); 
        }   
    }
}

export const getUserFollowingsByLoginThunk = (userLogin, currentUser) => {
    return async (dispatch) => {
        try {
            let users = [];
            if (currentUser.following) {
                users = currentUser.following.filter(user => user.login && user.login.toLowerCase().includes(userLogin.toLowerCase()));
            }
            dispatch(getUserByLoginAction(users)); 
        }
        catch(e) {
            console.log(e); 
        }
    }
}
// export const getFollowingsByIdThunk = (_, userId) => {
//     return async (dispatch) => {
//         try {
//             const { following } = await getFollowingsAndFollowersByIdFetch(userId);
//             dispatch(getFollowingsByIdAction(following));
//         }
//         catch(e) {
//             console.log(e);
//         }
//     }
// }
// export const getFollowersByIdThunk = (_, userId) => {
//     return async (dispatch) => {
//         try {
//             const { followers } = await getFollowingsAndFollowersByIdFetch(userId);
//             dispatch(getFollowersByIdAction(followers));
//         }
//         catch(e) {
//             console.log(e);
//         }
//     }
// }

export const followUserThunk = (userId) => {
    return async(dispatch) => {
        try{
            await followUserFetch(userId);
            dispatch(getCurrentUserThunk());        
        }
        catch(e) {
            console.log(e); 
        }
    }
}

export const followUserFromProfileThunk = (userId) => {
    return async(dispatch) => {
        try {
            await followUserFetch(userId);
            dispatch(getUserByIdThunk(userId));
            dispatch(getCurrentUserThunk());
        }
        catch(e) {
            console.log(e); 
        }
    }
}

export const logoutThunk = () => {
    return async (dispatch) => {
      localStorage.removeItem('access_token');
      dispatch(logoutAction())
    }
  }

export const initThunk = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                return dispatch(logoutThunk());
            }
            dispatch(loginAction(token));
        } catch (e) {
            console.log(e);
        }
    }
}