<template>
  <div class="wrap" ref="scroll_wrap">
    <div class="scroll">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "scroll",
  methods: {
    // scrollTopAction() {
    //   // 让滚动视图滚动到指定的位置
    //   // 参数1:x轴的位置
    //   // 参数2:y轴的位置
    //   // 参数3:滚动的动画时间
    //   this.dataScroll.scrollTo(0, -100, 100);
    // },
  },
  data() {
    return {};
  },

  mounted() {
    const scroll = this.$refs.scroll_wrap;
    const Iscroll = new IScroll(scroll, {
      bounce: false, //反弹效果
      click: true,
      tap: true, //touch
      probeType: 3,
    });

    Iscroll.on("beforeScrollStart", () => {
      Iscroll.refresh();
    });

    // this.dataScroll = Iscroll;
  },
};
</script>

<style scoped>
.wrap {
  touch-action: none;
  overflow: hidden;
}
</style>