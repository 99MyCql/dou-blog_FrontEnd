<template>
  <div class="container">
    <div class="login-wrapper">
      <div class="login-title">
        <b>Lgoin Form</b>
      </div>
      <!-- login title -->

      <el-form ref="form" :model="login_data" size="medium" class="login-form">
        <el-form-item>
          <el-input v-model="login_data.username" 
                    clearable 
                    autofocus
                    placeholder="username"
                    prefix-icon="el-icon-user">
          </el-input>
        </el-form-item>
        <!-- username -->

        <el-form-item>
          <el-input v-model="login_data.password"
                    show-password
                    placeholder="password"
                    prefix-icon="el-icon-lock">
          </el-input>
        </el-form-item>
        <!-- passwd -->

        <el-form-item>
          <el-button type="primary" @click="login_submit" class="login-button" round>登录</el-button>
          <el-button style="margin-left:0" @click="register" class="login-button" round>注册</el-button>
        </el-form-item>
        <!-- button -->

      </el-form>
    </div>
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
      register() {
        this.$router.push('/register');
      },
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
.container {
  background-image: url('../assets/background.png');
  position: absolute;
  height: 100%;
  width: 100%;
}

@media (min-width: 980px) {
  .login-wrapper {
    border: 1px solid #000;
    border-radius: 10px;
    margin: 200px auto;
    padding: 30px 80px;
    width: 350px;
    height: 300px;
  }

  .login-title {
    font-size: 30px;
    text-align: center;
    color: black;
    margin-bottom: 30px;
  }

  .login-button {
    margin-top: 10px;
    width: 100%;
  }
}

@media (max-width: 767px) {
  .login-wrapper {
    border: 1px solid #000;
    border-radius: 10px;
    margin: 150px auto;
    padding: 30px 30px;
    width: 230px;
    height: 300px;
  }

  .login-title {
    font-size: 30px;
    text-align: center;
    color: black;
    margin-bottom: 30px;
  }

  .login-button {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
