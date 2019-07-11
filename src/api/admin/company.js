import { axiosInstance } from 'boot/axios';

export function addOrEditCompany(data) {
    return axiosInstance({
        url: '/admin/company/addedit',
        method: 'post',
        data: data
    });
}

export function checkCompanyName(data) {
    return axiosInstance({
        url: '/admin/company/check',
        method: 'post',
        data: {
            name: data
        }
    });
}

export function getAllCompanies() {
    return axiosInstance({
        url: '/admin/company/all',
        method: 'get'
    });
}

export function getCompanyInfo(id) {
    return axiosInstance({
        url: `/admin/company/${id}`,
        method: 'get'
    });
}