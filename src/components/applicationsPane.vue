<template>
  <div class="applicationsPane">
    <applicationButton v-for="i in applications" :key="i.title">
      <template #logo>
        <div :class="`iconfont ${i.icon} button` "></div>
      </template>
      <template #text>
        <div class="text">{{i.title}}</div>
      </template>
    </applicationButton>
  </div>
</template>

<script>
import applicationButton from "./applicationButton";

export default {
  components: {
    [applicationButton.name]: applicationButton,
  },
  name: "applicationsPane",
  computed: {},
  methods: {},
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
};
</script>

<style scoped>
.applicationsPane {
  width: 9.9rem;
  box-sizing: border-box;
  padding: 0.66rem 0.72rem 0;
  background-color: #fff;
  border-radius: 0.24rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
</style>