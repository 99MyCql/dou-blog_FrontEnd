<template>
  <div>
    <h1 class="title">{{ title }}</h1>
    <el-divider></el-divider>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      required: true,
      type: String
    }
  },
  data() {
    return {}
  }
}
</script>

<style>
@media (max-width: 767px) {
  .title {
    margin-top: 5px;
    font-size: 20px;
  }
}

@media (min-width: 980px) {
  .title {
    margin-top: 5px;
    font-size: 28px;
  }
}
</style>
