import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter); // 使用该插件

const router = new VueRouter ({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/login')
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('@/views/register')
        },
        {
            path: '/admin',
            name: 'Admin',
            component: () => import('@/views/admin/admin'),
            children: [{
                    path: 'articleTable',
                    component: () => import('@/views/admin/articleTable')
                }, {
                    path: 'articleEdit',
                    component: () => import('@/views/admin/articleEdit')
                }, {
                    path: 'userInfo',
                    component: () => import('@/views/admin/form')
                }
            ]
        }
    ]
});

export default router;