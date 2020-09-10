<template>
  <div class="collectionPane">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "collectionPane",
  data() {
    return {};
  },
};
</script>

<style scoped>
.collectionPane {
  box-sizing: border-box;
  width: 9.9rem;
  padding: 0.5rem 0.44rem;
  background-color: bisque;
  height: 20rem;
  border-radius: 0.24rem;
}
</style>