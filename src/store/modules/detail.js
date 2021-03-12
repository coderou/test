import { reqGetDetail } from '@/api';

export const state = {
  GoodInfo: {
  },
};
export const getters = {};
export const actions = {
  getGoodsList({ commit }, data) {
    reqGetDetail(data)
      .then((searchList) => {
        commit('REQ_GET_DETAIL', searchList);
      })
      .catch((message) => {
        console.log(message);
      });
  },
};
export const mutations = {
  REQ_GET_DETAIL(state, GoodInfo) {
    state.GoodInfo = GoodInfo;
  },
};
