/*
Vuex最核心的管理对象store
*/
import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';
import getters from './getters';
// 声明使用vuex插件
Vue.use(Vuex);

// 向外暴露store对象
export default new Vuex.Store({
  modules, // 配置store的所有模块
  getters,
});

/*
  // 定义modules
  modules:{
    home:{
      state:{},
      actions:{},
      getters:{}.
      mutations:{},
    },
    login:{...},
  }
  // 最终vuex管理的状态的数据结构:
  {
    home:{
      categoryList:[]
    },
    login,
  }
*/
