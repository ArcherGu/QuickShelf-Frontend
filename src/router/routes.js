const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('pages/Login')
    },
    {
        path: '/',
        component: () => import('layouts/MyLayout.vue'),
        children: [
            {
                path: '',
                meta: { auth: true },
                name: 'dashboard',
                component: () => import('pages/Index.vue')
            },
            {
                path: '/account',
                meta: { auth: true },
                name: 'account',
                component: () => import('pages/Account')
            },
        ]
    },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
    routes.push({
        path: '*',
        component: () => import('pages/Error404.vue')
    })
}

export default routes
