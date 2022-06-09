
import axios from 'axios';
// import constant from '@/common/constant.js';

const instance = axios.create({
    baseURL: import.meta.env.VITE_DEVELOPMENT_API_URL,
    // baseURL: 'http://3.37.95.131:8075/v1/',
});

instance.interceptors.request.use(
    function (config) {
        console.log('config', config);
        return config;
    },
    function (error) {
        return error;
    }
);

instance.interceptors.response.use(
    function (response) {
        console.log('api response >> ', response.data.resultVO);
        return response;
    },
    function (error) {
        // return Promise.reject(error);
        return error;
    }
);

export default instance;