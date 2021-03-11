<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li
              class="with-x"
              v-show="$route.query.categoryName"
              @click="deleteItem('query')"
            >
              {{ $route.query.categoryName }}~~~X
            </li>
            <li
              class="with-x"
              v-show="$route.params.keyword"
              @click="deleteItem('params')"
            >
              {{ $route.params.keyword }}~~~X
            </li>
          </ul>
        </div>
        <!--selector-->
        <SearchSelector :addItem="addItem" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li class="active">
                  <a href="#">综合</a>
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li>
                  <a href="#">价格⬆</a>
                </li>
                <li>
                  <a href="#">价格⬇</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="###" target="_blank"
                      ><img :src="goods.defaultImg"
                    /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="goods.title">{{
                      goods.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted"><span>...</span></li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div><span>共10页&nbsp;</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SearchSelector from './SearchSelector/SearchSelector';

export default {
  name: 'Search',
  data() {
    const {
      category1Id,
      category2Id,
      category3Id,
      categoryName,
    } = this.$route.query; // 解构当前query中的参数
    const { keyword } = this.$route.params; // 解构params参数
    return {
      // 搜索条件
      options: {
        // 定义options保存params的数据和query的数据,以及其他筛选条件的数据,当数据变化,就会刷新页面
        category1Id,
        category2Id,
        category3Id,
        categoryName,
        keyword,
        order: '',
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: '',
      },
    };
  },
  components: {
    SearchSelector,
  },
  computed: {
    ...mapGetters(['goodsList']), // getters拿到goodsList进行渲染
  },
  methods: {
    ...mapActions(['getGoodsList']), // 映射拿数据的方法
    search(newOptions = {}) {
      // 定义一个search方法,默认传递参数对象
      // category1Id=undefined不影响搜索
      /*
        如果是在当前页面更新params参数,参数不会立即更新,所以需要手动传过来
        有值就用,没有值就不用
      */
      const options = {
        ...this.options, // 解构原本的对象
        ...newOptions, // 解构新传入的对象,和原本对象重复的属性会被覆盖
      };
      this.options = options; // 将处理后的options赋值给老options
      // console.log(this.options); // 打印1
      this.options = this.getGoodsList(options);
      // this.getGoodsList(options);
      // this.options = []; // 其实直接赋值为空就行了,要保证你的options是会随筛选条件更新的(只需要传递的配置对象即可)
      /* 🍟🍟🍟
        1.每次search都会请求数据,即getGoodsList(options)
        2.请求goodsList之前,options是请求数据的参数对象
        3.请求goodsList之后,options是返回的promise对象
        4.每次search发送请求之前,都会将这次的options和传入的newOptions合并,每次发送出去的请求都是你行的newoptions
        5.所以点击手机之后点击合约机,会改变newOptions参数
      */
      // console.log(this.options); // 打印2
      /*
        第一次search:
          打印1是你合并之后的options对象,包含你的筛选条件
          打印2是this.getGoodList(options)的返回值,是一个promise对象
        第二次search:
          打印1是你添加了筛选条件之后的option对象
          打印2还是promise对象
      */
    },
    deleteItem(item) {
      // this.$route[p] = ''; // $route的params和route是只读的,不能直接改
      const { keyword, query } = this.$route; // 拿到现在的keyword和query
      const location = { name: 'Search' };
      if (keyword) {
        location.params = keyword;
      }
      if (query) {
        location.query = query;
      }
      console.log(location);
      location[item] = '';
      this.$router.history.push(location);
    },
    addItem(item) {
      // const { keyword, query } = this.$route; // 拿到现在的keyword和query
      // const location = { name: 'Search' };
      // if (keyword) {
      //   this.options.keyword = keyword;
      // }
      // if (query) {
      //   this.options.categoryName = query;
      // }
      // console.log(location);
      // this.$router.history.push(location);
      // this.search(location);

      this.options.keyword = item;
      // this.options = this.getGoodsList(this.options);//这里赋值是写错了
      this.getGoodsList(this.options);
      // this.options = []; // 最新消息,这里不能改为[],因为看了完整版本之后,这个组件基本上是最复杂的,想法基本和我一开始的意义
      // options保存当前的params参数,query参数,筛选参数,每通过props或者trademark品牌改变options,就发送一次数据,说白了options是基本盘
    },
  },
  watch: {
    $route: {
      // 监视路由属性的变化(如果页面params和query变化,$route就会变化[深度监视])
      handler(newVal) {
        // #route内部数据变化,触发handler函数
        this.search({
          ...newVal.query, // 解构路由变化后的query
          ...newVal.params, // 解构params
        });
        // search函数传入的是最新的$route查询字符串query和params
      },
      deep: true, // 深度监视:因为监视的不是$route而是监视的里面的params和query
      immediate: true, // 页面加载直接触发一次
    },
  },
  mounted() {
    // this.search()
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
