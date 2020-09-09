<template>
  <div>
    <header>
      <ul>
        <li v-for="item in headerItem" :key="item.title">
          <router-link :to="item.name">{{item.title}}</router-link>
        </li>
      </ul>
      <div class="iconfont icon-caidan">
        <span class="text-wrap">40</span>
      </div>
      <div class="iconfont icon-sousuo"></div>
    </header>
  </div>
</template>

<script>

export default {
  name: "PublicHeader",
  data() {
    return {
      headerItem: [
        { title: "我的", name: "Mine" },
        { title: "发现", name: "Find" },
        { title: "云村", name: "Cloud" },
        { title: "视频", name: "Vedio" },
      ],
    };
  },
};
</script>

<style scoped>
header {
  padding-top: 0.8rem;
  display: flex;
  position: relative;
}

header ul {
  width: 5.54rem;
  margin: auto;
  display: flex;
  justify-content: space-around;
}

header ul li {
  font-size: 0.49rem;
  list-style: none;
}

header .iconfont {
  position: absolute;
  top: 1.05rem;
  transform: translate(0, -50%);
}

header .icon-caidan {
  left: 0.38rem;
  font-size: 0.58rem;
}
header .iconfont .text-wrap {
  position: absolute;
  right: -0.34rem;
  top: -0.28rem;
  background-color: #fe3a3b;
  font-size: 0.24rem;
  padding: 0.08rem 0.14rem;
  border-radius: 0.26rem;
}

header .icon-sousuo {
  right: 0.38rem;
  font-size: 0.48rem;
}
</style>