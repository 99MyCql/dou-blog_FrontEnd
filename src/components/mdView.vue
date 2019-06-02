<template>
  <div v-highlight v-html="content" class="mdView"></div>
</template>

<script>

export default {
  props: {
    content: {
      required: true,
      type: String
    }
  }
}
</script>

<style>
.mdView {
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  font-family: 'Microsoft Yahei', "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: 16px;
  line-height: 2;
  color: #555;
}

code {
  font-family: 'Consolas';
}

h1 {
  font-size: 30px;
}

h2 {
  font-size: 25px;
}
</style>
