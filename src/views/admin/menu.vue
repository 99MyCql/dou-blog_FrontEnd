<template>
  <el-menu default-active="1-1"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    mode="vertical"
    :collapse-transition="true"
    style="height:100%">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-document-copy"></i>
        <span slot="title">文章</span>
      </template>
      <el-menu-item-group title="分组一">
        <el-menu-item index="1-1" @click="handleRouter('/admin/articleTable')">文章管理</el-menu-item>
        <el-menu-item index="1-2" @click="handleRouter('/admin')">编辑文章</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="2" @click="handleRouter('/admin/form')">
      <i class="el-icon-menu"></i>
      <span slot="title">Form</span>
    </el-menu-item>
    <el-menu-item index="3" @click="handleRouter('/admin/table')">
      <i class="el-icon-document"></i>
      <span slot="title">Table</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
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
