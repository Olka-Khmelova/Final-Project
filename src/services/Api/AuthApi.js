import axios from "axios";
import API_URL from "./Api";

axios.interceptors.request.use(function (config) {
    config.headers = {
        ...config.headers,
        Authorization: localStorage.getItem('access_token'),
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

export const loginFetch = async (userData) => {
    debugger
    const {data} = await axios.post(`${API_URL}/auth/login`, userData);
    return data;
}

export const registrationFetch = async (userData) => {
    debugger
    const {data} = await axios.post(`${API_URL}/auth/registration`, userData);
    return data;
}
