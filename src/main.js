import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import axiosI from './utils/custom-axios'
import router from './router/router'
import store from './store'
import commonFilter from './utils/common-filter'
// 注册为全局组件
import toast from './components/toast.vue'
import museEl from './muse-el'
import 'assets/theme.less'
import VueLazyload from 'vue-lazyload'
Vue.use(museEl)
Vue.use(VueLazyload, {
  preLoad: 1,
  error: 'dist/error.png',
  loading: '../static/default_cover.png',
  lazyComponent: false,
  attempt: 1,
  filter: {
    customer ({ el, src }) {
      if (el.getAttribute('def-img')) {
        src = src || 'def.jpg'
      }
      let size = el.getAttribute('cover-size')
      if (size) {
        src += '?param=' + size
      }
      return src
    }
  }
})
Vue.use(commonFilter)
// override $http
Vue.prototype.$http = axiosI
Vue.component('Toast', toast)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
