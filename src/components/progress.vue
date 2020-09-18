<template>
  <div class="progress" ref="progress">
    <div class="dot" ref="dot" @touchstart="handleTouchStart"></div>
    <div class="bar" ref="bar"></div>
  </div>
</template>

<script>
export default {
  name: "myProgress",
  props: {
    setProgress: Function, //回传滑动百分比
    getProgress: Number, //得到的滑动
  },
  data() {
    return {};
  },
  mounted() {
    // 初始化点的位置;
    var pro_width = document.documentElement.querySelector(".progress")
      .clientWidth;
    document.documentElement.querySelector(
      ".dot"
    ).style.left = document.documentElement.querySelector(".bar").style.width =
      this.getProgress * pro_width + "px";
  },
  methods: {
    //处理滑动
    handleTouchStart(ev) {
      //给屏幕注册监听事件
      document.ontouchmove = this.handleTouchMove;
      document.ontouchend = this.handleTouchEnd;
      document.ontouchcancel = this.handleTouchEnd;
    },
    handleTouchMove(ev) {
      // 触碰移动时的坐标
      var x = ev.changedTouches[0].clientX;

      //控制条距离屏幕的偏移值
      var progressOffsetLeft = this.offset(
        document.documentElement.querySelector(".progress"),
        false
      ).left;

      // 触摸点右侧距离屏幕右侧的偏移值
      var dotOffsetLeft = this.offset(
        document.documentElement.querySelector(".dot"),
        false
      ).left;

      var progressWidth = document.documentElement.querySelector(".progress")
        .clientWidth;
      var length = x - progressOffsetLeft;
      if (length < 0 || length > progressWidth) {
        return;
      }

      this.$refs.dot.style.left = length + "px";
      this.$refs.bar.style.width = length + "px";
      this.setProgress(length / progressWidth);
    },
    handleTouchEnd(ev) {
      document.ontouchmove = null;
    },
    offset(dom, bool) {
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
  },
  watch: {
    getProgress: {
      handler(newVal) {
        if (!newVal) {
          return;
        }

        this.$refs.bar.style.width = this.$refs.dot.style.left =
          newVal *
            document.documentElement.querySelector(".progress").clientWidth +
          "px";
      },
    },
  },
};
</script>

<style>
.progress {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #858585;
}

.progress .bar {
  height: 100%;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: red;
  border-radius: 0.02rem;
}

.progress .dot {
  position: absolute;
  width: 0.16rem;
  height: 0.16rem;
  border-radius: 50%;
  background-color: #ffffff;
  top: -0.06rem;
  left: -0.06rem;
  z-index: 2;
}
</style>