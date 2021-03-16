import {
  reqGetCartList,
  reqAddCartList,
  reqUpdateCartList,
  reqDeleteCartList,
} from '@/api/shopcart';

export const state = {
  cartList: [],
};

export const getters = {
  // 1.总价
  totalPrice(state) {
    // reduce查找商品的isChecked为1(转换boolean为true,0为false),添加其Price*num
    return state.cartList.reduce(
      (p, c) => p + (c.isChecked ? c.skuPrice * c.skuNum : 0),
      0,
    );
  },
  // 2.已选商品的数量
  checkedNum(state) {
    return state.cartList.reduce((p, c) => p + (c.isChecked ? c.skuNum : 0), 0);
  },
  // 3.是否全选
  isCheckAll(state) {
    return !state.cartList.find((cart) => !cart.isChecked);
  },
};

export const actions = {
  // 1.获取购物车信息
  getCartList({ commit }) {
    return reqGetCartList()
      .then((cartList) => {
        commit('GET_CART_LIST', cartList[0].cartInfoList);
      })
      .catch((message) => {
        console.log(message);
      });
  },
  // 2.添加购物车
  addCartList({ commit }, { skuId, skuNum }) {
    // reqGetCartList函数返回一个promise,默认成功promise
    // 只有函数内部报错了,会返回失败的promise
    // 或者是内部返回一个promise,那么整个函数返回的promise就是返回的这个promise,而不是默认的
    return reqAddCartList(skuId, skuNum).then(() => {
      // 外面是一个promise,里面也是一个promise,
      // 如果不设置返回值,默认返回一个成功的promise,如果返回的是新promise,
      // 外面的promise由内部promise决定
      // tip:将函数返回出去,让外面判断这个成功\失败状态
      commit('ADD_CART_LIST');
      // .catch((message) => { //如果不写,就会在调用action的地方进行处理[detail.vue]
      //   console.log(message);
      // })
      // .then(() => {}) // 成功/失败都会触发,只要是没有报错,没有返回promise,都会触发
    });
  },
  // 3.更新购物车某商品状态
  updateCartList({ commit }, { skuId, isChecked }) {
    // console.log(skuId, isChecked);
    reqUpdateCartList(skuId, isChecked).then(() => {
      commit('UPDATE_CART_LIST', { skuId, isChecked });
    });
  },
  // 4.删除购物车某商品
  deleteCartList({ commit }, skuId) {
    reqDeleteCartList(skuId).then(() => {
      commit('DELETE_CART_LIST', skuId);
    });
  },
  // 5.更新全部商品状态
  updateAllCartList({ commit }, { idArr, isCheckAll }) {
    const requestArr = [];
    idArr.forEach((skuId) => {
      requestArr.push(reqUpdateCartList(skuId, isCheckAll));
    });
    Promise.all(requestArr).then(() => {
      commit('UPDATE_ALL_CART_LIST', isCheckAll);
    });
  },
  // 6.删除选中商品
  deletePartCartList({ commit }, idArr) {
    const requestArr = [];
    idArr.forEach((skuId) => {
      requestArr.push(reqDeleteCartList(skuId));
    });
    Promise.all(requestArr).then(() => {
      commit('DELETE_PART_CART_LIST');
    });
  },
};

export const mutations = {
  GET_CART_LIST(state, cartList) {
    state.cartList = cartList;
  },
  ADD_CART_LIST() {},
  UPDATE_CART_LIST(state, { skuId, isChecked }) {
    // 找到符合Id的购物车cart商品
    const cart = state.cartList.find((cart) => cart.skuId === skuId);
    // 更新isChecked
    cart.isChecked = isChecked;
  },
  DELETE_CART_LIST(state, skuId) {
    state.cartList = state.cartList.filter((cart) => {
      console.log(cart.skuId, skuId);
      return cart.skuId !== skuId;
    });
  },
  UPDATE_ALL_CART_LIST(state, isCheckAll) {
    state.cartList.forEach((i) => {
      i.isChecked = isCheckAll;
    });
  },
  DELETE_PART_CART_LIST(state) {
    state.cartList = state.cartList.filter((i) => !i.isChecked);
  },
};
