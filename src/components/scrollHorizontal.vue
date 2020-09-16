<template>
  <div class="horizontal" ref="scroll_wrap_horizontal">
    <div class="scroll">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "scrollH",
  methods: {
    // scrollTopAction() {
    //   // 让滚动视图滚动到指定的位置
    //   // 参数1:x轴的位置
    //   // 参数2:y轴的位置
    //   // 参数3:滚动的动画时间
    //   this.dataScroll.scrollTo(0, -100, 100);
    // },
  },

  mounted() {
    const scroll = this.$refs.scroll_wrap_horizontal;
    const Iscroll = new IScroll(scroll, {
      bounce: false, //反弹效果
      click: true,
      tap: true, //touch
      probeType: 3,
      scrollX: true,
    });

    Iscroll.on("beforeScrollStart", () => {
      Iscroll.refresh();
    });

    // this.dataScroll = Iscroll;
  },
};
</script>

<style scoped>
.horizontal {
  touch-action: none;
  overflow: hidden;
}

.horizontal .scroll {
  width: max-content;
}
</style>