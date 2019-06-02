<template>
  <div class="container">
    <div class="login-wrapper">
      <div class="login-title">
        <b>Lgoin Form</b>
      </div>
      <!-- login title -->

      <el-form ref="login_form" :model="login_form" size="medium" class="login-form" :rules="rules">
        <el-form-item required>
          <el-input v-model="login_form.username" 
                    clearable 
                    autofocus
                    placeholder="username"
                    prefix-icon="el-icon-user">
          </el-input>
        </el-form-item>
        <!-- username -->

        <el-form-item required>
          <el-input v-model="login_form.password"
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
import { user_login } from '@/api/user.js';

export default {
  data() {
    return {
      login_form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        passwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    register() {
      this.$router.push('/register');
    },
    login_submit() {
      if (this.login_form.username != '' && this.login_form.password != '') {
        user_login(this.login_form.username, this.login_form.password)
        .then((resp) => {
          let data = resp.data;
          console.log(data);
          if (data.code == 0) {
            this.$message({
              showClose: true,
              message: data.msg,
              type: 'error'
            });
          }
          else {
            this.$message({
              message: '登录成功',
              type: 'success'
            });
            this.$router.push('/admin');
          }
          })
        .catch(error => {
          this.$message({
            showClose: true,
            message: error,
            type: 'error'
          });
          console.log(error);
        });
      }
      else {
        this.$message({
          showClose: true,
          message: '账号密码不能为空',
          type: 'error'
        })
      }
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
    margin: 180px auto 0 auto;
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

@media (max-width: 980px) {
  .login-wrapper {
    border: 1px solid #000;
    border-radius: 10px;
    margin: 150px auto 0 auto;
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
