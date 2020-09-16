import Vue from 'vue'
import App from './App.vue'
import router from './router'
import scroll from './components/scroll'
import scrollHorizontal from './components/scrollHorizontal'
import pull from './components/pull-down-up.vue'
import store from './store';

Vue.component("scroll", scroll)
Vue.component("scrollHorizontal", scrollHorizontal)
Vue.component("pull", pull)

const computeFontSize = () => {
  let windowWidth = window.document.documentElement.clientWidth;
  if (windowWidth <= 320) {
    windowWidth = 320;
  } else if (windowWidth >= 1080) {
    windowWidth = 1080;
  }
  const fontSize = windowWidth * 100 / 1080;
  window.document.documentElement.style.fontSize = fontSize + 'px';
}
window.addEventListener('resize', computeFontSize);
window.addEventListener('load', computeFontSize);

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
