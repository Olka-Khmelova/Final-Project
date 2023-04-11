import ActionTypes from './actionTypes';

const createInitialState = () => {
    return {
        currentUser: {
            auth: false,
            access_token: '',
        },
        currentId: '',
        usersList: [],
        userData: {},
        selectedUser: {},
        selectedPost: {
        },
        feeds: []
    }
}

const userReducer = (state = createInitialState(), action) => {
    switch (action.type) {
        case ActionTypes.REGISTRATION:
            return {
                ...state,
                currentId: action.payload
            }
        case ActionTypes.GET_USERS:
            return {
                ...state,
                usersList: action.payload,
            }
        case ActionTypes.LOGIN:
            return {
                ...state,
                currentUser: {
                    auth: true,
                    access_token: action.payload,
                }
            }
        case ActionTypes.GET_CURRENT_USER:
            return {
                ...state,
                userData: action.payload
            }
        case ActionTypes.GET_USER_BY_ID:
            return {
                ...state,
                selectedUser: action.payload
            }
        case ActionTypes.GET_FEED:
            return {
                ...state,
                feeds: action.payload
            }
        case ActionTypes.CHANGE_CURRENT_USER:
            return {
                ...state,
                userData: action.payload
            }
        case ActionTypes.GET_POST_BY_ID:
            return {
                ...state,
                selectedPost: action.payload
            }
        case ActionTypes.GET_USERS_BY_LOGIN:
            return {
                ...state,
                usersList: action.payload
            }
        case ActionTypes.LOGOUT:
            localStorage.clear();
            return {
                ...state,
                currentUser: {
                    auth: false,
                    access_token: '',
                }
            }        
        default:
            return state;    
    }
}

export default userReducer;