import Vue from 'vue';
// import Carousel from './components/Carousel/index.vue';
import Carousel from '@/components/Carousel';
import TypeNav from '@/components/TypeNav/index.vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

import '@/assets/css/reset.css';
import '@/assets/font/iconfont.css';
import './plugins/element.js';

// 加载mock,让其生效
/* eslint-disable */
if (process.env.NODE_ENV === 'development') {
  require('./mock'); //要写NODE_ENV,要用commonjs规范
  // import '@/mock';
}
/* eslint-enable */

Vue.config.productionTip = false;
// 注册全局组件
Vue.component('TypeNav', TypeNav);
Vue.component('Carousel', Carousel);

// 添加全局事件总线对象
Vue.prototype.$bus = new Vue();
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
