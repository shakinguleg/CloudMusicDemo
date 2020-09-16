<template>
  <div class="song">
    <div class="mask" :style="{'background-image':`url(${picUrl})`}">
      <div class="mask_photo"></div>
    </div>
    <div class="song_header">
      <span class="iconfont icon-xiangxiajiantou" @click="back"></span>
      <div class="song_title">
        <div class="song_name">{{name}}</div>
        <div class="singer">{{singer}}&nbsp;&gt;</div>
      </div>
      <span class="iconfont icon-fenxiang"></span>
    </div>
    <div class="pic" ref="pic" :style="{'background-image':`url(${picUrl})`}"></div>

    <div class="bottom_wrap">
      <div class="about">
        <span class="collec iconfont icon-aixin"></span>
        <span class="iconfont icon-xiazai"></span>
        <div class="text_wrap">
          <span class="text">唱</span>
        </div>
        <span class="iconfont icon-pinglun"></span>
        <span class="iconfont icon-gengduo1"></span>
      </div>

      <div class="play_wrap">
        <span class="nowTime">{{currentTime}}</span>
        <audio
          @timeupdate="setCurrentTime"
          @canplay="initPlay"
          controls
          :src="songUrl"
          class="play"
          ref="play"
        ></audio>
        <span class="allTime">{{duration}}</span>
      </div>

      <div class="control_wrap">
        <span class="iconfont icon-liebiaoshunxubofang"></span>
        <span class="iconfont icon-shangyishou" @click="prev"></span>
        <span class="iconfont icon-shipin large" @click="playSing"></span>
        <span class="iconfont icon-shangyishou rotate" @click="next"></span>
        <span class="iconfont icon-ttpodicon1"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      songId: -1,
      name: "", // 歌名
      singer: "", //歌手
      picUrl: "", //背景图url
      duration: "00:00", //歌曲时长
      currentTime: "00:00",
      playDom: "",
      play: false,
      trackIds: [],
    };
  },
  mounted() {},
  methods: {
    ...mapActions({
      getSongInfo: "songInfo/getSongInfo",
      getSongUrl: "songInfo/getSongUrl",
    }),
    getData() {
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

        this.name = name;
        this.singer = singer;
        this.picUrl = picUrl;
      });
      this.getSongUrl(this.songId);
    },
    back() {
      this.$router.back();
    },
    setCurrentTime() {
      var curr = parseInt(this.$refs.play.currentTime);
      var second = curr % 60;
      second = second > 9 ? second : "0" + second;

      var min = Math.floor(curr / 60);
      min = min > 9 ? min : "0" + min;

      this.currentTime = min + ":" + second;
    },
    initPlay() {
      var duration = parseInt(this.$refs.play.duration);
      var second = duration % 60;
      second = second > 9 ? second : "0" + second;

      var min = Math.floor(duration / 60);
      min = min > 9 ? min : "0" + min;

      this.duration = min + ":" + second;
    },
    playSing() {
      this.play = !this.play;
      this.play ? this.$refs.play.play() : this.$refs.play.pause();
      this.$refs.pic.style.animationPlayState = this.play
        ? "running"
        : "paused";
    },
    next() {
      if (this.trackIds.length >= 1) {
        const currentIndex = this.trackIds.findIndex((item) => {
          return item == this.songId;
        });
        this.songId = this.trackIds[(currentIndex + 1) % this.trackIds.length];
      }
    },
    prev() {
      if (this.trackIds.length >= 1) {
        const currentIndex = this.trackIds.findIndex((item) => {
          return item == this.songId;
        });
        this.songId = this.trackIds[
          currentIndex == 0 ? this.trackIds.length - 1 : currentIndex - 1
        ];
      }
    },
  },
  computed: {
    ...mapState({
      songInfo: (state) => state.songInfo.songInfo,
      songUrl: (state) => state.songInfo.songUrl, //歌曲url
    }),
  },
  watch: {
    "$route.params.songId": {
      handler(newVal, oldVal) {
        if (!newVal) {
          return;
        }
        this.songId = this.$route.params.songId;

        this.getData();
      },
      immediate: true,
      deep: true,
    },
    songId: {
      handler() {
        this.getData();
      },
    },
    "this.$route.query.trackIds": {
      handler() {
        this.trackIds = this.$route.query.trackIds;
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style scoped>
.song {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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

.mask_photo {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}

.song_header {
  height: 1.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 92.6%;
}

.song_title {
  width: 68.8%;
}

.song_name {
  font-size: 0.46rem;
  color: #ffffff;
}

.singer {
  font-size: 0.24rem;
  color: #9d9d9d;
}

.iconfont {
  font-size: 0.48rem;
}

.icon-xiangxiajiantou {
  transform: rotate(90deg);
}

/* 图片 */
.pic {
  width: 6.1rem;
  height: 6.1rem;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center center;
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

.play {
  height: 0.2rem;
  width: 7.9rem;
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
}

@keyframes rotatePic {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>