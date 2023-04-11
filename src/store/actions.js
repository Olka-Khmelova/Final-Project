import ActionTypes from './actionTypes';

export const loginAction = (accessToken) => {
    return {
        type: ActionTypes.LOGIN,
        payload: accessToken
    }
}

export const logoutAction = () => {
    return {
        type: ActionTypes.LOGOUT,
    }
}

export const getUserAction = (currentUser) => {
    return {
        type: ActionTypes.GET_CURRENT_USER,
        payload: currentUser
    }
}

export const getUserByIdAction = (user) => {
    return {
        type: ActionTypes.GET_USER_BY_ID,
        payload: user
    }
}

export const changeCurrentUserAction = (changeUser) => {
    return {
        type: ActionTypes.CHANGE_CURRENT_USER,
        payload: changeUser
    }
}

export const registrationAction = (accessToken) => {
    return {
        type: ActionTypes.REGISTRATION,
        payload: accessToken
    }
}

export const getPostByIdAction = (getPost) => {
    return {
        type: ActionTypes.GET_POST_BY_ID,
        payload: getPost
    }
}

export const getUserByLoginAction = (getUser) => {
    return {
        type: ActionTypes.GET_USERS_BY_LOGIN,
        payload: getUser
    }
}

export const getFeedAction = (getFeed) => {
    return {
        type: ActionTypes.GET_FEED,
        payload: getFeed
    }
}