<template>
  <scroll class="verti">
    <div id="find">
      <div class="swiper-container" ref="swiper_container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in banners" :key="index">
            <div class="banner_wrap">
              <div
                :style="{'background-image':`url(${item.pic})`}"
                class="banner"
                @click="toSong(item)"
              ></div>
            </div>
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination" ref="swiper_pagination"></div>
      </div>

      <scrollHorizontal class="hori">
        <div class="botton_wrap">
          <applicationButton v-for="i in applications" :key="i.title" class="hori_button">
            <template #logo>
              <div :class="`iconfont ${i.icon} button` "></div>
            </template>
            <template #text>
              <div class="text">{{i.title}}</div>
            </template>
          </applicationButton>
        </div>
      </scrollHorizontal>

      <!-- 推荐歌单 -->
      <div class="recommond">
        <div class="title">宝藏歌单,值得聆听</div>

        <scrollHorizontal class="hori_coll">
          <div class="coll_wrap">
            <div class="coll" v-for="(item,index) in 10" :key="index">
              <div class="coll_img">img</div>
              <span class="coll_title">title</span>
            </div>
          </div>
        </scrollHorizontal>
      </div>
    </div>
  </scroll>
</template>

<script>
import http from "../api/http";
import { BANNER_URL } from "../api/url";
import components from "../components/index";

export default {
  data() {
    return {
      banners: [],
      applications: [
        {
          icon: "icon-xiangxiajiantou",
          title: "本地音乐",
        },
        {
          icon: "icon-xiangshangjiantou",
          title: "云盘",
        },
        {
          icon: "icon-anonymous-iconfont",
          title: "已购",
        },
        {
          icon: "icon-bofang-copy",
          title: "最近播放",
        },
        {
          icon: "icon-ttpodicon",
          title: "我的关注",
        },
        {
          icon: "icon-shoucang",
          title: "收藏和赞",
        },
        {
          icon: "icon-wodediantai",
          title: "我的电台",
        },
        {
          icon: "icon-addTodo-nav",
          title: "音乐应用",
        },
      ],
    };
  },
  components: {
    [components.applicationButton.name]: components.applicationButton,
  },
  mounted() {
    this.initSwiper();
  },
  created() {
    //加载轮播图数据
    this.getSwiper();
  },
  methods: {
    async getSwiper() {
      const {
        data: { banners },
      } = await http.get(BANNER_URL, { type: 1 });
      this.banners = banners;
    },
    initSwiper() {
      this.swiper = new Swiper(this.$refs.swiper_container, {
        loop: true, // 循环模式选项
        direction: "horizontal", // 垂直切换选项
        autoplay: { disableOnInteraction: false }, //可选选项，自动滑动
        // 如果需要分页器
        pagination: {
          el: this.$refs.swiper_pagination,
        },
      });
    },
    toSong(item) {
      if (item.song) {
        this.$router.push({
          name: "Song",
          params: { songId: item.targetId != null ? item.targetId : null },
          query: { trackIds: [] },
        });
      }
    },
  },
  watch: {
    banners() {
      this.$nextTick(() => this.swiper.update());
    },
  },
};
</script>

<style scoped>
.verti {
  width: 100%;
  height: 100%;
}

#find {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.swiper-container {
  width: 100%;
}

.banner_wrap {
  width: 100%;
  display: flex;
  justify-content: center;
}

.banner {
  width: 9.9rem;
  height: 3.74rem;
  background-size: cover;
  border-radius: 0.16rem;
  /* box-shadow: 0 0.15rem 0.3rem rgba(0, 0, 0, 0.3); */
}

/* 应用按钮 */
.hori {
  margin-top: 0.42rem;
  height: 1.72rem;
  width: 9.9rem;
  background-color: transparent;
  margin-bottom: 0.78rem;
}

.botton_wrap {
  display: flex;
  height: 1.72rem;
  justify-content: flex-start;
  width: max-content;
  align-items: center;
}

.hori_button {
  width: 1.4rem;
  margin-bottom: 0;
  margin-right: 0.45rem;
}

/* 推荐歌单 */

.recommond {
  height: 4.92rem;
  width: 9.9rem;
}
.recommond .title {
  font-size: 0.44rem;
  font-weight: bold;
  color: #333;
}

/* 歌单滑动 */
.hori_coll {
  width: 9.9rem;
  height: 3.98rem;
}

.coll_wrap {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: max-content;
}

.coll_wrap .coll {
  text-align: center;
  margin-right: 0.3rem;
}

.coll .coll_img {
  width: 3rem;
  height: 3rem;
  border-radius: 0.1rem;
}

.coll .coll_title {
  font-size: 0.3rem;
  margin-top: 0.12rem;
}
</style>

<style>
.swiper-pagination-bullet {
  width: 0.18rem;
  height: 0.18rem;
  background-color: #706e5a;
}
.swiper-pagination-bullet-active {
  background-color: #d83a35;
}
</style>