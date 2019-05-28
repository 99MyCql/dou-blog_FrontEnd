<template>
  <div class="login-container">
    <div class="title">
      <b>Lgoin Form</b>
    </div>
    <el-form ref="form" :model="login_data" size="medium" class="login-form">
      <el-form-item>
        <el-input v-model="login_data.username" :clearable='true' :autofocus='true'>
          <template slot="prepend">用户名</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="login_data.password" :clearable='true' >
          <template slot="prepend" style="width:10%">密码</template>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="login_submit" class="button">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        login_data: {
          username: 'dounine',
          password: '123456'
        }
      }
    },
    methods: {
      login_submit() {
        if (this.login_data.username == 'dounine' && this.login_data.password == '123456')
          this.$router.push('/admin');
        else 
          this.$message.error('账号密码错误');
      }
    }
  }
</script>

<style>
.login-container {
  background-image: url('../assets/background.png');
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-form {
  top: 30%;
  position: relative;
  width: 20%;
  padding: 20px 30px;
  border-radius: 20px;
}

.title {
  position: relative;
  top: 300px;
  font-size: 30px;
  text-align: center;
  margin-bottom: 30px;
  color: black;
}

.input_img {
  padding-top: 3px;
  height: 80%;
}

.button {
  margin-top: 10px;
  width: 100%;
}

.el-input-group__prepend {
  width: 40px;
}
</style>
