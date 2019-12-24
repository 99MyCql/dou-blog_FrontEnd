<template>
<el-container class="userInfo-container">
  <el-header style="padding:0;">
    <head-er></head-er>
  </el-header>

  <el-main v-loading="loading">
    <div class="userInfo-wrapper">
      <page-title title="个人信息"/>
      <el-form ref="userForm" :model="user" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="user.name" />
        </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="user.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="生日">
          <el-date-picker v-model="user.birthday" placeholder="Pick a birthday" style="width: 100%;" value-format="yyyy-MM-dd"/>
        </el-form-item>

        <el-form-item label="QQ">
          <el-input v-model="user.qq"/>
        </el-form-item>

        <el-form-item label="电话">
          <el-input v-model="user.phone"/>
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input v-model="user.email"/>
        </el-form-item>

        <el-form-item label="个性签名">
          <el-input v-model="user.personalBrief" type="textarea" :rows="3"/>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-main>
</el-container>

</template>

<script>
import pageTitle from '@/components/pageTitle';
import headEr from '@/components/header';
import { user_findByName, user_update } from '@/api/user';
import store from '@/store/store';

export default {
  components: {
    pageTitle,
    headEr
  },
  data() {
    return {
      loading: false,
      user: {},
      rules: {
        user: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      // el-form自带的验证
      this.$refs['userForm'].validate((valid) => {
        // 如果表单验证通过
        if (valid) {
          console.log(this.user);
          user_update(this.user)
          // 成功
          .then(resp => {
            console.log(resp);
            this.$message.success('提交成功');
            this.$router.push('/userInfo');
          })
          // 异常
          .catch(error => {
            console.log(error);
          })
        }
        // 表单验证未通过
        else {
          this.$message.error('验证错误');
        }
      })
    }
  },
  created() {
    this.loading = true;
    user_findByName(store.state.user.userName)
    .then(resp => {
      console.log(resp);
      this.user = JSON.parse(resp.data.data);
      this.loading = false;
    })
    // 异常
    .catch(error => {
      console.log(error);
      user.name = 'error';
      this.loading = false;
    });
  }
}
</script>

<style scoped>
.userInfo-container {
  background-color: #fdf6ec8f;
  position: absolute;
  height: 100%;
  width: 100%
}

@media (min-width: 980px) {
  .userInfo-wrapper {
    width: 1000px;
    margin: 0 auto;
  }
}

@media (max-width: 980px) {
  .userInfo-header {
    text-align: center;
  }
}
</style>