/* eslint-disable no-shadow */
/*
vuex管理的home模块
*/
import { reqGetBaseCategoryList, reqGetBanners, reqGetFloors } from '@/api';

const state = {
  categoryList: [], // 所有分类的数组
  banners: [],
  floors: [],
};

const mutations = {
  /*
  接收保存分类列表
  */
  RECEIVE_BASE_CATEGORY_LIST(state, list) {
    state.categoryList = list;
  },
  GET_BANNERS(state, banners) {
    state.banners = banners;
  },
  GET_FLOORS(state, floors) {
    state.floors = floors;
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
  getBanners({ commit }) {
    reqGetBanners()
      .then((banners) => {
        commit('GET_BANNERS', banners);
      })
      .catch((message) => {
        console.log(message);
      });
  },
  getFloors({ commit }) {
    reqGetFloors()
      .then((floors) => {
        commit('GET_FLOORS', floors);
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
