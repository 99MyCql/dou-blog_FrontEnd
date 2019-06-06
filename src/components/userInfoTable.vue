<template>
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
      <el-input v-model="user.personalBrief" type="textarea" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </el-form-item>
  </el-form>
</template>
