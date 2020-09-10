<template>
  <scroll class="mine-wrap">
    <div class="scroll-wrap">
      <!-- 用户 -->
      <div class="user">
        <div class="user-header"></div>

        <div class="info-wrap">
          <div class="user-name">聊所谓</div>
          <div class="vip-wrap">
            <div class="vip">vip开通</div>
            <div class="grade">Lv.8</div>
          </div>
        </div>

        <span class="iconfont icon-jiantouyou"></span>
      </div>

      <!-- 应用面板 -->
      <applicationsPane></applicationsPane>

      <!-- 喜欢歌单 -->
      <div class="love_music">
        <img src="/img/love_music.jpg" alt />

        <div class="love_wrap">
          <div class="list_name">我喜欢的音乐</div>
          <div class="list_info">
            <div>
              236首,
              <span></span>已下载
              <span>1</span>首
            </div>
          </div>
        </div>
      </div>

      <!-- 用户歌单 -->
      <collectionPane></collectionPane>
      <collectionPane></collectionPane>
      <collectionPane></collectionPane>
    </div>
  </scroll>
</template>

<script>
import components from "../components/index";


export default {
  components: {
    [components.applicationsPane.name]: components.applicationsPane,
    [components.collectionPane.name]: components.collectionPane,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.mine-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.scroll-wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

/* 用户 */
.user {
  width: 100%;
  margin-top: 1.22rem;
  overflow: hidden;
  position: relative;
}
.user-header {
  margin-left: 0.72rem;
  float: left;
  background-size: cover;
  background-image: url(../assets/24.jpg);
  background-repeat: no-repeat;
  background-position: center;
  width: 1.38rem;
  height: 1.38rem;
  border-radius: 50%;
}

.info-wrap {
  height: 1.38rem;
  float: left;
  margin-left: 0.44rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.user-name {
  font-size: 0.42rem;
  font-weight: bold;
}
.vip-wrap {
  font-size: 0.22rem;
  height: 0.44rem;
}

.vip {
  padding: 0.1rem 0.12rem;
  float: left;
  background-color: #b9b8b6;
  border-radius: 0.26rem;
}
.grade {
  padding: 0.1rem 0.12rem;
  margin-left: 0.1rem;
  float: left;
  background-color: #fafafa;
  border-radius: 0.22rem;
}
.icon-jiantouyou {
  position: absolute;
  font-size: 0.34rem;
  top: 50%;
  right: 0.62rem;
  transform: translate(0, -50%);
}

/* 应用面板 */
.applicationsPane {
  margin-top: 0.52rem;
}

/* 爱好歌单 */
.love_music {
  margin-top: 0.52rem;
  width: 9.9rem;
  box-sizing: border-box;
  padding: 0.44rem;
  background-color: lightseagreen;
  border-radius: 0.24rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.love_music img {
  width: 1.38rem;
  border-radius: 0.16rem;
}

.love_wrap {
  margin-left: 0.3rem;
}

.love_wrap .list_name {
  font-size: 0.38rem;
  font-weight: bold;
}
.love_wrap .list_info {
  margin-top: 0.18rem;
  font-size: 0.28rem;
}
.collectionPane {
  margin-top: 0.52rem;
}
</style>