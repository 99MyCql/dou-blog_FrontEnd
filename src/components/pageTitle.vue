<template>
  <div>
    <el-page-header @back="goBack" :content="title">
    </el-page-header>
    <el-divider></el-divider>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      required: false,
      type: String
    }
  },
  data() {
    return {}
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>

<style>
</style>
