// 懒加载:const Login = () => import("@/views/Login/Login.vue");
// import Home from '@/views/Home/Home.vue'; // 首页
// import Search from '@/views/Search/Search.vue'; // 搜索结果页面
// import Register from '@/views/Register/Register.vue'; // 注册
// import Login from '@/views/Login/Login.vue'; // 登录
// import Detail from '@/views/Detail/Detail.vue'; // 商品详情
// import AddCartSuccess from '@/views/AddCartSuccess/AddCartSuccess.vue'; // 加入购物车成功
// import ShopCart from '@/views/ShopCart/ShopCart.vue'; // 购物车
// import Trade from "@/views/Trade"; // 确认订单页面
// import Pay from "@/views/Pay"; // 支付页面
// import PaySuccess from "@/views/PaySuccess"; // 支付成功页面
// import Center from "@/views/Center"; // 个人中心页面
const Home = () => import(/* webpackChunkName:"Home" */'@/views/Home/Home.vue');
const Search = () => import(/* webpackChunkName:"Search" */'@/views/Search/Search.vue');
const Register = () => import(/* webpackChunkName:"Register" */'@/views/Register/Register.vue');
const Login = () => import(/* webpackChunkName:"Login" */'@/views/Login/Login.vue');
const Detail = () => import(/* webpackChunkName:"Detail" */'@/views/Detail/Detail.vue');
const AddCartSuccess = () => import(/* webpackChunkName:"AddCartSuccess" */'@/views/AddCartSuccess/AddCartSuccess.vue');
const ShopCart = () => import(/* webpackChunkName:"ShopCart" */'@/views/ShopCart/ShopCart.vue');
const Trade = () => import(/* webpackChunkName:"Trade" */'@/views/Trade');
const Pay = () => import(/* webpackChunkName:"Pay" */'@/views/Pay');
const PaySuccess = () => import(/* webpackChunkName:"PaySuccess" */'@/views/PaySuccess');
const Center = () => import(/* webpackChunkName:"Center" */'@/views/Center');

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
  {
    path: '/detail/:skuId',
    name: 'Detail',
    component: Detail,
  },
  {
    path: '/addcartsuccess/',
    name: 'AddCartSuccess',
    component: AddCartSuccess,
  },
  {
    path: '/shopcart',
    name: 'ShopCart',
    component: ShopCart,
  },
  {
    path: "/trade",
    name: "Trade",
    component: Trade,
  },
  {
    path: "/pay",
    name: "Pay",
    component: Pay,
  },
  {
    path: "/paysuccess",
    name: "PaySuccess",
    component: PaySuccess,
    // 路由独享守卫[只对某个路由生效]
    beforeCreate(to, from, next) {
      // to:去哪里,from:从哪里来,next:必须调用的方法
      if (from.name === "Pay") { // 如果是从Pay跳转到PaySuccess,不操作,直接next()
        next();
        return;
      }
      // 反之,直接跳转到个人中心[tip:全局路由守卫已经设置用户必须登录才可以访问这些页面]
      next({ name: 'Center' });
    },
  },
  {
    path: "/center",
    name: "Center",
    component: Center,
  },
];
