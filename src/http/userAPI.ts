// import { $authHost, $host } from './index';
// import jwt_decode from 'jwt-decode';

// export const registration = async (email, password) => {
//     const { data } = await $host.post('api/user/registration', {
//         email,
//         password,
//     });
//     localStorage.setItem('accessToken', data.accessToken);
//     return jwt_decode(data.accessToken);
// };
// export const login = async (email, password) => {
//     const { data } = await $host.post('api/user/login', { email, password });
//     localStorage.setItem('accessToken', data.accessToken);
//     return jwt_decode(data.accessToken);
// };
// export const check = async () => {
//     try {
//         const { data } = await $authHost.get('api/user/auth');
//         localStorage.setItem('accessToken', data.accessToken);
//         return jwt_decode(data.accessToken);
//     } catch (e) {
//         console.log('ошибка');
//     }
// };
