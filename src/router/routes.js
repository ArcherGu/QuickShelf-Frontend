const routes = [
    {
        path: '/login',
        name: 'login',
        meta: { 
            auth: false,
            is_menu: false,
        },
        component: () => import('pages/Login')
    },
    {
        path: '',
        redirect: '/home',
        meta: { 
            auth: true,
            is_menu: true,
        },
        component: () => import('layouts/MyLayout'),
        children: [
            {
                path: 'home',
                name: 'home',
                meta: { 
                    auth: true,
                    is_menu: true,
                    title: 'home',
                    icon: 'home'
                },
                component: () => import('pages/Index')
            },
        ]
    },
    {
        path: '/shop',
        name: 'shop',
        redirect: '/shop',
        meta: { 
            auth: true,
            is_menu: true,
            title: 'shop',
            icon: 'store'
        },
        component: () => import('layouts/MyLayout'),
        children:[
            {
                path: 'order',
                name: 'order',
                meta: { 
                    auth: true,
                    is_menu: true,
                    title: 'order',
                    icon: 'shopping_cart'
                },
                component: {
                    render(c){ return c('h1', "Order")}
                }
            },
            {
                path: 'inventory',
                name: 'inventory',
                meta: { 
                    auth: true,
                    is_menu: true,
                    title: 'inventory',
                    icon: 'list_alt'
                },
                component: {
                    render(c){ return c('h1', "Inventory")}
                }
            }
        ]
    },
    {
        path: '/statistics',
        name: 'statistics',
        redirect: '/statistics/income',
        meta: { 
            auth: true,
            is_menu: true,
            title: 'statistics',
            icon: 'insert_chart_outlined'
        },
        component: () => import('layouts/MyLayout'),
        children:[
            {
                path: 'income',
                name: 'income',
                meta: { 
                    auth: true,
                    is_menu: true,
                    title: 'income',
                    icon: 'insert_chart_outlined'
                },
                component: {
                    render(c){ return c('h1', "Income")}
                }
            },
            {
                path: 'reserve',
                name: 'reserve',
                meta: { 
                    auth: true,
                    is_menu: true,
                    title: 'reserve',
                    icon: 'list'
                },
                component: {
                    render(c){ return c('h1', "Reserve")}
                }
            },
            {
                path: 'history',
                name: 'history',
                meta: { 
                    auth: true,
                    is_menu: true,
                    title: 'history',
                    icon: 'history'
                },
                component: {
                    render(c){ return c('h1', "History")}
                }
            },
        ]
    },
    {
        path: '/admin',
        name: 'admin',
        redirect: '/admin/dashboard',
        meta: { 
            auth: true,
            is_menu: true,
            title: 'admin',
            icon: 'verified_user'
        },
        component: () => import('layouts/MyLayout'),
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                meta: { 
                    auth: true,
                    is_menu: true,
                    title: 'dashboard',
                    icon: 'dashboard'
                },
                component: () => import('pages/admin/Index')
            },
            {
                path: 'router',
                name: 'routerManage',
                meta: { 
                    auth: true,
                    is_menu: true,
                    title: 'routerManage',
                    icon: 'transform'
                },
                component: () => import('pages/admin/RouterManage')
            },
        ]
    }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
    routes.push({
        path: '*',
        meta: { is_menu: false },
        component: () => import('pages/Error404.vue')
    })
}

export default routes
