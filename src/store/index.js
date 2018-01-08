import Vue from 'vue'
import Vuex from 'vuex'
import user_info from './modules/user_info'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules:{
    user_info
  }
})
export default store
