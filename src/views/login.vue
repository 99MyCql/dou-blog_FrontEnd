<template>
  <div class="container">
    <div class="login-wrapper">
      <div class="login-title">
        <b>Login Form</b>
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

    <div class="footer">
      <a href="http://www.beian.miit.gov.cn" target="_blank">粤ICP备19098325号-1</a>
    </div>
  </div>
</template>

<script>
import { user_login } from '@/api/user.js';
import {SUCCESS_CODE, ERROR_CODE, FAIL_CODE} from '@/api/setting.js';
import store from '@/store/store';

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
      // 账号密码不能为空
      if (this.login_form.username != '' && this.login_form.password != '') {
        user_login(this.login_form.username, this.login_form.password)
        // 请求成功
        .then((resp) => {
          store.setIsLoginAction(true);                       // 设置登录状态为true
          store.setUserNameAction(this.login_form.username);  // 保存用户名
          this.$router.push('/home');                         // 跳转至主页面
        })
        .catch(error => {
          console.log(error);
        });
      }
      // 账号密码为空
      else {
        this.$message({
          showClose: true,
          message: '账号密码不能为空',
          type: 'warning'
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

.footer {
  position: fixed;
  bottom: 10px;
  width: 100%;
  font-size: 10px;
  text-align: center;
}

@media (min-width: 980px) {
  .login-wrapper {
    border: 1px solid #000;
    border-radius: 10px;
    margin: 160px auto 0 auto;
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
    margin: 100px auto 0 auto;
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
