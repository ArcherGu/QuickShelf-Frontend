import { axiosInstance } from '@/boot/axios';

export function doLogin(data) {
    return axiosInstance({
        url: '/auth/login',
        method: 'post',
        data: {
            username: data.username,
            password: data.password
        }
    });
}

export function getSelfRouters() {
    return axiosInstance({
        url: '/auth/routers',
        method: 'get'
    });
}