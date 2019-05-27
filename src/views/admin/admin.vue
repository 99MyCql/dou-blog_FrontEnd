<template>
  <el-container class="admin-container">
    <el-header style="padding:0;">
      <head-er></head-er>
    </el-header>

    <el-container style="height:100%">
      <el-aside class="aside-menu">
        <aside-menu :handleRouter='handleRouter'></aside-menu>
      </el-aside>

      <el-main style="height:100%">
        <router-view/>
      </el-main>

    </el-container>
  </el-container>
</template>

<script>
import AsideMenu from './menu';
import HeadEr from '@/components/header';

export default {
  name: 'Main',
  components: {
    AsideMenu,
    HeadEr
  },
  data() {
    return {
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

.aside-menu {
  background-color: #545c64;
  height: 100%;
}
</style>
