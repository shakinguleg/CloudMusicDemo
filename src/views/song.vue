<template>
  <div class="song_wrap" :style="{'pointer-events':isShow==true?'auto':'none'}">
    <!-- :style="{'pointer-events':isShow==true?'auto':'none'}" -->
    <transition
      name="pullUp"
      @enter="handleEnter"
      @after-enter="handleAfterEnter"
      @leave="handleLeave"
    >
      <!-- 播放歌曲界面 -->
      <div class="song" v-show="isShow">
        <!-- 背景图蒙板 -->
        <div class="mask" :style="{'background-image':`url(${picUrl})`}">
          <div class="mask_photo"></div>
        </div>

        <div class="content_wrap">
          <!-- 导航栏头部 -->
          <div class="song_header">
            <span class="iconfont icon-xiangxiajiantou" @click="back"></span>
            <div class="song_title">
              <div class="song_name">{{name}}</div>
              <div class="singer">{{singer}}&nbsp;&gt;</div>
            </div>
            <span class="iconfont icon-fenxiang"></span>
          </div>

          <!-- 中间旋转图片部分 -->
          <div class="play_center_wrap" @click="switchLyric">
            <transition name="pullUP">
              <img
                class="pic"
                ref="pic"
                :style="{'background-image':`url(${picUrl})`, 'animation-play-state':isPlay==false?'paused':'running'}"
                v-show="!show_lyrics"
              />
            </transition>

            <!-- 歌词滚动区 -->
            <lyricsScroll
              class="lyrics"
              v-show="show_lyrics"
              :position="currentHeight"
              ref="lyrics"
            >
              <ul>
                <li
                  v-for="(item,index) in lyrics"
                  :key="index"
                  :class="{'light':index==currentIndex}"
                  ref="li"
                >
                  <span>{{item[1]?item[1]:'~~~~~~'}}</span>
                </li>
              </ul>
            </lyricsScroll>
          </div>

          <div class="bottom_wrap">
            <!-- 歌曲相关 -->
            <div class="about">
              <span class="collec iconfont icon-aixin"></span>
              <span class="iconfont icon-xiazai"></span>
              <div class="text_wrap">
                <span class="text">唱</span>
              </div>
              <span class="iconfont icon-pinglun"></span>
              <span class="iconfont icon-gengduo1"></span>
            </div>

            <!-- 歌曲控制条 -->
            <div class="play_wrap">
              <span class="nowTime">{{currentTime}}</span>
              <!-- 自定义的进度条 -->
              <myProgress :setProgress="setProgress" :getProgress="progress"></myProgress>
              <audio
                v-show="false"
                @timeupdate="setCurrentTime"
                @canplay="initPlay"
                controls
                :src="songUrl"
                class="play"
                ref="play"
              ></audio>
              <span class="allTime">{{duration}}</span>
            </div>

            <!-- 播放歌曲控制栏 -->
            <div class="control_wrap">
              <span class="iconfont icon-liebiaoshunxubofang"></span>
              <span class="iconfont icon-shangyishou" @click="prev"></span>
              <span
                class="iconfont large"
                :class="isPlay?'icon-zantingbofang':'icon-shipin'"
                @click="controlPlay"
              ></span>
              <span class="iconfont icon-shangyishou rotate" @click="next"></span>
              <span class="iconfont icon-ttpodicon1"></span>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 全局底部播放栏 -->
    <div class="bottom-wrap" :style="{'pointer-events':'auto'}">
      <img
        :style="{'background-image':`url(${picUrl})`, 'animation-play-state':isPlay==false?'paused':'running'}"
        class="song_url"
        @click="setShow"
        ref="song_url"
      />
      <div class="bottom_center" @click="setShow ">
        <span>{{name}}</span>
        <span>{{singer}}</span>
      </div>
      <div class="bottom_play" ref="bottom_play" @click="controlPlay">
        <div class="iconfont" :class="isPlay?'icon-zantingtingzhi':'icon-bofang2'"></div>
        <canvas class="cvs" ref="cvs"></canvas>
      </div>
      <div class="iconfont icon-ttpodicon1"></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import animations from "create-keyframe-animation";
import myProgress from "../components/progress";
import lyricsScroll from "../components/lyricsScroll";

// canvas的width和height不能在vue中动态获取
window.onresize = function () {
  initCanvas();
};

