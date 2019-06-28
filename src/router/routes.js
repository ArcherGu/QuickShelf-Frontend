const routes = [
    {
        path: '/login',
        name: 'login',
        meta: { 
            auth: false,
            menu: false
        },
        component: () => import('pages/Login')
    },
    {
        path: '/',
        component: () => import('layouts/MyLayout'),
        children: [
            {
                path: '',
                meta: { auth: true },
                name: 'indexHome',
                component: () => import('pages/Index')
            },
            // {
            //     path: 'account',
            //     meta: { auth: true },
            //     name: 'account',
            //     component: () => import('pages/Account')
            // },
            {
                path: 'shop',
                meta: { auth: true },
                name: 'shop',
                component: {
                    render(c){ return c('router-view')}
                },
                children:[
                    {
                        path: 'account',
                        meta: { auth: true },
                        name: 'account',
                        component: {
                            render(c){ return c('h1', "Account")}
                        }
                    }
                ]
            },
        ]
    },
    {
        path: '/admin',
        component: () => import('layouts/MyLayout'),
        children: [
            {
                path: '',
                meta: { auth: true },
                name: 'adminHome',
                component: () => import('pages/admin/Index')
            },
            {
                path: 'router',
                meta: { auth: true },
                name: 'routerManage',
                component: () => import('pages/admin/RouterManage')
            },
        ]
    }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
    routes.push({
        path: '*',
        component: () => import('pages/Error404.vue')
    })
}

export default routes
