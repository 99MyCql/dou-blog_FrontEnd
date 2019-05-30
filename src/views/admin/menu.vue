<template>
  <el-menu default-active="/admin"
    :collapse="isCollapse"
    :router="true"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    mode="vertical"
    :collapse-transition="true"
    style="height:100%">
    <el-submenu index="/admin">
      <template slot="title">
        <i class="el-icon-document-copy"></i>
        <span slot="title">文章管理</span>
      </template>
      <el-menu-item-group title="分组一">
        <el-menu-item index="/admin/articleTable">文章列表</el-menu-item>
        <el-menu-item index="/admin/articleEdit">编辑文章</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="/admin/userInfo">
      <i class="el-icon-setting"></i>
      <span slot="title">个人信息</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  props: {
    handleRouter: {
      type: Function,
      required: true
    },
    isCollapse: {
      type: Boolean
    }
  }
}
</script>

<style>
</style>
