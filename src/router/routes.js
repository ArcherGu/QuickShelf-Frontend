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
