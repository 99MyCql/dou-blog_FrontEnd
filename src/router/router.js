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
            path: '/home',
            name: 'Home',
            component: () => import('@/views/home')
        },
        {
            path: '/article',
            name: 'Article',
            component: () => import('@/views/article')
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
                    path: 'articleList',
                    component: () => import('@/views/admin/articleList')
                }, {
                    path: 'articleEdit',
                    name: 'articleEdit',
                    component: () => import('@/views/admin/articleEdit')
                }, {
                    path: 'userInfo',
                    component: () => import('@/views/admin/userInfo')
                }, {
                    path: 'userList',
                    component: () => import('@/views/admin/userList')
                }
            ]
        }
    ]
});

export default router;