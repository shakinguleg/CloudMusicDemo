<template>
  <div class="pull_wrap" ref="pull_wrap">
    <div class="pull">
      <div class="up" ref="up">
        <img src="/img/arrow.jpg" :class="{arrow:true,rotation:rotate} " ref="img1" />
        <span>{{upRefresh}}</span>
      </div>
      <scroll>
        <slot></slot>
      </scroll>
      <div class="down" ref="down">
        <img src="/img/arrow.jpg" alt :class="{arrow:rotate}" />
        <span>{{downRefresh}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rotate: false,
      upRefresh: "下拉刷新",
      downRefresh: "上拉刷新",
    };
  },
  mounted() {
    const scroll = this.$refs.pull_wrap;
    const up = this.$refs.up;
    const down = this.$refs.down;
    const img1 = this.$refs.img1;
    let timer;
    const Iscroll = new IScroll(scroll, {
      bounce: true,
      click: true,
      tap: true, //touch
      probeType: 3,
    });

    Iscroll.scrollTo(0, -up.clientHeight, 0);

    // 每次滚动前刷新
    Iscroll.on("beforeScrollStart", () => {
      Iscroll.refresh();
    });

    Iscroll.on("scroll", () => {
      clearTimeout(timer);
      if (Iscroll.y > 0) {
        this.rotate = true;
        this.upRefresh = "正在刷新";
      }
      if (Iscroll.y < Iscroll.maxScrollY) {
        this.rotate = true;
        this.downRefresh = "正在刷新";
      }
    });

    // 滚动结束时判断
    Iscroll.on(
      "scrollEnd",
      () => {
        // 下拉
        // 下拉刷新结构可见时,复原
        if (Iscroll.y > -up.clientHeight && Iscroll.y < 0) {
          Iscroll.scrollTo(0, -up.clientHeight, 300);
        } else if (Iscroll.y >= 0) {
          clearTimeout(timer);
          timer = setTimeout(() => {
            this.rotate = false;
            this.upRefresh = "下拉刷新";
            Iscroll.scrollTo(0, -up.clientHeight, 300);
          }, 1000);
        }

        // 上拉
        // 上拉结构可见, 复原
        if (
          Iscroll.y < Iscroll.maxScrollY + down.clientHeight &&
          Iscroll.y > Iscroll.maxScrollY
        ) {
          Iscroll.scrollTo(0, Iscroll.maxScrollY + down.clientHeight, 300);
        } else if (Iscroll.y <= Iscroll.maxScrollY) {
          clearTimeout(timer);
          timer = setTimeout(() => {
            this.rotate = false;
            this.down = "上拉刷新";
            Iscroll.scrollTo(0, Iscroll.maxScrollY + down.clientHeight, 300);
          }, 1000);
        }
      }

      // this.dataScroll = Iscroll;
    );
  },
};
</script>

<style scoped>
.up {
  width: 100%;
  height: 1rem;
  background-color: beige;
}
.down {
  width: 100%;
  height: 1rem;
  background-color: beige;
}

.up img {
  width: 1rem;
  transition: 1000ms;
}
.down img {
  width: 1rem;
  transition: 1000ms;
}

.arrow {
  transform: rotate(180deg);
}

.rotation {
  transform: rotate(360deg);
}
</style>