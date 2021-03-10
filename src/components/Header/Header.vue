<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>请</span>
            <router-link to="/login">登陆</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <a href="javascript:">我的订单</a>
          <a href="javascript:">我的购物车</a>
          <a href="javascript:">我的尚品汇</a>
          <a href="javascript:">尚品汇会员</a>
          <a href="javascript:">企业采购</a>
          <a href="javascript:">关注尚品汇</a>
          <a href="javascript:">合作招商</a>
          <a href="javascript:">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <!-- 点击logo..pbg,跳转首页 -->
        <router-link class="logo" to="/">
          <img src="./logo.png" alt="logo" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form class="searchForm" @submit.prevent="toSearch">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <!-- 如果仅仅是跳转,用routerLink,如果需要做数据处理等,用编程式导航 -->
          <!-- <button @submit.prevent="toSearch">搜索</button> -->
          <button class="sui-btn btn-xlarge btn-danger" type="submit">
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      keyword: '',
    };
  },

  methods: {
    /* toSearch() {
      // `/search/${this.keyword}`
      this.$router.history.push({
        name: 'Search',
        params: {
          keyword: this.keyword,
          //如果有参数,没问题,如果没参数,是undefined,有问题,即,params如果写了,必须必须必须有值,不能是undefined
        },
      });
    }, */
    toSearch() {
      const { keyword } = this;
      const { query } = this.$route;

      const location = { name: 'Search' };
      if (keyword) {
        location.params = { keyword };
      }
      if (query.categoryName) {
        location.query = query;
      }

      // this.$bus.$emit('search', { keyword });
      this.$router.history.push(location);
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }
    .searchArea {
      float: right;
      margin-top: 35px;
      .searchForm {
        overflow: hidden;
        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
