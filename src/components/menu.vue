<template>
  <div>
    <el-menu default-active="1-1" @open="handleOpen" @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="height: 850px;">
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
  </div>
</template>

<script>
export default {
  props: {
    handleRouter: {
      type: Function,
      required: true
    }
  }
}
</script>
