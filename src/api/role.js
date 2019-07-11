import { axiosInstance } from '@/boot/axios';

export function getAllRoles(data) {
    return axiosInstance({
        url: '/role/all',
        method: 'get'
    });
}