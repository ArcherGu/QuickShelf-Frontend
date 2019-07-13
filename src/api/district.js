import { axiosInstance } from '@/boot/axios';

export function getDetailsDist(data) {
    return axiosInstance({
        url: '/district/details',
        method: 'post',
        data: data
    });
}

export function getAllProvinces() {
    return axiosInstance({
        url: '/district/province',
        method: 'get'
    });
}

export function getCitiesByProvince(adcode) {
    return axiosInstance({
        url: `/district/city/${adcode}`,
        method: 'get'
    });
}

export function getAreasByCity(adcode) {
    return axiosInstance({
        url: `/district/area/${adcode}`,
        method: 'get'
    });
}