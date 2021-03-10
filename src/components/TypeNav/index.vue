<template>
  <!-- 商品分类导航 -->
  <div class="type-nav" @mouseleave="isShow = false">
    <div class="container">
      <h2 class="all" @mouseenter="isShow = true">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <div class="sort" v-if="isHome || isShow">
        <div class="all-sort-list2" @click="toSearch">
          <div
            v-for="item in categoryList"
            :key="item.categoryId"
            class="item bo"
          >
            <h3>
              <!--
                1.使用路由链接跳转
                  问题:生成的router-link太多了
                  :to="{
                    name:"Search", // 跳转到那个命名路由
                    query:{
                      categoryName:item.categoryName,
                      category1ID:item.categoryId
                    },
                  }"
                2.使用编程式导航
                    <a
                      @click.prevent="
                        toSearch(c1.categoryName, c2.categoryId, 'category1ID')
                      "
                      href=""
                      >{{ dt.categoryName }}</a
                    >
                  问题:click事件绑定太多了
                3.使用事件委托来优化
               -->
              <a
                :data-categoryName="item.categoryName"
                :data-categoryId="item.categoryId"
                data-level="category1Id"
                >{{ item.categoryName }}</a
              >
            </h3>
            <div class="item-list clearfix">
              <div class="subitem">
                <!-- 二级菜单 -->
                <dl
                  v-for="dt in item.categoryChild"
                  :key="dt.categoryId"
                  class="fore"
                >
                  <dt>
                    <a
                      :data-categoryName="dt.categoryName"
                      :data-categoryId="dt.categoryId"
                      data-level="category2Id"
                      >{{ dt.categoryName }}</a
                    >
                  </dt>
                  <!-- 三级菜单 -->
                  <dd>
                    <em v-for="dd in dt.categoryChild" :key="dd.categoryId">
                      <a
                        :data-categoryName="dd.categoryName"
                        :data-categoryId="dd.categoryId"
                        data-level="category3Id"
                        >{{ dd.categoryName }}</a
                      >
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
import { mapState, mapActions } from 'vuex';
// import { getBaseCategoryList } from '../../api/index';

export default {
  name: 'TypeNav',
  data() {
    return {
      // data: [],
      isShow: false,
      isHome: this.$route.path === '/', // 判断当前是不是首页
    };
  },
  computed: {
    // ...mapState(['categoryList']), //映射数据:不行,之前的做法,现在不行了
    // ...mapState(['home']),// 可以用,但是太麻烦
    ...mapState({
      categoryList: (state) => state.home.categoryList, // 在使用的时候会调用这个函数,形参是state所有数据
    }),
  },
  mounted() {
    // #region
    // 1.0_直接axios发送
    /* axios({
      url: 'http://182.92.128.115/api/product/getBaseCategoryList',
      method: 'get',
    }).then((res) => {
      this.data = res.data.data;
      console.log(this.data);
    }); */
    // 1.2_拦截器改造
    /* getBaseCategoryList()
      .then((res) => {
        this.data = res;
        console.log(res);
      })
      .catch((message) => {
        console.log(message);
      }); */
    // 2.0通过vuex映射
    // #endregion
    this.getBaseCategoryList(); // 映射方法:可以
  },
  methods: {
    ...mapActions(['getBaseCategoryList']),
    /* toSearch(categoryName, categoryId, level) {
      this.$router.history.push({
        name: 'Search',
        query: {
          categoryName,
          [level]: categoryId,
        },
      });
    }, */
    toSearch(event) {
      // console.log(event.target.dataset); // 注意:dataset中的都是小写
      const { categoryname, categoryid, level } = event.target.dataset;
      if (!categoryname) return;
      const location = {
        name: 'Search',
      };
      // 处理query参数
      const query = {
        categoryName: categoryname,
        [level]: categoryid,
      };
      location.query = query;
      // 处理params参数
      const { keyword } = this.$route.params;
      if (keyword) {
        location.params = { keyword };
      }

      // 通知search组件请求数据
      // this.$bus.$emit('search', { query });
      this.$router.history.push(location);
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            background-color: greenyellow;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
