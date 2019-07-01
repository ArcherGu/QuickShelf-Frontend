import { axiosInstance } from 'boot/axios';

export function addOrEditRouter (data) {
    return axiosInstance({
        url: '/admin/router/addedit',
        method: 'post',
        data: {
            id: data.id,
            path: data.path,
            name: data.name,
            redirect: data.redirect,
            component: data.component,
            title: data.title,
            icon: data.icon,
            sort: data.sort,
            belong_to: data.belongTo,
            roleNames: data.roleNames,
            is_lock: data.isLock,
            is_menu: data.isMenu,
            is_use: data.isUse
        }
    });
}

export function getAllRouters () {
    return axiosInstance({
        url: '/admin/router/all',
        method: 'get'
    });
}