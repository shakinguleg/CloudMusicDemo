<template>
  <div class="lyricsScroll" ref="lyricsScroll">
    <div class="scroll">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "lyricsScroll",
  props: {
    position: Number,
  },
  mounted() {
    var el = this.$refs.lyricsScroll;
    this.lyricsScroll = new IScroll(el, {
      bounce: false,
      click: true,
      tap: true,
      probeType: 1,
    });
    this.lyricsScroll.on("beforeScrollStart", () => {
      this.lyricsScroll.refresh();
    });
  },
  watch: {
    position: {
      handler(newVal) {
        this.lyricsScroll.scrollTo(0, -this.position);
      },
    },
  },
};
</script>

<style scoped>
.lyricsScroll {
  width: 100%;
  height: 100%;
  overflow: hidden;
  touch-action: none;
}
</style>