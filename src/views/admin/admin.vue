<template>
  <el-container class="admin-container">
    <el-header style="height: 60px;padding: 0px;position: fixed;width: 100%;z-index: 999;">
      <head-er></head-er>
    </el-header>
    <!-- 头部导航栏 -->

    <aside-menu
      style="background-color: rgb(84, 92, 100);height: 100%;position: fixed;z-index: 99;margin-top: 60px;"
      :handleRouter='handleRouter'
      :isCollapse='isFold'>
    </aside-menu>
    <!-- 侧边栏 -->

    <el-main style="height: 100%;margin: 60px 0 0 200px;">
      <!-- <div class="menu-fold" @click="isFold = !isFold">
        <i :class="[ isFold ? 'el-icon-s-unfold' : 'el-icon-s-fold' ]" style="font-size:30px;"></i>
      </div> -->
      <transition>
        <router-view/>
      </transition>
    </el-main>
    <!-- 主页面 -->

  </el-container>
</template>

<script>
import AsideMenu from '@/components/menu';
import HeadEr from '@/components/header';

export default {
  name: 'Main',
  components: {
    AsideMenu,
    HeadEr
  },
  data() {
    return {
      isFold: false,
      router: 'table',
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleRouter(router) {
      this.$router.push(router);
    }
  }
}
</script>

<style>
.admin-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

@media (max-width: 980px) {
  .menu-fold {
    position: relative;
    top: -10px;
    left: -10px;
    height: 20px;
  }
}

@media (min-width: 980px) {
  .menu-fold {
    display: none;
  }
}
</style>
