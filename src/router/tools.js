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

export function routerGo(to, next, router, rawRouters) {
    let routersData = filterAsyncRouter(rawRouters) //过滤路由
    router.addRoutes(routersData) //动态添加路由
    next({
        ...to,
        replace: true
    })
}
