<template>
  <el-menu default-active="/admin/articleList"
    :collapse="isCollapse"
    router
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    mode="vertical"
    collapse-transition
    :default-active="curIndex"
    style="height:100%;">

    <!-- <el-submenu index="/admin">
      <template slot="title">
        <i class="el-icon-document-copy"></i>
        <span slot="title">文章管理</span>
      </template>
      <el-menu-item-group title="分组一">
        <el-menu-item index="/admin/articleList">文章列表</el-menu-item>
        <el-menu-item index="/admin/articleEdit">编辑文章</el-menu-item>
      </el-menu-item-group>
    </el-submenu> -->

    <el-menu-item index="/admin/articleList">
      <i class="el-icon-s-comment"></i>
      <span slot="title">文章列表</span>
    </el-menu-item>

    <el-menu-item index="/admin/commentList">
      <i class="el-icon-s-comment"></i>
      <span slot="title">评论列表</span>
    </el-menu-item>

    <el-menu-item index="/admin/userList">
      <i class="el-icon-user-solid"></i>
      <span slot="title">用户列表</span>
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
  },
  data() {
    return {
      curIndex: this.$route.path
    }
  }
}
</script>

<style>
</style>
