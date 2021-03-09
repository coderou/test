<template>
  <div>
    <Header />
    <!-- 显示路由组件 -->
    <router-view></router-view>

    <!-- 登录和注册页面不显示Footer组件 -->
    <!-- <Footer v-if="isShowFooter" /> -->
    <Footer v-if="!$route.meta.isHideFooter" />
  </div>
</template>

<script type="text/ecmascript-6">
// eslint-disable-next-line import/extensions
// import { reqBaseCategoryList } from '@/api';
import Footer from './components/Footer/Footer.vue';
import Header from './components/Header/Header.vue';

export default {
  name: 'App',
  computed: {
    isShowFooter() {
      const { path } = this.$route.path;
      return path !== '/login' && path !== '/register';
    },
  },
  components: {
    Footer,
    Header,
  },
  async mounted() {
    // const result = await reqBaseCategoryList();
    // console.log('result', result);
  },
};
</script>

<style lang="less" scoped></style>
