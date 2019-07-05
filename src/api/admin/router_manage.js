import { axiosInstance } from 'boot/axios';

export function addOrEditRouter (data) {
    return axiosInstance({
        url: '/admin/router/addedit',
        method: 'post',
        data: data
    });
}

export function getAllRouters () {
    return axiosInstance({
        url: '/admin/router/all',
        method: 'get'
    });
}