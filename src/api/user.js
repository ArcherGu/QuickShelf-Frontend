import { axiosInstance } from '@/boot/axios';

export const USER_TYPE = {
    STAFF: 'staff',
    MANAGER: 'manager',
    BOSS: 'boss'
};

export function checkUsername(data) {
    return axiosInstance({
        url: '/user/check',
        method: 'post',
        data: {
            username: data
        }
    });
}

export function createUser(data, type) {
    return axiosInstance({
        url: `/user/create/${type}`,
        method: 'post',
        data: data
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

