<template>
  <div>
    <nav>
      <div class="iconfont icon-caidan">
        <span class="text-wrap">40</span>
      </div>
      <ul>
        <li
          v-for="(item,index) in headerItem"
          :key="item.title"
          @click="changeSel(index)"
          :class="{active:selected===index}"
        >
          <router-link :to="{name:item.name}">{{item.title}}</router-link>
        </li>
      </ul>

      <div class="iconfont icon-sousuo"></div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Table",
  data() {
    return {
      headerItem: [
        { title: "我的", name: "Mine" },
        { title: "发现", name: "Find" },
        { title: "云村", name: "Cloud" },
        { title: "视频", name: "Vedio" },
      ],
      selected: 0,
    };
  },
  methods: {
    changeSel(index) {
      this.selected = index;
      this.$store.dispatch("mine/requireMineData");
    },
  },
  watch: {
    selected: {
      handler(index) {
        // const id = this.headerItem[index]
      },
    },
  },
  mounted() {
    this.$store.dispatch("mine/requireMineData");
  },
};
</script>

<style scoped>
nav {
  width: 100%;
  height: 1.3rem;
  display: flex;
  background-color: transparent;
  justify-content: space-between;
  align-items: center;
}

nav ul {
  width: 51.7%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav ul li {
  width: 25%;
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

nav ul li a {
  font-size: 0.4rem;
  color: #999;
}

.active a {
  font-size: 0.48rem;
  color: #333;
  font-weight: bold;
}

nav .icon-caidan {
  margin-left: 0.38rem;
  font-size: 0.58rem;
  position: relative;
}
nav .iconfont .text-wrap {
  position: absolute;
  right: -0.34rem;
  top: -0.28rem;
  background-color: #fe3a3b;
  font-size: 0.24rem;
  padding: 0.08rem 0.14rem;
  border-radius: 0.26rem;
}

nav .icon-sousuo {
  margin-right: 0.38rem;
  font-size: 0.48rem;
}
</style>