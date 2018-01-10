import * as types from '../mutation-types';
const state = {
  showPassword:false,
  isLogin:false
};
const mutations = {
  [types.SHOW_PASSWORD](state){
    state.showPassword = !state.showPassword
  },
  [types.LOGIN](state){
    state.isLogin = true;
  },
  [types.LOOUT](state){
    state.isLogin = false;
  }
};
export default {
  state,
  mutations
}
