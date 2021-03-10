import { reqGetGoodsList } from '@/api';

export const state = {
  searchList: {
    // 品牌列表数据
    trademarkList: [],
    // 商品属性列表数据
    attrsList: [],
    // 商品数据
    goodsList: [],
    // 商品总数
    total: 0,
    // 每页显示条数
    pageSize: 5,
    // 当前页数
    pageNo: 1,
    // 总页数
    totalPages: 1,
  },
};
export const getters = {};
export const actions = {
  /*

   */
  getGoodsList({ commit }, data) {
    reqGetGoodsList(data)
      .then((searchList) => {
        commit('REQ_GET_GOODS_LIST', searchList);
      })
      .catch((message) => {
        console.log(message);
      });
  },
};
export const mutations = {
  REQ_GET_GOODS_LIST(state, searchList) {
    state.searchList = searchList;
  },
};
