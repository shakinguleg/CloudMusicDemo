<template>
  <div class="collectionDetail">
    <div
      class="mask"
      :style="{'background-image':`url(${getbackgroundCoverUrl})`,'background-size':'600%', 'background-position':'top 1.3rem'}"
    >
      <div class="photo"></div>
    </div>
    <PublicHeader></PublicHeader>
    <scroll class="scroll">
      <div class="content_wrap">
        <!-- 歌单相关 -->
        <div class="song-about">
          <div :style="{'background-image':`url(${coverImgUrl})`}" class="song-img"></div>
          <div class="right">
            <span class="name">{{name}}</span>
            <div class="wrap">
              <div class="user-img" :style="{'background-image':`url(${avatarUrl})`}"></div>
              <span class="nickname">{{nickname}}&nbsp;&gt;</span>
            </div>
            <span class="text">编辑信息&nbsp;&gt;</span>
          </div>
        </div>

        <!-- 操作 -->
        <div class="option">
          <div class="wrap">
            <span class="iconfont icon-pinglun"></span>
            <span class="text">评论</span>
          </div>
          <div class="wrap">
            <span class="iconfont icon-fenxiang"></span>
            <span class="text">分享</span>
          </div>
          <div class="wrap">
            <span class="iconfont icon-xiazai"></span>
            <span class="text">下载</span>
          </div>
          <div class="wrap">
            <span class="iconfont icon-huaban"></span>
            <span class="text">多选</span>
          </div>
        </div>
      </div>
      <!-- 歌曲列表 -->
      <songList :length="trackIds.length">
        <template>
          <songItem
            v-for="(item,index) in trackIds"
            :key="item"
            :songIdAndIndex="{songId:item,index:index+1, trackIds:trackIds}"
          ></songItem>
        </template>
      </songList>
    </scroll>
  </div>
</template>
 
<script>
import components from "../components";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      backgroundCoverUrl: "", //蒙板
      coverImgUrl: "", //歌单图
      name: "", //歌单名称

      nickname: "", //创建者
      avatarUrl: "", //创建者头像

      trackIds: [], //所有歌曲id
      songsInfo: [],
    };
  },
  components: {
    [components.header.name]: components.header,
    [components.songList.name]: components.songList,
    [components.songItem.name]: components.songItem,
  },
  methods: {
    ...mapActions({
      // 仓库获取该id歌单数据
      getSongs: "collection/getSongs",
      // 获取歌曲信息
    }),
    update() {
      // http://localhost:3000/playlist/detail?id=2409342460
      this.getSongs(this.$route.params.collectionId);
    },
  },
  created() {
    // 当刷新界面时更新数据
    this.update();
  },
  mounted() {},
  computed: {
    ...mapState({
      playInfo: (state) => state.collection.playlist,
    }),
    getbackgroundCoverUrl() {
      return this.backgroundCoverUrl == null
        ? this.coverImgUrl
        : this.backgroundCoverUrl;
    },
    // getTrackIds() {
    //   this.trackIds = this.trackIds.map((item) => {
    //     return item.id;
    //   });
    // },
  },
  watch: {
    playInfo: {
      handler(newValue, oldValue) {
        const {
          creator: { nickname, avatarUrl },
          coverImgUrl,
          backgroundCoverUrl,
          trackIds,
          name,
        } = newValue;
        this.nickname = nickname;
        this.avatarUrl = avatarUrl;
        this.coverImgUrl = coverImgUrl;
        this.backgroundCoverUrl = backgroundCoverUrl;
        this.trackIds = trackIds.map((item) => {
          return item.id;
        });

        // this.trackIds = trackIds;
        this.name = name;
        // 加载歌曲数据
        // this.getSongsInfo();
      },
    },
    songInfo: {
      handler(newValue, oldValue) {
        const {
          data: {
            songs: [
              {
                name,
                id,
                alia: [...alias],
                ar: [{ name: author }],
              },
            ],
          },
        } = newValue;

        this.songsInfo.push({
          title: name, //歌曲名称
          id, //歌曲id
          alias, //别名
          singer: author, //歌手
        });
      },
    },
    // 当进入该界面时加载数据
    "$route.params.collectionId": {
      handler(newValue, oldValue) {
        if (!newValue) {
          return;
        }
        this.update();
      },
    },
  },
};
</script>

<style scoped>
.scroll {
  width: 100%;
  top: 1.3rem;
  bottom: 1.33rem;
  position: absolute;
}

.collectionDetail {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mask {
  top: 0;
  height: 10rem;
  width: 100%;
  z-index: -1;
  position: absolute;
  filter: blur(10px);
  overflow: hidden;
  padding-bottom: 0.1rem;
}

.mask .photo {
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0, 0, 0, 0.3);
  filter: none;
}

.content_wrap {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  filter: none;
}

.header {
  margin-top: 0.44rem;
}

.song-about {
  margin-top: 0.9rem;
  width: 92.2%;
  display: flex;
  justify-content: flex-start;
}

.song-img {
  width: 3.28rem;
  height: 3.48rem;
  background-size: cover;
  border-radius: 0.1rem;
}

.right {
  height: 100%;
  margin-left: 0.48rem;
}

.right .name {
  font-size: 0.38rem;
  font-weight: bold;
  padding-top: 0.16rem;
  color: #ffffff;
}
.right .wrap {
  display: flex;
  align-items: center;
  margin-top: 0.3rem;
  overflow: hidden;
  margin-bottom: 1.06rem;
}
.wrap .user-img {
  width: 0.7rem;
  height: 0.7rem;
  background-size: cover;
  border-radius: 50%;
}

.wrap .nickname {
  margin-left: 0.24rem;
  color: #ebebeb;
  font-size: 0.34rem;
}

.right .text {
  color: #d5d5d4;
  font-size: 0.28rem;
}

/* 操作 */
.option {
  padding-top: 0.66rem;
  padding-bottom: 0.38rem;
  width: 92.2%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.option .wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fafafa;
}

.option .iconfont {
  font-size: 0.54rem;
}

.option .text {
  margin-top: 0.1rem;
  font-size: 0.32rem;
}
</style>