import { axiosInstance } from '@/boot/axios';

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

export function getUserById(id, type) {
    return axiosInstance({
        url: `/user/info/${type}/${id}`,
        method: 'get'
    });
}

/**
 * type: @/data/const/role.js => CONST_ROLE_TYPE
 */
export function createUser(data, type) {
    return axiosInstance({
        url: `/user/create/${type}`,
        method: 'post',
        data: data
    });
}

export function updateUserById(id, data, type) {
    return axiosInstance({
        url: `/user/update/${type}/${id}`,
        method: 'post',
        data: data
    });
}



