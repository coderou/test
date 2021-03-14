import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

// 声明使用插件
Vue.use(VueRouter);

// 向外默认暴露路由器对象
export default new VueRouter({
  mode: 'history', // 没有#的模式
  routes, // 注册所有路由
  // 决定每次路由切换时页面的滚动
  // https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html#%E5%BC%82%E6%AD%A5%E6%BB%9A%E5%8A%A8
  // scrollBehavior(to, from, savedPosition) {
  scrollBehavior() {
    // return 期望滚动到那个的位置
    return {
      x: 0,
      y: 0,
    };
  },
});
