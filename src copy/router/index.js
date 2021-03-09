import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

// 声明使用插件
Vue.use(VueRouter);

// 向外默认暴露路由器对象
export default new VueRouter({
  mode: 'history', // 没有#的模式
  routes, // 注册所有路由
});
