/* eslint-disable no-shadow */
/*
vuex管理的home模块
*/
import { reqBaseCategoryList } from '@/api';

const state = {
  baseCategoryList: [], // 所有分类的数组
};

const mutations = {
  /*
  接收保存分类列表
  */
  RECEIVE_BASE_CATEGORY_LIST(state, list) {
    state.baseCategoryList = list;
  },
};

const actions = {
  /*
  异步获取商品三级分类列表
  */
  async getBaseCategoryList({ commit }) {
    const result = await reqBaseCategoryList();
    if (result.code === 200) {
      commit('RECEIVE_BASE_CATEGORY_LIST', result.data);
    }
  },
};

const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
