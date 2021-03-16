import { reqLogin, reqLogout } from '@/api/user';

export const state = {
  user: JSON.parse(window.localStorage.getItem('user')) || "",
};

export const getters = {
};

export const actions = {
  login({ commit }, { phone, password }) {
    return reqLogin({ phone, password })
      .then((user) => {
        commit('LOGIN', user);
        return user; // 外面接收到的就是这里promise的返回值
      });
  },
  logout({ commit }) {
    return reqLogout().then(() => {
      commit('LOGOUT');
    });
  },
};

export const mutations = {
  LOGIN(state, user) {
    state.user = user;
  },
  LOGOUT(state) {
    state.user = {};
  },
};
