/*
Vuex最核心的管理对象store
*/
import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';

// 声明使用vuex插件
Vue.use(Vuex);

// 向外暴露store对象
export default new Vuex.Store({
  modules, // 配置store的所有模块
});
