import { axiosInstance } from 'boot/axios';
import { LocalStorage, SessionStorage } from 'quasar';
import { doRegister, doLogin, getUser} from '@/api/auth';

const TOKEN_KEY = 'QuickShelf-Token';

export function register (state, data) {
    return doRegister(data);
}

export function login (state, data) {
    return doLogin(data).then((response) => {
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
        axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        return getUser().then((response) => {
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

export function passwordRecover (state, { token, data }) {
    return axiosInstance.post(PASSWORD_RECOVER_ROUTE + '/' + token, data);
}
