<template>
  <div class="collectionPane">
    <div class="title">
      <span>{{type}}</span>
      <div class="iconfont icon-addTodo-nav co_add"></div>
      <div class="iconfont icon-gengduo co_opt"></div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "collectionPane",
  data() {
    return {
      type: "创建歌单(10个)",
    };
  },
};
</script>

<style scoped>
.collectionPane {
  box-sizing: border-box;
  width: 9.9rem;
  padding: 0.46rem 0.4rem 0.46rem;
  background-color: #fff;
  border-radius: 0.24rem;
}

.collectionPane .title {
  color: #999;
  position: relative;
  display: flex;
  justify-content: space-between;
  padding-bottom: .2rem;
}
.title span {
  font-size: 0.32rem;
}
.co_add,
.co_opt {
  font-size: 0.4rem;
}

.co_add {
  position: absolute;
  right: 0.7rem;
}
</style>