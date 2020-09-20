<template>
  <div class="songItem" @click="setSong">
    <div class="num">{{songIdAndIndex.index}}</div>
    <div class="content">
      <div class="title">
        {{title}}
        <span class="alia" v-if="isShow">&nbsp;&nbsp;({{alias}})</span>
      </div>
      <div class="singer">
        <span class="iconfont icon-sq"></span>
        <span>{{singer}}</span>
      </div>
    </div>
    <div class="wrap">
      <span class="iconfont icon-bofang"></span>
      <span class="iconfont icon-gengduo"></span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "songItem",
  props: {
    songIdAndIndex: {},
  },
  data() {
    return {
      title: "", //歌曲名称
      songId: "", //歌曲id
      alias: "", //别名
      singer: "", //歌手
    };
  },
  computed: {
    isShow() {
      if (this.alias) {
        return true;
      } else {
        return false;
      }
    },
    ...mapState({
      songInfo: (state) => state.songInfo.songInfo,
    }),
  },
  mounted() {
    this.getData();
  },
  methods: {
    setSong() {
      this.$store.commit("playSongAbout/setSongAbout", this.songIdAndIndex);
      this.$store.commit("playSongAbout/setShow", true);
      this.$store.commit("playSongAbout/setPlay", true);//控制歌曲能够播放
    },
    ...mapActions({
      getSongInfo: "songInfo/getSongInfo",
    }),
    getData() {
      this.getSongInfo(this.songIdAndIndex.songId).then((val) => {
        (this.title = val.data.songs[0].name), //歌曲名称
          (this.songId = val.data.songs[0].id), //歌曲id
          (this.alias = val.data.songs[0].alia[0]), //别名
          (this.singer = val.data.songs[0].ar[0].name); //歌手
      });
    },
  },
  watch: {
    songIdAndIndex: {
      handler(newValue, oldValue) {
        if (newValue == oldValue || !newValue) {
          return;
        }
        this.getData();
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style scoped>
.songItem {
  width: 100%;
  height: 0.96rem;
  margin-top: 0.66rem;
  display: flex;
  align-items: center;
}
.num {
  width: 6.4%;
  font-size: 0.32rem;
  text-align: center;
  color: #999;
}

.content {
  width: 74.4%;
  background-color: transparent;
  margin-left: 0.36rem;
}
.content .title {
  font-size: 0.34rem;
  color: #333333;
}
.content .alia {
  color: #9b9b9b;
}

.content .singer {
  margin-top: 0.2rem;
  font-size: 0.26rem;
  color: #999;
}

.singer .icon-sq {
  font-size: 0.3rem;
  margin-right: 0.12rem;
  color: #fe672e;
}
.songItem .wrap {
  width: 19.4%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.wrap .icon-bofang {
  display: block;
  width: 1.42rem;
  font-size: 0.6rem;
  line-height: 0.4rem;
  text-align: center;
  color: #999;
}
.wrap .icon-gengduo {
  font-size: 0.42rem;
  color: #999;
}
</style>