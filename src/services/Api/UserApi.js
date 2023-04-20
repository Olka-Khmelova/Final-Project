import axios from "axios";
import API_URL from "./Api";

axios.interceptors.request.use(function (config) {
    config.headers = {
        ...config.headers,
        Authorization: localStorage.getItem('access_token'),
    }
    return config;
}, function (error) {
    console.log('REQUEST ERROR');
    return Promise.reject(error);
});

export const getUserFetch = async (id) => {
    const {data} = await axios.get(`http://52.3.249.107:9000/users/${id}`);
    return data;
}

export const updateCurrentUserFetch = async (updateUserData) => {
    const {data} = await axios.patch(`http://52.3.249.107:9000/users/current`, updateUserData);
    return data;
}

export const createPostFetch = async (postData) => {
    const {data} = await axios.post(`${API_URL}/posts`, postData);
    return data;
}

export const getPostByIdFetch = async (postId) => {
    const {data} = await axios.get(`${API_URL}/posts/${postId}`);
    return data;
} 

export const getUsersByLoginFetch = async (userLogin) => {
    const {data} = await axios.get(`${API_URL}/users?search=${userLogin}`);
    return data;
}

export const getFollowingsAndFollowersByIdFetch = async (userId) => {
        try {
            debugger
            const {data} = await axios.get(`http://52.3.249.107:9000/users/followersAndFollowing/${userId}`);
            return data;
}
        catch(e) {
            console.log(e);
        }
    }
    

export const updatePasswordFetch = async (updatePassword) => {
    const {data} = await axios.post(`${API_URL}/auth/updatePassword`, updatePassword);
    return data;
}

export const getFeedFetch = async () => {
    const {data} = await axios.get(`http://52.3.249.107:9000/posts/feed`);
    return data;
}

export const likePostFetch = async (postId) => {
    const {data} = await axios.get(`${API_URL}/posts/like/${postId}`);
    return data;
}

export const followUserFetch = async (userId) => {
    await axios.get(`${API_URL}/users/follow/${userId}`);
}