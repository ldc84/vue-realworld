import ApiService from "^@/api.service"
import JwtService from "^@/jwt.service"
import { REGISTER } from "../actions.type"
import { SET_AUTH, SET_ERROR } from "../mutations.type"

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
const actions = {
  [REGISTER](context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post("users", { user: credentials })
        .then(({ data }) => {
          context.commit(SET_AUTH, data.user);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
          console.log(response.data.errors)
          reject(response);
        });
    });
  }
};
const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_AUTH](state, user) {
    state.isAuthenticated = true;
    state.user = user;
    state.errors = {};
    JwtService.saveToken(state.user.token);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}