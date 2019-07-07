import { isArrayOrString } from "@/utils";
import setRoutes from "@/router/utils";

export default ({ router, store, Vue }) => {
    router.beforeEach((to, from, next) => {
        if (to.meta.auth !== false) {
            if (!store.getters['auth/loggedIn']) {
                next({
                    path: '/login',
                    query: {
                        redirect: to.path
                    }
                });
            }
            else if (!store.getters['auth/gotRouters']) {
                store.dispatch('auth/getUserRouters').then(() => {
                    setRoutes({ store, router });
                    next({ ...to, replace: true });
                }).catch((error) => {
                    store.dispatch('auth/logout').then(() => {
                        next();
                    })
                });
            }
            else {
                next();
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
