import Vue from 'vue'
import App from './App.vue'
import router from './router'

function resize() {
  var fontsize = 100 / 1080 * document.documentElement.clientWidth
  document.documentElement.style.fontSize = fontsize + "px"

}

resize();

window.onload = function () {
  resize();
}

function test(){

}

test.bind()

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
