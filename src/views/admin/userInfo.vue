<template>
  <div class="userInfo-wrapper" v-loading="loading">
    <page-title title="个人信息"/>
    <el-form ref="userForm" :model="user">
      <el-form-item label="用户名">
        <el-input v-model="user.name" />
      </el-form-item>

      <!-- <el-form-item label="Activity zone">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item> -->

      <el-form-item label="生日">
        <el-date-picker v-model="user.birthday" type="date" placeholder="Pick a birthday" style="width: 100%;" />
      </el-form-item>

      <!-- <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery" />
      </el-form-item> -->

      <!-- <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type" />
          <el-checkbox label="Promotion activities" name="type" />
          <el-checkbox label="Offline activities" name="type" />
          <el-checkbox label="Simple brand exposure" name="type" />
        </el-checkbox-group>
      </el-form-item> -->

      <el-form-item label="性别">
        <el-radio-group v-model="user.gender">
          <el-radio label="男" />
          <el-radio label="女" />
        </el-radio-group>
      </el-form-item>
      
      <el-form-item label="个性签名">
        <el-input v-model="user.personalBrief" type="textarea" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import pageTitle from '@/components/pageTitle';
import { user_findByName } from '@/api/user';
import store from '@/store/store';

export default {
  components: {
    pageTitle
  },
  data() {
    return {
      loading: false,
      user: {}
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  },
  created() {
    this.loading = true;
    user_findByName(store.state.user.userName)
    .then(resp => {
      let data = resp.data;
      console.log(data);
      // 找寻失败
      if (data.code == 0) {
        this.$message({
          showClose: true,
          message: data.msg,
          type: 'error'
        });
      }
      // 找寻成功
      else {
        this.user = JSON.parse(data.msg);
      }
    })
    // 请求响应异常
    .catch(error => {
      this.$message({
        showClose: true,
        type: 'error',
        message: '出现了一个网络请求错误'
      });
      console.log(error);
    });
    this.loading = false;
  }
}
</script>

<style scoped>
.userInfo-wrapper {
  margin: 0 auto;
  width: 1000px;
}
</style>

