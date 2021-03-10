export default {
  // 为了简化使用某些数据
  // 好处1:有缓存,好处2:以后其他组件不需要写这么长
  // 品牌列表数据
  trademarkList(state) {
    return state.search.searchList.trademarkList;
  },
  // 商品属性列表数据
  attrsList(state) {
    return state.search.searchList.attrsList;
  },
  // 商品数据
  goodList(state) {
    return state.search.searchList.goodList;
  },
  // 商品总数
  total(state) {
    return state.search.searchList.total;
  },
  // 每页显示条数
  pageSize(state) {
    return state.search.searchList.pageSize;
  },
  // 当前页数
  pageNo(state) {
    return state.search.searchList.pageNo;
  },
  // 总页数
  totalPages(state) {
    return state.search.searchList.totalPages;
  },
};
