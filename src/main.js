import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue'

import _ from 'lodash'

Vue.use(Antd)

Vue.config.productionTip = false

Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')