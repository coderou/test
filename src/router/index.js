import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import routes from './routes';

// 1.声明使用插件
Vue.use(VueRouter);

// 2.向外默认暴露路由器对象
const router = new VueRouter({
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

// 定义F4保存需要登录才能访问的页面
const authRoute = ["Trade", "Pay", "PaySuccess", "Center"];

// 3.定义全局路由守卫(tip:传递一个函数进去,函数形参3接收next方法,调用才能跳转)
router.beforeEach((to, from, next) => {
  /*
  目的\需求:没登录不能访问页面:/Trade /Pay /PaySuccess /Center
  */
  if (authRoute.indexOf(to.name) === -1 || store.state.user.user.token) {
    // 如果匹配页面非改F4 或者 已经登录,直接跳转
    next();
    return;
  }
  next(`/login?redirect=${to.path}`);// 匹配到了,且为登录,跳转首页,query传参以便于登录成功后返回
});

export default router;
