import { axiosInstance } from 'boot/axios';

export function addOrEditRouter (data) {
    return axiosInstance({
        url: '/admin/router/add',
        method: 'post',
        data: {
            id: data.id,
            path: data.path,
            name: data.name,
            component: data.component,
            icon: data.icon,
            level: data.level,
            belong_to: data.belongTo,
            role: data.role,
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