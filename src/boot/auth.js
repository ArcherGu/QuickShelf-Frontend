import { isArrayOrString } from "@/utils/tools.js";
import { filterAsyncRouter } from "@/router/utils/tools.js";

export default ({ router, store, Vue }) => {
    router.beforeEach((to, from, next) => {
        if (to.meta.auth != false) {
            if (!store.getters['auth/loggedIn']) {
                router.push({
                    path: '/login',
                    query: {
                        redirect: to.fullPath
                    }
                });
            }
            else {
                if (!store.getters['auth/gotRouters']) {
                    store.dispatch('auth/getUserRouters').then(() => {
                        let rawData = JSON.parse(JSON.stringify(store.getters['auth/myRouters']));
                        let routersData = filterAsyncRouter(rawData);
                        router.addRoutes(routersData);
                        router.options.routes=store.getters['auth/myRouters'];
                        next({ ...to, replace: true });
                    });
                }
                else {
                    next();
                }
            }
        }
        else {
            next();
        }
    })

    var helper = {}
    helper.register = (data) => {
        return store.dispatch('auth/register', data)
    }
    helper.loggedIn = () => {
        return store.getters['auth/loggedIn']
    }
    helper.check = (roles) => {
        return store.getters['auth/check'](roles)
    }
    helper.login = (data) => {
        return store.dispatch('auth/login', data)
    }
    helper.logout = () => {
        return store.dispatch('auth/logout')
    }
    helper.verify = (token) => {
        return store.dispatch('auth/verify', token)
    }
    helper.passwordForgot = (data) => {
        return store.dispatch('auth/passwordForgot', data)
    }
    helper.passwordRecover = (data) => {
        return store.dispatch('auth/passwordRecover', data)
    }
    helper.fetch = () => {
        return store.dispatch('auth/fetch')
    }
    helper.user = () => {
        return store.getters['auth/user']
    }
    Vue.prototype.$auth = helper
}
