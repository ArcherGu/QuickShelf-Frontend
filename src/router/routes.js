const routes = [
    {
        path: '/login',
        meta: { 
            auth: false,
            menu: false,
        },
        component: () => import('pages/login/index.vue')
    }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
    routes.push({
        path: '*',
        meta: { menu: false },
        component: () => import('pages/error/404.vue')
    })
}

export default routes
