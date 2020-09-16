<template>
  <div class="songList">
    <div class="playAll_wrap">
      <span class="iconfont icon-shipin"></span>
      <span class="playAll">播放全部</span>
      <span class="num">(共{{length}}首)</span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "songList",
  props: {
    length: Number,
  },
};
</script>

<style>
.songList {
  box-sizing: border-box;
  width: 100%;
  padding: 0.4rem 0.38rem;
  background-color: #ffffff;
  border-radius: 0.38rem 0.38rem 0 0/0.4rem 0.4rem 0 0;
  display: flex;
  flex-direction: column;
}
.playAll_wrap {
  display: flex;
  align-items: center;
}

.icon-shipin {
  font-size: 0.58rem;
}

.playAll {
  margin-left: 0.36rem;
  font-size: 0.44rem;
}

.num {
  font-size: 0.36rem;
}
</style>  