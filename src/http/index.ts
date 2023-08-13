import axios, { InternalAxiosRequestConfig } from 'axios'; 
import {SERVER_URL} from '../utils/consts'

const $host = axios.create({
    baseURL: SERVER_URL,
    // withCredentials: true,
});

const $authHost = axios.create({
    baseURL: SERVER_URL,
    // withCredentials: true,
});

const authInterceptor = (config: InternalAxiosRequestConfig<any>) => {
    if (config.headers) { // Проверка на наличие headers
        config.headers.authorization = `Bearer ${localStorage.getItem(
            'accessToken',
        )}`;
    }
    return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
