<template>
  <div class="collectionDetail">
    <PublicHeader></PublicHeader>
    <div class="song-about">
      <div :style="{'background-image':`url(${path})`}" class="song-img"></div>
      <div class="right">
        <span>REOL</span>
        <div class="wrap">
          <img src alt />
          <span>聊所谓</span>
        </div>
        <span>编辑信息</span>
      </div>
    </div>
  </div>
</template>

<script>
import components from "../components";

export default {
  data() {
    return {
      path: "http://p1.music.126.net/J77Y_qLnIbU6v9OhUhjPsQ==/109951165214662246.jpg",
    };
  },
  components: {
    [components.header.name]: components.header,
  },
};
</script>

<style scoped>
.collectionDetail {
  width: 100%;
  height: 100%;
  background-color: aqua;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.song-about {
  width: 92.2%;
}

.song-img {
  width: 3.28rem;
  height: 3.48rem;
  background-size: cover;
}
</style>