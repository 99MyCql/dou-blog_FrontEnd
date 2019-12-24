<template>
  <div class="header">
    <div class="brand">
      <div class="logo">
        <img src="../assets/logo.png" alt="">
      </div>
      <!-- logo -->

      <router-link to="/home">
        <div class="project-name">Dou-Blog</div>
      </router-link>
      <!-- name -->
    </div>
    <!-- brand -->

    <div style="z-index:999">
      <el-dropdown trigger="click">
        <a class="avatar">
          <img src="../assets/avatar.png" style="display:inline-block">
          <i class="el-icon-caret-bottom el-icon--right" style="color:white"></i>
        </a>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <a @click="handleRouter('/home')"><i class="el-icon-s-home"></i>首页</a>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <a @click="handleRouter('/admin')"><i class="el-icon-s-grid"></i>后台管理</a>
          </el-dropdown-item>
          <el-dropdown-item>
            <a @click="handleRouter('/userInfo')"><i class="el-icon-setting"></i>个人信息</a>
          </el-dropdown-item>
          <el-dropdown-item>
            <a href="https://github.com/99MyCql/dou-blog_BackEnd/issues" target="_blank"><i class="el-icon-question"></i>反馈</a>
          </el-dropdown-item>
          <el-dropdown-item>
            <a @click="logout()"><i class="el-icon-switch-button"></i>退出登录</a>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import store from '@/store/store';
import {resetRouter} from '@/router/router';

export default {
  methods: {
    logout() {
      store.clearStateAction(); // 清除全局缓存
      resetRouter();            // 重置路由
      this.$router.push('/');   // 跳转至 login 页面
    },
    handleRouter(router) {
      if (router == '/admin' && store.state.user.role != 'admin') {
        this.$message.warning('莫得权限');
        return;
      }
      this.$router.push(router);
    }
  }
}
</script>


<style>
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
  overflow: hidden;
  background: #304156;
  box-shadow: 0 0 10px 10px rgba(0,21,41,.08);
  z-index: 99;
}

@media (min-width: 980px) {
  .brand {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    padding-left: 30px;
    padding-top: 10px;
  }

  .logo {
    display: inline-block;
    height: 40px;
    width: 40px;
  }

  .logo img {
    color: white;
    height: 100%;
    width: 100%;
  }

  .project-name {
    padding-top: 2px;
    margin-left: 20px;
    display: inline-block;
    font-size: 30px;
    color:white;
  }

  .avatar {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 35px;
    margin: 12px 10px;
    width: 70px;
  }

  .avatar img {
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 50%;
  }
}

@media (max-width: 980px) {
  .brand {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    padding-left: 20px;
    padding-top: 10px;
  }

  .logo {
    display: inline-block;
    height: 35px;
    width: 35px;
  }

  .logo img {
    color: white;
    height: 100%;
    width: 100%;
  }

  .project-name {
    padding-top: 2px;
    margin-left: 10px;
    display: inline-block;
    font-size: 25px;
    color:white;
  }

  .avatar {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 30px;
    margin: 15px 0;
    width: 60px;
  }

  .avatar img {
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 50%;
  }
}
</style>
