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
  }
]

// admin权限可以访问的路径
const adminRoutes = [
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

// 路由实例化
const router = new VueRouter ({
  routes: normalRoutes
});

// 获取本地缓存，防止刷新后store更新
if (window.localStorage.getItem('isLogin')) {
  store.setIsLoginAction(window.localStorage.getItem('isLogin'));
  store.setUserNameAction(window.localStorage.getItem('userName'));
}

// 设置路由跳转前的验证
// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next();
    return;
  }

  // 如果用户已登录
  if (store.state.user.isLogin) {
    // 如果用户还未确定身份
    if (store.state.user.role == '') {
      user_findByName(store.state.user.userName)
      // 请求成功
      .then(resp => {
        let data = resp.data;
        console.log(data);
        // 获取该用户失败
        if (data.code == 0) {
          this.$message({
            showClose: true,
            message: data.msg,
            type: 'error'
          });
          let isLogin = false;
          store.setIsLoginAction(isLogin);
          next('/login');
        }
        // 获取该用户成功
        else {
          let user = JSON.parse(data.msg);
          console.log(user);
          store.setRoleAction(user.role);
          if (user.role == 'admin') {
            console.log('the user is admin');
            router.addRoutes(adminRoutes); // 动态添加admin可访问路由表
          }
          next({ to, replace: true });
        }
      })
      // 请求异常
      .catch(error => {
        console.log(error);
        next('/login');
      })
    }
    // 如果用户已确认过身份
    else {
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