<template>
  <div class="applicationsPane">
    <div v-for="item in group" :key="item" class="row">
      <applicationButton v-for="i in row(item-1)" :key="i.title">
        <template #logo>
          <div :class="`iconfont ${i.icon} button` "></div>
        </template>
        <template #text>
          <div class="text">{{i.title}}</div>
        </template>
      </applicationButton>
    </div>
  </div>
</template>

<script>
import applicationButton from "./applicationButton";

export default {
  components: {
    [applicationButton.name]: applicationButton,
  },
  name: "applicationsPane",
  computed: {
    // 四个一组
    group() {
      return Math.ceil(this.applications.length / 4);
    },
  },
  methods: {
    // 取出四个值
    row(num) {
      console.log("num: ", num);
      var arr = this.applications.slice(num * 4, num * 4 + 4);
      return arr;
    },
  },
  data() {
    return {
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
          icon: "icon-xiangxiajiantou",
          title: "我的关注",
        },
        {
          icon: "icon-xiangshangjiantou",
          title: "收藏和赞",
        },
        {
          icon: "icon-anonymous-iconfont",
          title: "我的电台",
        },
        {
          icon: "icon-bofang-copy",
          title: "音乐应用",
        },
      ],
    };
  },
};
</script>

<style scoped>
.applicationsPane {
  width: 100%;
  box-sizing: border-box;
  padding: 0.66rem;
  background-color: lightseagreen;
}

.row {
  display: flex;
  justify-content: space-around;
}
</style>