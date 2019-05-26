import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter); // 使用该插件

const router = new VueRouter ({
    routes: [
        {
            path: '/',
            redirect: '/main'
        },
        {
            path: '/main',
            name: 'Main',
            component: () => import('@/views/main'),
            children: [{
                    path: 'table',
                    name: 'Table',
                    component: () => import('@/views/table')
                }, {
                    path: 'form',
                    component: () => import('@/views/form')
                }
            ]
        }
    ]
});

export default router;