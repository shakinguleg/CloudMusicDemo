<template>
  <div class="applicationButton">
    <slot name="logo"></slot>
    <slot name="text"></slot>
  </div>
</template>

<script>
export default {
  name: "applicationButton",
  data() {
    return {
      button: "button",
      title: "title",
    };
  },
};
</script>

<style scoped>
.applicationButton {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1.36rem;
}

.button {
  width: 0.72rem;
  height: 0.72rem;
  border-radius: 50%;
  font-size: 0.42rem;
  color: white;
  text-align: center;
  line-height: .72rem;


  /* 背景颜色 */
  /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#ee5b51+0,ff2317+100 */
  background: #ee5b51; /* Old browsers */
  background: -moz-radial-gradient(
    center,
    ellipse cover,
    #ee5b51 0%,
    #ff2317 100%
  ); /* FF3.6-15 */
  background: -webkit-radial-gradient(
    center,
    ellipse cover,
    #ee5b51 0%,
    #ff2317 100%
  ); /* Chrome10-25,Safari5.1-6 */
  background: radial-gradient(
    ellipse at center,
    #ee5b51 0%,
    #ff2317 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ee5b51', endColorstr='#ff2317',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
}
.text {
  margin-top: 0.22rem;
  font-size: 0.3rem;
}
</style>