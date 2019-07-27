import { axiosInstance } from '@/boot/axios';

/**
 * role: @/data/const/role.js => CONST_ROLE_TYPE
 */

export function checkUsername(data) {
    return axiosInstance({
        url: '/user/check',
        method: 'post',
        data: {
            username: data
        }
    });
}

export function getUser(data) {
    return axiosInstance({
        url: '/user/info/self',
        method: 'get'
    });
}

export function getUserById(id, role) {
    return axiosInstance({
        url: `/user/info/${role}/${id}`,
        method: 'get'
    });
}


export function createUser(data, role) {
    return axiosInstance({
        url: `/user/create/${role}`,
        method: 'post',
        data: data
    });
}

export function updateUser(data) {
    return axiosInstance({
        url: `/user/update/self`,
        method: 'post',
        data: data
    });
}

export function updateUserById(id, data, role) {
    return axiosInstance({
        url: `/user/update/${role}/${id}`,
        method: 'post',
        data: data
    });
}

export function resetUserPwd(data) {
    return axiosInstance({
        url: `/user/password/self`,
        method: 'post',
        data: data
    });
}

export function resetUserPwdById(id, data, role) {
    return axiosInstance({
        url: `/user/password/${role}/${id}`,
        method: 'post',
        data: data
    });
}



