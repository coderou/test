import Home from '@/views/Home/Home.vue';
import Search from '@/views/Search/Search.vue';
import Register from '@/views/Register/Register.vue';
import Login from '@/views/Login/Login.vue';

export default [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      // 元信息,如果匹配上当前路由路径.meta参数就会添加到this.$route上
      /* isShowFooter: false,// 如果这么写,App.vue比较简单,但是因为默认是undefined,所以写了和没写一样
       下面所有的true的,都要添加上,于是直接取反,所以,undefined的表示显示,于是改命Hide */
      isHideFooter: true,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      // 需要隐藏footer的路由添加此配置
      isHideFooter: true,
    },
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    // 使用params必须要路由路径配置
    path: '/search/:keyword?/', // params参数可传可不传,如果不加问号,表示必填
    name: 'Search',
    component: Search,
  },
];
