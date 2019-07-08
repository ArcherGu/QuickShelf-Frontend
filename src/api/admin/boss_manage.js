import { axiosInstance } from 'boot/axios';

export function getAllBosses() {
    return axiosInstance({
        url: '/admin/boss/all',
        method: 'get'
    });
}

export function getBossBy(id) {
    return axiosInstance({
        url: '/admin/boss/all',
        method: 'get'
    });
}