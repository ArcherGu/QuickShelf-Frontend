import { axiosInstance } from '@/boot/axios';

export function getSelfRouters() {
    return axiosInstance({
        url: '/router/self',
        method: 'get'
    });
}

export function getAllRouters() {
    return axiosInstance({
        url: '/router/all',
        method: 'get'
    });
}

export function saveRouter(data) {
    return axiosInstance({
        url: '/router/save',
        method: 'post',
        data: data
    });
}