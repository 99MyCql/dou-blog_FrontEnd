<template>
  <el-row class="header">
    <el-col :xs="10" :sm="8" class="brand">
      <div class="logo">
        <img src="../assets/logo.png" alt="">
      </div>
      <div class="project-name">My Blog</div>
    </el-col>
  </el-row>
</template>

<style>
@media (max-width: 767px) {
  .brand {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    padding-left: 20px;
    padding-top: 10px;
  }

  .logo {
    display: inline-block;
    height: 35px;
    width: 35px;
  }

  .logo img {
    color: white;
    height: 100%;
    width: 100%;
  }

  .project-name {
    padding-top: 2px;
    margin-left: 10px;
    display: inline-block;
    font-size: 25px;
    color:white;
  }
}

@media (min-width: 980px) {
  .brand {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    padding-left: 30px;
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

  .project-name {
    padding-top: 2px;
    margin-left: 20px;
    display: inline-block;
    font-size: 30px;
    color:white;
  }
}

.header {
  height: 100%;
  overflow: hidden;
  position: relative;
  background: #304156;
  box-shadow: 0 0 10px 10px rgba(0,21,41,.08);
  z-index: 9999;
}


</style>
