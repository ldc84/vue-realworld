import JwtService from "@/common/jwt.service"

// 추후 진행 예정
const state = {
  user: {},
  isAuthenticated: !!JwtService.getToken()
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  }
};
const actions = {};
const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations
}