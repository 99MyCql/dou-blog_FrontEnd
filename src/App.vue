<template>
  <div id="app">
    <transition>
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: "Arial","Microsoft YaHei","??","??",sans-serif;
}
a {
  text-decoration: none;
}
</style>
