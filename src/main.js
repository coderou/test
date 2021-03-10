import Vue from 'vue';
// import Carousel from './components/Carousel/index.vue';
import Carousel from '@/components/Carousel';
import TypeNav from '@/components/TypeNav/index.vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
// 加载mock,让其生效
import '@/mock';

import '@/assets/css/reset.css';

Vue.config.productionTip = false;
// 注册全局组件
Vue.component('TypeNav', TypeNav);
Vue.component('Carousel', Carousel);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
