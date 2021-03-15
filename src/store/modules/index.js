/*
收集所有vuex管理的模块,负责汇总所有的modules
*/
import home from './home'; // 默认暴露
import * as search from './search'; // 通过别名收到分别暴露的内容
// 向外暴露包含所有vuex管理的模块的对象
import * as detail from './detail';
import * as shopcart from './shopcart'; // tip:路径名不能多空格,否则报错This relative module was not found:

export default {
  home,
  search,
  detail,
  shopcart,
};
