import { axiosInstance } from 'boot/axios';

export const AUTH_TYPE = {
    STAFF: 'staff',
    MANAGER: 'manager',
    BOSS: 'boss'
};

export function doRegister (data, type) {
    return axiosInstance({
        url: `/auth/register/${type}`,
        method: 'post',
        data: data
    });
}

export function checkUsername (data) {
    return axiosInstance({
        url: '/auth/check',
        method: 'post',
        data: {
            username: data
        }
    });
}

export function doLogin (data) {
    return axiosInstance({
        url: '/auth/login',
        method: 'post',
        data: {
            username: data.username,
            password: data.password
        }
    });
}

export function getUser (data) {
    return axiosInstance({
        url: '/auth/user',
        method: 'get'
    });
}

export function getSelfRouters () {
    return axiosInstance({
        url: '/auth/routers',
        method: 'get'
    });
}