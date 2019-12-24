import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/store';
import { user_findByName } from '@/api/user';

Vue.use(VueRouter); // 使用该插件

// 普通权限可以访问的路径
const normalRoutes = [
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

// 路由实例化
const router = new VueRouter ({
  routes: normalRoutes
});

// 设置路由跳转前的验证，全局前置守卫
router.beforeEach((to, from, next) => {
  // 如果是访问登录或注册页面，则直接跳转
  if (to.path == '/login' || to.path == '/register') {
    next();
    return;
  }

  // 从本地缓存中获取用户登录状态，防止刷新页面后store更新
  // 如果用户已登录
  if (localStorage.getItem('isLogin')) {
    console.log("user have logined");
    store.setUserNameAction(localStorage.getItem('userName')); // 从本地缓存中获取用户名

    // 如果用户还未确定身份
    if (store.state.user.role == '') {
      user_findByName(store.state.user.userName)
      // 获取用户数据成功
      .then(resp => {
        let user = JSON.parse(resp.data.data); // 从后端返回数据(resp.data)的 data 字段中获取用户信息，需要先解析
        console.log(user);
        store.setRoleAction(user.role);   // 储存用户身份

        // 如果用户身份是管理员
        if (user.role == 'admin') {
          console.log('the user is admin');
          router.addRoutes(adminRoutes); // 动态添加admin可访问路由表
          next(to); // 用next()的话，刷新无效
          console.log('add routers:', adminRoutes);
        }
        // 其它用户直接放行
        else {
          next();
        }
      })
      // 请求异常
      .catch(error => {
        console.log(error);
        store.setIsLoginAction(false);  // 设置登录状态为 false
        next('/home');                 // 跳转到登录页面
      })
    }
    // 如果用户已确认过身份
    else {
      // 放行
      next();
    }
  }
  // 如果用户未登录，直接跳转到登录界面
  else {
    next('/login');
  }
});

// 重置路由
export function resetRouter() {
  const newRouter = new VueRouter({
    routes: normalRoutes
  })
  router.matcher = newRouter.matcher // reset router
  console.log('路由已重置')
}

// 导出路由
export default router;