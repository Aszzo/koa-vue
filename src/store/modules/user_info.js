import * as types from '../mutation-types';
const state = {
  showPassword:false
};
const mutations = {
  [types.SHOW_PASSWORD](state){
    state.showPassword = !state.showPassword
  }
};
export default {
  state,
  mutations
}
