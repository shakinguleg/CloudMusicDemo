<template>
  <div class="root">
    <Table></Table>
    <div class="page">
      <router-view></router-view>
    </div>
    <PublicBottom></PublicBottom>
  </div>
</template>

<script>
import Vue from "vue";
import components from "../components/index";

// import mine from "./views/mine";

export default {
  components: {
    [components.table.name]: components.table,
    [components.bottom.name]: components.bottom,
  },
};
</script>

<style scoped>
.root {
  touch-action: none;
  height: 100%;
  width: 100%;
  position: relative;
  background-color: #f8f8f8;
}

.page {
  position: absolute;
  background-color: transparent;
  top: 1.46rem;
  bottom: 1.33rem;
  left: 0;
  right: 0;
}
</style>