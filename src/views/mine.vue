<template>
  <div class="mine-wrap">
    <div class="user">
      <div class="user-header"></div>

      <div class="info-wrap">
        <div class="user-name">聊所谓</div>
        <div class="vip-wrap">
          <div class="vip">vip开通</div>
          <div class="grade">Lv.8</div>
        </div>
      </div>

      <span class="iconfont icon-jiantouyou"></span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.mine-wrap {
  width: 100%;
}
.user {
  width: 100%;
  margin-top: 1.22rem;
  overflow: hidden;
  position: relative;
}
.user-header {
  margin-left: 0.72rem;
  float: left;
  background-size: cover;
  background-image: url(../assets/24.jpg);
  background-repeat: no-repeat;
  background-position: center;
  width: 1.38rem;
  height: 1.38rem;
  border-radius: 50%;
}

.info-wrap {
  height: 1.38rem;
  float: left;
  margin-left: 0.44rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.user-name {
  font-size: 0.42rem;
  font-weight: bold;
}
.vip-wrap {
  font-size: 0.22rem;
  height: 0.44rem;
}

.vip {
  padding: 0.1rem 0.12rem;
  float: left;
  background-color: #b9b8b6;
  border-radius: 0.26rem;
}
.grade {
  padding: 0.1rem 0.12rem;
  margin-left: 0.1rem;
  float: left;
  background-color: #fafafa;
  border-radius: 0.22rem;
}
.icon-jiantouyou {
  position: absolute;
  font-size: 0.34rem;
  top: 50%;
  right: 0.62rem;
  transform: translate(0, -50%);
}
</style>