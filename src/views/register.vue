<template>
  <div class="container">
    <div class="register-wrapper">
      <div class="register-title">
        <b>Register Form</b>
      </div>
      <!-- title -->

      <el-form ref="registerForm"
              :model="registerForm"
              label-position="left"
              label-width="80px"
              size="medium"
              class="register-form"
              :rules="rules">

        <el-form-item label="用户名" prop="username" required>
          <el-input v-model="registerForm.username"
                    clearable
                    autofocus
                    placeholder="username"
                    prefix-icon="el-icon-user">
          </el-input>
        </el-form-item>
        <!-- username -->

        <el-form-item label="密码" prop="passwd" required>
          <el-input v-model="registerForm.passwd"
                    show-password
                    placeholder="password"
                    prefix-icon="el-icon-lock">
          </el-input>
        </el-form-item>
        <!-- passwd -->

        <el-form-item label="确认密码" prop="checkPasswd" required>
          <el-input v-model="registerForm.checkPasswd"
                    show-password
                    placeholder="password"
                    prefix-icon="el-icon-lock">
          </el-input>
        </el-form-item>
        <!-- checkPasswd -->

        <el-form-item label-width="0" style="text-align:center">
          <el-button type="primary" @click="register_submit" class="register-button" round>注册</el-button>
          <el-button style="margin-left:0" @click="toLogin" class="register-button" round>返回</el-button>
        </el-form-item>
        <!-- button -->

      </el-form>
    </div>
  </div>
</template>

<script>
import { user_register } from '@/api/user.js';

export default {
  data() {
    return {
      registerForm: {
        username: '',
        passwd: '',
        checkPasswd: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        passwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        checkPasswd: [
          { validator: this.validatePasswd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    validatePasswd(rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.passwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    },
    toLogin() {
      this.$router.push('/login');
    },
    register_submit() {
      this.$refs['registerForm'].validate((valid) => {
        if (valid) {
          user_register(this.registerForm.username, this.registerForm.passwd)
          .then(resp => {
            console.log(resp);
            this.$router.push('/login');
            this.$message.success('注册成功');
          })
          .catch(error => {
            console.log(error);
          });
        }
        else {
          this.$message.error('信息验证错误');
        }
      });
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
  .register-wrapper {
    border: 1px solid #000;
    border-radius: 20px;
    margin: 200px auto;
    padding: 40px 60px 20px 60px;
    width: 500px;
    height: 400px;
  }

  .register-title {
    font-size: 30px;
    text-align: center;
    color: black;
    margin-bottom: 30px;
  }

  .register-button {
    margin-top: 20px;
    width: 80%;
  }
}

@media (max-width: 980px) {
  .register-wrapper {
    border: 1px solid #000;
    border-radius: 20px;
    margin: 150px auto;
    padding: 30px 30px;
    width: 250px;
    height: 400px;
  }

  .register-title {
    font-size: 30px;
    text-align: center;
    color: black;
    margin-bottom: 30px;
  }

  .register-button {
    margin-top: 20px;
    width: 80%;
  }
}
</style>
