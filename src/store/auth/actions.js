import { axiosInstance } from 'boot/axios';
import { LocalStorage, SessionStorage } from 'quasar';

//Backend API Route
const REGISTER_ROUTE = '/auth/register';
const LOGIN_ROUTE = '/auth/login';
const USER_ROUTE = '/auth/user';
const PASSWORD_FORGOT_ROUTE = '/auth/password/forgot';
const PASSWORD_RECOVER_ROUTE = '/auth/password/recover';
const TOKEN_KEY = 'QuickShelf-Token';

export function register (state, data) {
    return axiosInstance.post(REGISTER_ROUTE, data);
}

export function login (state, data) {
    return axiosInstance.post(LOGIN_ROUTE, data).then((response) => {
        const token = response.data.result.token;
        state.commit('setUser', response.data.result.user);
        axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        if (data.rememberMe) {
            LocalStorage.set(TOKEN_KEY, token);
        } else {
            SessionStorage.set(TOKEN_KEY, token);
        }
    });
}

export function fetch (state) {
    let token;
    if (LocalStorage.has(TOKEN_KEY)) {
        token = LocalStorage.getItem(TOKEN_KEY);
    } else if (SessionStorage.has(TOKEN_KEY)) {
        token = SessionStorage.getItem(TOKEN_KEY);
    }
    if (token) {
        console.log("token")
        axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        return axiosInstance.get(USER_ROUTE).then((response) => {
            state.commit('setUser', response.data.result.user);
        })
    }
}

export function logout (state) {
    if (LocalStorage.has(TOKEN_KEY)) {
        LocalStorage.remove(TOKEN_KEY);
    } else if (SessionStorage.has(TOKEN_KEY)) {
        SessionStorage.remove(TOKEN_KEY);
    }
    state.commit('setUser', null)
}

export function verify (state, token) {
    return axiosInstance.get('/auth/verify/' + token);
}
export function passwordForgot (state, data) {
    return axiosInstance.post(PASSWORD_FORGOT_ROUTE, data);
}

export function passwordRecover (state, { token, data }) {
    return axiosInstance.post(PASSWORD_RECOVER_ROUTE + '/' + token, data);
}
