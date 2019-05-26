<template>
  <div>
    <el-container>
      <el-header style="padding:0;">
        <head-er></head-er>
      </el-header>

      <el-container style="max-height:850px">
        <el-aside style="background-color: #545c64;">
          <aside-menu :handleRouter='handleRouter'></aside-menu>
        </el-aside>

        <el-main>
          <router-view/>
        </el-main>

      </el-container>
    </el-container>
  </div>
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
</style>
