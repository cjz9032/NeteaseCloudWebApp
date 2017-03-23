import Vue from 'vue'
import App from './App'
import axiosI from './utils/custom-axios'
import router from './router/router'
import store from './store'
import commonFilter from './utils/common-filter'
// 注册为全局组件
import toast from './components/toast.vue'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'assets/theme.less'

Vue.use(MuseUI)
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
