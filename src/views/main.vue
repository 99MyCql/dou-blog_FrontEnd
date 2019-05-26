<template>
  <div>
    <el-container style="max-height: 900px;">
      <el-aside style="width: 201px; background-color: rgb(238, 241, 246); height: 100%">
        <el-menu style="min-height: 900px;" default-active="1-1" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">首页</span>
            </template>
            <el-menu-item-group title="分组1">
              <el-menu-item index="1-1" @click="handleRouter('/main')">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2" @click="handleRouter('/main/form')">
            <i class="el-icon-menu"></i>
            <span slot="title">Form</span>
          </el-menu-item>
          <el-menu-item index="3" @click="handleRouter('/main/table')">
            <i class="el-icon-document"></i>
            <span slot="title">Table</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header>
          header
        </el-header>

        <el-main>
          <router-view/>
        </el-main>

      </el-container>
    </el-container>
    
  </div>
</template>

<script>
  export default {
    name: 'Main',
    data() {
      return {
        isCollapse: false,
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
