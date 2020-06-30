import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/store';

Vue.use(VueRouter); // 使用该插件

// 普通权限可以访问的路径
const normalRoutes = [
  {
    path: '/',
    redirect: '/home'
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
    path: '/userInfo',
    name: 'UserInfo',
    component: () => import('@/views/userInfo')
  }
]

// admin权限可以访问的路径
const adminRoutes = [
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/admin/admin'),
    redirect: '/admin/articleList',
    children: [{
        path: 'articleList',
        component: () => import('@/views/admin/articleList')
      }, {
        path: 'articleEdit',
        name: 'articleEdit',
        component: () => import('@/views/admin/articleEdit')
      }, {
        path: 'commentList',
        component: () => import('@/views/admin/commentList')
      }, {
        path: 'userList',
        component: () => import('@/views/admin/userList')
      }
    ]
  }
]

// 开放访问路径，不需要登录
const openPaths = [
  '/',
  '/home',
  '/article',
  '/login',
  '/register',
]

// 路由实例化
const router = new VueRouter ({
  routes: normalRoutes
});

// 设置路由跳转前的验证，全局前置守卫
router.beforeEach((to, from, next) => {
  // 先从本地缓存中获取用户信息，防止刷新页面后store更新
  if (store.state.user.userName === '') {
    store.setUserNameAction(sessionStorage.getItem('userName'));  // 从本地缓存中获取用户名
    store.setIsLoginAction(sessionStorage.getItem('isLogin'));    // 设置登录状态为true
    store.setRoleAction(sessionStorage.getItem('role'));          // 储存用户身份
  }

  // 如果是访问开放路径，则直接跳转
  if (openPaths.indexOf(to.path) >= 0) {
    next();
    return;
  }
  // 如果不是公开路径，但用户已经登录
  else if (store.state.user.isLogin) {
    console.log("user have logged");
    // 防止刷新后管理员路径丢失
    if (to.matched.length === 0 && to.path.match('/admin') != null) {
      router.addAdminRoutes();
      next('/');
    } else {
      next(); // 放行
    }
  }
  // 如果用户未登录访问非公开路径，直接跳转到登录界面
  else {
    next('/login');
  }
});

// 自定义方法：添加管理员可访问路径
router.addAdminRoutes = function() {
  console.log('the user is admin');
  router.addRoutes(adminRoutes); // 动态添加admin可访问路由表
  console.log('add routers:', adminRoutes);
}

// 自定义方法：重置路由
router.resetRouter = function() {
  const newRouter = new VueRouter({
    routes: normalRoutes
  })
  router.matcher = newRouter.matcher // reset router
  console.log('路由已重置')
}

// 导出路由
export default router;