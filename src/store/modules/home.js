/* eslint-disable no-shadow */
/*
vuex管理的home模块
*/
import { reqGetBaseCategoryList } from '@/api';

const state = {
  categoryList: [], // 所有分类的数组
};

const mutations = {
  /*
  接收保存分类列表
  */
  RECEIVE_BASE_CATEGORY_LIST(state, list) {
    state.categoryList = list;
  },
};

const actions = {
  /*
  异步获取商品三级分类列表
  */
  /* async getBaseCategoryList({ commit }) {
    const result = await reqGetBaseCategoryList();
    if (result.code === 200) {
      commit('RECEIVE_BASE_CATEGORY_LIST', result.data);
    }
  }, */
  getBaseCategoryList({ commit }) {
    reqGetBaseCategoryList()
      .then((categoryList) => {
        commit('RECEIVE_BASE_CATEGORY_LIST', categoryList);
      })
      .catch((message) => {
        console.log(message);
      });
  },
};

const getters = {};

// 将上面的对象暴露出去
export default {
  state,
  actions,
  mutations,
  getters,
};
