<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <song></song>
  </div>
</template>

<script>
import song from "./views/song.vue";

export default {
  components: {
    song,
  },
};
</script>

<style>
</style>