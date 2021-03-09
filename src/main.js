import Vue from 'vue';
import TypeNav from './components/TypeNav/index.vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/css/reset.css';

Vue.config.productionTip = false;
// 注册全局组件
Vue.component('TypeNav', TypeNav);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
