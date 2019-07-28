import { axiosInstance } from '@/boot/axios';

export function saveCompany(data) {
    return axiosInstance({
        url: '/company/save',
        method: 'post',
        data: data
    });
}

export function checkCompanyName(data) {
    return axiosInstance({
        url: '/company/check',
        method: 'post',
        data: {
            name: data
        }
    });
}

export function getAllCompanies() {
    return axiosInstance({
        url: '/company/all',
        method: 'get'
    });
}

export function getCompanyById(id) {
    return axiosInstance({
        url: `/company/info/${id}`,
        method: 'get'
    });
}

export function linkCompanyAndBoss(data) {
    return axiosInstance({
        url: '/company/link',
        method: 'post',
        data: data
    });
}