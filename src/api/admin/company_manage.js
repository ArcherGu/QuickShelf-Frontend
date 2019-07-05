import { axiosInstance } from 'boot/axios';

export function addOrEditCompany (data) {
    return axiosInstance({
        url: '/admin/company/addedit',
        method: 'post',
        data: data
    });
}