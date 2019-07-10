import { axiosInstance } from 'boot/axios';

export function getAllProvinces() {
    return axiosInstance({
        url: '/districts/province',
        method: 'get'
    });
}

export function getCitiesByProvince(adcode) {
    return axiosInstance({
        url: `/districts/belong/${adcode}/city`,
        method: 'get'
    });
}

export function getDistrictsByCity(adcode) {
    return axiosInstance({
        url: `/districts/belong/${adcode}/district`,
        method: 'get'
    });
}