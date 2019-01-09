import Vue from 'vue'
import Vuex from 'vuex'
import article from './modules/article.module'
import auth from './modules/auth.module'
import home from './modules/home.module'
import profile from './modules/profile.module'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    article,
    auth,
    home,
    profile
  }
})
