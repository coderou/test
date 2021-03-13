import { reqGetDetail } from '@/api';

export const state = {
  good: {
  },
};
export const getters = {};
export const actions = {
  getDetail({ commit }, id) {
    console.log(id);
    reqGetDetail(id)
      .then((searchList) => {
        commit('REQ_GET_DETAIL', searchList);
      })
      .catch((message) => {
        console.log(message);
      });
  },
};
export const mutations = {
  REQ_GET_DETAIL(state, good) {
    state.good = good;
  },
};
