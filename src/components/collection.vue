<template>
  <router-link :to="{name:'Songs',params:{collectionId:collec.id}}">
    <div class="collection">
      <img :src="collec.picUrl" alt />
      <div class="info_wrap">
        <p class="col">{{collec.name}}</p>
        <div class="num">
          <span>{{collec.trackCount}}</span>首
        </div>
      </div>

      <div class="iconfont icon-gengduo"></div>
    </div>
  </router-link>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "collection",
  props: {
    collec: Object,
  },
  computed: {},
  methods: {},
  mounted() {},
};
</script>

<style>
.collection {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.14rem 0;
}

.collection img {
  width: 1.38rem;
  height: 1.38rem;
  border-radius: 0.1rem;
}

.collection .info_wrap {
  position: absolute;
  left: 1.7rem;
  top: 50%;
  transform: translate(0, -50%);
}

.info_wrap .col {
  font-size: 0.3rem;
  color: #333;
}
.info_wrap .num {
  margin-top: 0.2rem;
  font-size: 0.26rem;
  color: #999;
}

.icon-gengduo {
  font-size: 0.4rem;
  color: #999;
}
</style>