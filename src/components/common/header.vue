<template>
  <div class="header_wrap">
    <div class="header">
      <!-- 后退按钮 -->
      <span class="iconfont icon-xiangxiajiantou brrow" @click="$router.back()"></span>

      <p class="name">
        歌单
        <span class="reg">&reg;</span>
      </p>

      <!-- 搜索按钮 -->
      <span class="search iconfont icon-sousuo"></span>
      <!-- 更多 -->
      <span class="iconfont icon-gengduo"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "PublicHeader",
};
</script>

<style scoped>
.header_wrap {
  position: relative;
  width: 100%;
  height: 1.3rem;
  background-color: transparent;
  display: flex;
  justify-content: center;
}

.header {
  width: 90.2%;
  height: 1.3rem;
  font-size: 0.48rem;
  display: flex;
  background-color: transparent;
  justify-content: space-between;
  align-items: center;
  position: relative;
  color: white;
}

.brrow {
  transform: rotate(90deg);
}
.iconfont {
  font-size: 0.48rem;
}
.name,
.search {
  position: absolute;
}

.name {
  left: 1.04rem;
}
.reg {
  font-size: 0.28rem;
  position: absolute;
  top: -0.06rem;
  right: -0.3rem;
}
.search {
  right: 1.1rem;
}
</style>