// 设置canvas的width和height, 并绘制背景圆环
function initCanvas() {
  let cvs = document.documentElement.querySelector(".cvs");
  cvs.height = cvs.width = document.documentElement.clientWidth * 0.06481;
  const ctx = cvs.getContext("2d");
  let x = cvs.width / 2;
  ctx.beginPath();
  ctx.arc(x, x, x - 3, 0, Math.PI * 2);
  ctx.arc(x, x, x - 1, 0, Math.PI * 2);
  ctx.fillStyle = "#4d4d4d";
  ctx.fill("evenodd");
}

export default {
  components: {
    myProgress,
    lyricsScroll,
  },
  mixins: {
    initCanvas,
  },
  data() {
    return {
      name: "", // 歌名
      singer: "", //歌手
      picUrl: "", //背景图url
      duration: "00:00", //歌曲时长
      currentTime: "00:00",
      playDom: "",
      progress: 0,
      show_lyrics: true,
      currentIndex: 0,
      currentHeight: 0,
    };
  },
  mounted() {
    initCanvas();
    this.paint(this.progress);
  },
  methods: {
    //切换图片与歌词的转化
    switchLyric() {
      this.show_lyrics = !this.show_lyrics;
    },
    // 控制条百分比的回传
    setProgress(val) {
      this.progress = val;
    },
    // 绘制圆形进度条
    paint(progress) {
      this.cvs = this.$refs.cvs;
      const ctx = this.cvs.getContext("2d");
      let x = this.cvs.width / 2;
      ctx.clearRect(0, 0, this.cvs.width, this.cvs.width);

      // 背景圆环
      ctx.beginPath();
      ctx.arc(x, x, x - 3, 0, Math.PI * 2);
      ctx.arc(x, x, x - 1, 0, Math.PI * 2);
      ctx.fillStyle = "#4d4d4d";
      ctx.fill("evenodd");

      // 进度条
      ctx.beginPath();
      ctx.arc(x, x, x - 3, 0, Math.PI * 2);
      ctx.arc(x, x, x - 1, 0, Math.PI * 2);
      ctx.fillStyle = "#4d4d4d";
      ctx.fill("evenodd");

      ctx.beginPath();
      ctx.moveTo(x, x);
      ctx.arc(
        x,
        x,
        x - 3,
        (Math.PI / 180) * -90,
        (Math.PI / 180) * (-90 + progress * 360)
      );
      ctx.lineTo(x, x);
      ctx.moveTo(x, x);
      ctx.arc(
        x,
        x,
        x - 1,
        (Math.PI / 180) * -90,
        (Math.PI / 180) * (-90 + progress * 360)
      );
      ctx.lineTo(x, x);
      ctx.fillStyle = "#ff3a3a";
      ctx.fill("evenodd");
    },

    // 计算到body的距离
    offset(dom, bool) {
      if (!dom) {
        return;
      }
      var l = 0,
        t = 0;
      var bdleft = dom.clientLeft; //初始元素的左边框
      var bdtop = dom.clientTop; //初始元素的上边框
      while (dom) {
        l = l + dom.offsetLeft + dom.clientLeft;
        t = t + dom.offsetTop + dom.clientTop;
        dom = dom.offsetParent;
      }
      if (bool) {
        // 元素边框外侧到body的距离
        return { left: l - bdleft, top: t - bdtop };
      } else {
        // 元素内容外侧到body的距离
        return { left: l, top: t };
      }
    },

    // 当播放详情页面进入时的显示动画
    handleEnter(el, done) {
      // 小图片到左边和顶部的距离
      var S_pic_top = this.offset(this.$refs.song_url, true).top;
      var S_pic_left = this.offset(this.$refs.song_url, true).left;
      var S_pic_width = this.$refs.song_url.clientWidth;

      // 大图片到左边和顶部的距离
      var L_pic_top = this.offset(this.$refs.pic, true).top;
      var L_pic_left = this.offset(this.$refs.pic, true).left;
      var L_pic_width = this.$refs.pic.clientWidth;
      var scale = S_pic_width / L_pic_width;

      // 默认以原点为圆心进行变换
      var offsetX =
        S_pic_left + S_pic_width / 2 - (L_pic_left + L_pic_width / 2);

      var offsetY = S_pic_top + S_pic_width / 2 - L_pic_top - L_pic_width / 2;
      const animate = {
        0: {
          transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
        },
        100: {
          transform: "translate(0, 0) scale(1)",
        },
      };
      animations.registerAnimation({
        name: "animate",
        animation: animate,
        presets: {
          duration: 300,
        },
      });
      animations.runAnimation(this.$refs.pic, "animate", done);
    },

    // 将注册的动画清空
    handleAfterEnter() {
      animations.unregisterAnimation("animate");
      this.$refs.pic.style.animation = "";
    },

    handleLeave() {},
    // 控制展示
    setShow() {
      this.$store.commit("playSongAbout/setShow", !this.isShow);
    },
    ...mapActions({
      getSongInfo: "songInfo/getSongInfo",
      getSongUrl: "songInfo/getSongUrl",
    }),

    getData() {
      // 获取歌曲信息
      this.getSongInfo(this.songId).then((val) => {
        const {
          data: {
            songs: [
              {
                name,
                ar: [{ name: singer }],
                al: { picUrl },
              },
            ],
          },
        } = val;
        // 请求获取歌词
        this.$store.dispatch("playSongAbout/getLyrics", { id: this.songId });

        this.name = name;
        this.singer = singer;
        this.picUrl = picUrl;
      });

      // 获取歌曲
      this.getSongUrl(this.songId);
    },
    back() {
      // this.$router.back();
      this.setShow();
    },
    //播放时更新当前时间和歌词
    setCurrentTime() {
      if (!this.$refs.play.currentTime) {
        return;
      }
      var curr = parseInt(this.$refs.play.currentTime);
      var second = curr % 60;
      second = second > 9 ? second : "0" + second;

      var min = Math.floor(curr / 60);
      min = min > 9 ? min : "0" + min;

      this.currentTime = min + ":" + second;
      if (!this.currentTime || !this.lyrics || this.lyrics == "没有歌词") {
        return;
      }
      // if(!this.lyric||this.lyrics)
      this.progress = parseFloat(
        (this.$refs.play.currentTime / this.$refs.play.duration).toFixed(3)
      );
      // 计算所在时间的item索引
      var curr = this.$refs.play.currentTime;
      this.currentIndex =
        this.lyrics.findIndex((item) => {
          var timeArr = item[0].split(":");
          var time = parseFloat(timeArr[0] * 60) + parseFloat(timeArr[1]);
          return time > curr;
        }) - 1;

      if (
        !this.$refs.li[this.currentIndex].innerText ||
        this.$refs.li[this.currentIndex].innerText == ""
      ) {
        this.currentIndex += 1;
      }

      if (this.currentIndex == -2) {
        this.currentIndex = this.lyrics.length - 1;
      }
    },
    //初始化歌曲播放时长
    initPlay() {
      var duration = parseInt(this.$refs.play.duration);
      var second = duration % 60;
      second = second > 9 ? second : "0" + second;

      var min = Math.floor(duration / 60);
      min = min > 9 ? min : "0" + min;
      this.duration = min + ":" + second;
      this.playSong();
    },

    // 控制歌曲的播放
    controlPlay() {
      this.$store.commit("playSongAbout/setPlay", !this.isPlay);
    },
    //播放歌曲
    playSong() {
      if (!this.songUrl) {
        return;
      }
      this.isPlay ? this.$refs.play.play() : this.$refs.play.pause();
      this.$refs.pic.style.animationPlayState = this.isPlay
        ? "running"
        : "paused";
    },
    // 下一曲
    next() {
      if (this.trackIds.length >= 1) {
        const currentIndex = this.trackIds.findIndex((item) => {
          return item == this.songId;
        });
        var songId = this.trackIds[(currentIndex + 1) % this.trackIds.length];
        this.$store.commit("playSongAbout/setSongId", songId);
        this.$store.commit("playSongAbout/setPlay", true);
        this.playSong();
      }
    },
    //上一曲
    prev() {
      if (this.trackIds.length >= 1) {
        const currentIndex = this.trackIds.findIndex((item) => {
          return item == this.songId;
        });
        var songId = this.trackIds[
          currentIndex == 0 ? this.trackIds.length - 1 : currentIndex - 1
        ];
        this.$store.commit("playSongAbout/setSongId", songId);
        this.$store.commit("playSongAbout/setPlay", true);
        this.playSong();
      }
    },
  },
  computed: {
    ...mapState({
      songInfo: (state) => state.songInfo.songInfo,
      songUrl: (state) => state.songInfo.songUrl, //歌曲url
      songId: (state) => state.playSongAbout.songId, //歌曲id
      trackIds: (state) => state.playSongAbout.trackIds, //歌单里所有歌曲id
      isShow: (state) => state.playSongAbout.isShow, //歌单里所有歌曲id
      isPlay: (state) => state.playSongAbout.isPlay, //歌单里所有歌曲id
      lyrics: (state) => state.playSongAbout.lyrics, //歌词
    }),
  },
  watch: {
    songId: {
      handler(newValu) {
        this.$store.commit("songInfo/setSongUrl", "");
        this.getData();
      },
    },
    progress: {
      handler(newVal, oldVal) {
        this.paint(this.progress);
        // 更新当前播放时间
        if (
          parseFloat(
            (this.$refs.play.currentTime / this.$refs.play.duration).toFixed(3)
          ) != this.progress
        ) {
          this.$refs.play.currentTime =
            this.$refs.play.duration * this.progress;
        }
      },
    },
    isPlay: {
      handler() {
        this.playSong();
      },
    },
    currentIndex: {
      handler() {
        // 当前歌词高度
        var center = this.$refs.lyrics.$el.clientHeight / 2;
        this.currentHeight =
          this.$refs.li[this.currentIndex].offsetTop - center;
      },
    },
  },
};
</script>

