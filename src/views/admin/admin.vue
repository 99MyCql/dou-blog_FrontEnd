<template>
  <el-container class="admin-container">
    <el-header style="padding:0;">
      <head-er></head-er>
    </el-header>

    <el-container style="height:100%">
      <aside-menu 
      :handleRouter='handleRouter'
      :isCollapse='isFold'>
      </aside-menu>

      <el-main style="height:100%">
        <div class="menu-fold" @click="isFold = !isFold">
          <i :class="[ isFold ? 'el-icon-s-unfold' : 'el-icon-s-fold' ]" style="font-size:30px;"></i>
        </div>
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

@media (max-width: 767px) {
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
