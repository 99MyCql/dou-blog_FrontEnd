import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter); // 使用该插件

const router = new VueRouter ({
    routes: [
        {
            path: '/',
            redirect: '/admin'
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/login')
        },
        {
            path: '/admin',
            name: 'Admin',
            component: () => import('@/views/admin/admin'),
            children: [{
                    path: 'table',
                    name: 'Table',
                    component: () => import('@/views/admin/table')
                }, {
                    path: 'form',
                    component: () => import('@/views/admin/form')
                }, {
                    path: 'articleTable',
                    component: () => import('@/views/admin/articleTable')
                }, {
                    path: 'articleEdit',
                    component: () => import('@/views/admin/articleEdit')
                }
            ]
        }
    ]
});

export default router;