<template>
  <el-row class="header">
    <el-col :span="8" class="brand">
      <div class="logo">
        <img src="../assets/logo.png" alt="">
      </div>
      <div class="title">My Blog</div>
    </el-col>
  </el-row>
</template>

<style>
.header {
  height: 100%;
  overflow: hidden;
  position: relative;
  background: #304156;
  box-shadow: 0 0 10px 10px rgba(0,21,41,.08);
  z-index: 9999;
}

.brand {
  display: flex;
  flex-direction: row;
  padding-left: 50px;
  padding-top: 10px;
}

.logo {
  display: inline-block;
  height: 40px;
  width: 40px;
}

.logo img {
  color: white;
  height: 100%;
  width: 100%;
}

.title {
  padding-top: 2px;
  margin-left: 20px;
  display: inline-block;
  font-size: 30px;
  color:white;
}
</style>
