const _import = require('./_import_' + process.env.NODE_ENV);

/**
 * 
 * Traversing the routing string from the background and converting it to a component object
 * 
 */
export function filterAsyncRouter(asyncRouterMap) {
    const accessedRouters = asyncRouterMap.filter(route => {
        if (route.component) {
            route.component = _import(route.component);
        }
        if (route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children)
        }
        return true
    })

    return accessedRouters
}

export default ({ store, router }) => {
    let rawData = JSON.parse(JSON.stringify(store.getters['auth/myRouters']));
    let routersData = filterAsyncRouter(rawData);
    router.addRoutes(routersData);
    router.options.routes = store.getters['auth/myRouters'];
}
