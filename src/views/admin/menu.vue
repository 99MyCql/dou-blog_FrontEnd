<template>
  <el-menu default-active="/admin/articleTable"
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
    <el-menu-item index="/admin/form">
      <i class="el-icon-menu"></i>
      <span slot="title">Form</span>
    </el-menu-item>
    <el-menu-item index="/admin/table">
      <i class="el-icon-document"></i>
      <span slot="title">Table</span>
    </el-menu-item>
    <el-menu-item index="/admin">
      <i class="el-icon-setting"></i>
      <span slot="title">用户信息</span>
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
