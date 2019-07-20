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
    helper.loggedIn = () => {
        return store.getters['auth/loggedIn']
    }
    helper.login = (data) => {
        return store.dispatch('auth/login', data)
    }
    helper.logout = () => {
        return store.dispatch('auth/logout')
    }
    helper.fetch = () => {
        return store.dispatch('auth/fetch')
    }
    helper.user = () => {
        return store.getters['auth/user']
    }
    Vue.prototype.$auth = helper
}
