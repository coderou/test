import {
  reqGetCartList,
  reqAddCartList,
  // reqUpdateCartList,
  // reqDeleteCartList,
} from '@/api/shopcart';

export const state = {
  cartList: [],
};
export const getters = {};
export const actions = {
  getCartList({ commit }) {
    return reqGetCartList()
      .then((cartList) => {
        commit('GET_CART_LIST', cartList);
      })
      .catch((message) => {
        console.log(message);
      });
  },

  addCartList({ commit }, { skuId, skuNum }) {
    // reqGetCartList函数返回一个promise,默认成功promise
    // 只有函数内部报错了,会返回失败的promise
    // 或者是内部返回一个promise,那么整个函数返回的promise就是返回的这个promise,而不是默认的
    return reqAddCartList(skuId, skuNum).then(() => {
      // 外面是一个promise,里面也是一个promise,
      // 如果不设置返回值,默认返回一个成功的promise,如果返回的是新promise,
      // 外面的promise由内部promise决定
      // tip:将函数返回出去,让外面判断这个成功状态
      commit('ADD_CART_LIST');
      // .catch((message) => { //如果不写,就会在调用action的地方进行处理
      //   console.log(message);
      // })
      // .then(() => {}) // 成功/失败都会触发,只要是没有报错,没有返回promise,都会触发
    });
  },
};
export const mutations = {
  GET_CART_LIST(state, cartList) {
    state.cartList = cartList;
  },
  ADD_CART_LIST() {},
};