<style scoped>
.song_wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1000;
  top: 0;
  left: 0;
}

.song {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1001;
  background-color: rgb(48, 48, 48);
}

.mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(0.8rem);
  z-index: -1;
  overflow: hidden;
}

.content_wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(48, 48, 48, 0.6);
}

.song_header {
  height: 1.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: white;
}

.song_title {
  flex: 1;
}

.song_name {
  font-size: 0.46rem;
  color: #ffffff;
}

.singer {
  font-size: 0.24rem;
  color: #9d9d9d;
}

.song_header .iconfont {
  font-size: 0.48rem;
  padding: 0.2rem 0.4rem;
}

.icon-xiangxiajiantou {
  transform: rotate(90deg);
}

/* 图片 */

.play_center_wrap {
  position: absolute;
  left: 0;
  right: 0;
  top: 1.3rem;
  bottom: 4.06rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.8rem 0;
}

.play_center_wrap .lyrics {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 99;
}

.lyrics .light {
  color: #c7c7c7;
}

.lyrics ul {
  text-decoration: none;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lyrics ul li {
  padding-top: 0.7rem;
  font-size: 0.38rem;
  color: #939393;
  text-align: center;
}

.pic {
  width: 6.1rem;
  height: 6.1rem;
  border-radius: 50%;
  margin: auto;
  background-size: cover;
  animation: rotatePic 10s infinite linear;
}

.bottom_wrap {
  height: 4.06rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

/* 相关 */
.about {
  bottom: 3.4rem;
  width: 7.9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bottom_wrap .iconfont {
  font-size: 0.62rem;
  color: #cbcbcb;
}

.icon-aixin::before {
  color: #fc5243;
}

.text_wrap {
  height: 0.5rem;
  width: 0.5rem;
  border-radius: 50%;
  border: 0.03rem solid #dededc;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text {
  font-size: 0.32rem;
  color: #dededc;
}

.play_wrap {
  width: 9.7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.play_wrap span {
  width: 0.62rem;
  font-size: 0.2rem;
  color: #dededc;
  text-align: center;
}

/* 进度条样式 */
.play_wrap .progress {
  height: 0.04rem;
  width: 7.9rem;
  border-radius: 0.02rem;
}

/* 控制部分 */
.control_wrap {
  height: 1.4rem;
  width: 7.9rem;
  margin-bottom: 0.56rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.control_wrap .iconfont {
  font-size: 0.5rem;
}
.control_wrap .iconfont.rotate {
  transform: rotate(180deg);
}

.control_wrap .iconfont.large {
  font-size: 1.4rem;
  color: #ffffff;
}

/* 底部控制 */

.bottom-wrap {
  width: 100%;
  height: 1.32rem;
  border-top: 1px solid #e6e6e6;
  background-color: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.bottom-wrap .song_url {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  animation: rotatePic 10s infinite linear;
}

.song_url {
  background-size: cover;
}

.bottom_center {
  width: 7.2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
}

.bottom_center span:nth-of-type(1) {
  font-size: 0.34rem;
  color: #333;
}
.bottom_center span:nth-of-type(2) {
  font-size: 0.26rem;
  color: #808080;
}

.bottom_play {
  position: relative;
  width: 0.54rem;
  height: 0.54rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bottom_play .iconfont {
}

.bottom_play .icon-bofang2 {
  font-size: 0.4rem;
  margin-top: 0.02rem;
  margin-left: 0.06rem;
}

.bottom_play .icon-zantingtingzhi {
  font-size: 0.4rem;
}
.bottom_play .cvs {
  position: absolute;
}

.bottom-wrap .icon-ttpodicon1 {
  font-size: 0.54rem;
}

@keyframes rotatePic {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes pullUP {
  0% {
    transform: translateY(10%);
  }
  100% {
    transform: translateY(0);
  }
}

.pullUp-enter-active {
  animation: pullUP 300ms;
}
.pullUp-leave-active {
  animation: pullUP 300ms cubic-bezier(0.2, 0.51, 0.15, 1.11) reverse;
}
</style>
