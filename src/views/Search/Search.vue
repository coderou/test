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
              v-show="options.categoryName"
              @click="delCategory"
            >
              {{ options.categoryName }}~~~X
            </li>
            <li class="with-x" v-show="options.keyword" @click="delKeyword">
              {{ options.keyword }}~~~X
            </li>
            <li class="with-x" v-show="options.trademark" @click="delTrademark">
              {{ options.trademark.split(':')[1] }}~~~X
            </li>
            <!-- 不需要v-show了,因为有v-for,没有数据就自然不会展示 -->
            <li
              class="with-x"
              v-for="prop in props"
              :key="prop[0]"
              @click="delProps(prop[0])"
            >
              <!-- 当插值语法比较长比较复杂的时候,建议通过计算属性简写 -->
              {{ `${prop[2]}:${prop[1]}` }}~~~X
            </li>
          </ul>
        </div>
        <!--selector-->
        <SearchSelector :search="search" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li
                  :class="{ active: order[0] === '1' }"
                  @click="setOrder('1')"
                >
                  <a
                    >综合
                    <span
                      v-show="order[0] === '1'"
                      :class="{
                        iconfont: true,
                        'icon-direction-down': order[1] === 'desc',
                        'icon-direction-up': order[1] === 'asc',
                      }"
                    ></span>
                  </a>
                </li>
                <li>
                  <a>销量</a>
                </li>
                <li>
                  <a>新品</a>
                </li>
                <li>
                  <a>评价</a>
                </li>
                <li
                  :class="{ active: order[0] === '2' }"
                  @click="setOrder('2')"
                >
                  <a
                    >价格<span
                      v-show="order[0] === '2'"
                      :class="{
                        iconfont: true,
                        'icon-direction-down': order[1] === 'desc',
                        'icon-direction-up': order[1] === 'asc',
                      }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- :to="{path:'/Detail/',params:{skuId:goods.id},}" -->
                    <router-link :to="`/detail/${goods.id}`" target="_blank"
                      ><img :src="goods.defaultImg"
                    /></router-link>
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
            <!-- <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="options.pageNo"
              :page-size="options.pageSize"
              :page-sizes="[5, 10, 15, 20]"
              layout="prev,pager,next,sizes,total"
              :total="total"
            ></el-pagination> -->

            <Patination
              :current-page="1"
              :page-size="options.pageSize"
              :total="1"
              :page-count="7"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Patination from '@/components/Pagination';
import SearchSelector from './SearchSelector/SearchSelector';

export default {
  name: 'Search',
  data() {
    // const {
    //   category1Id,
    //   category2Id,
    //   category3Id,
    //   categoryName,
    // } = this.$route.query; // 解构当前query中的参数
    // const { keyword } = this.$route.params; // 解构params参数
    return {
      // 搜索条件
      options: {
        // 定义options保存params的数据和query的数据,以及其他筛选条件的数据,当数据变化,就会刷新页面
        category1Id: '',
        category2Id: '',
        category3Id: '',
        categoryName: '',
        keyword: '',
        order: '1:desc',
        pageNo: 1, // 当前页面
        pageSize: 5, // 每页条数
        props: [],
        trademark: '',
      },
    };
  },
  components: {
    SearchSelector,
    Patination,
  },
  computed: {
    ...mapGetters(['goodsList', 'total']),
    order() {
      return this.options.order.split(':');
    },
    props() {
      return this.options.props.map((prop) => prop.split(':'));
    },
  },
  methods: {
    ...mapActions(['getGoodsList']),
    // element:改变当前是第几页
    handleCurrentChange(currentPage) {
      this.options.pageNo = currentPage;
      this.search();
    },
    // element:改变当前显示几页
    handleSizeChange(pageSize) {
      this.options.pageSize = pageSize;
      this.search();
    },
    setOrder(order) {
      /*
        当从综合切换到价格时,默认是降序,反之也是,
      */
      const orderArr = this.options.order.split(':');
      let orderType;
      if (order === orderArr[0]) {
        orderType = orderArr[1] === 'desc' ? 'asc' : 'desc';
      } else {
        orderType = 'desc';
      }
      this.options.order = `${order}:${orderType}`;
      this.search();
    },
    delCategory() {
      /* this.options.category1Id = '';
      this.options.category2Id = '';
      this.options.category3Id = '';
      this.options.categoryName = '';
      this.search(); */

      // 地址改变,触发监视属性
      this.$router.history.push({
        name: 'Search',
        params: this.$route.params,
      });
    },
    delKeyword() {
      this.$router.history.push({
        name: 'Search',
        query: this.$route.query,
      });
    },
    delTrademark() {
      this.options.trademark = '';
      this.search();
    },
    delProps(id) {
      this.options.props = this.options.props.filter(
        (p) => p.indexOf(id) === -1,
      );
      this.search();
    },
    getProductList() {
      this.getGoodsList(this.options);
    },
    search(newOptions = {}) {
      // if (newOptions.props) {
      //   this.options.props.push(newOptions.props);
      //   delete newOptions.props;
      // }
      const { props } = this.options;
      const newProps = newOptions.props;
      // 判断新添加的props是否已经存在了
      if (newOptions.props) {
        // 之前保存过,return
        if (props.indexOf(newProps) !== -1) return;
        // 要添加props,且props之前没有添加过
        props.push(newProps);
      }

      const options = {
        ...this.options,
        ...newOptions,
        // [之前的值,新值(可能为空)].filter(Boolean)过滤掉undefined
        props,
        // props: [...this.options.props, newOptions.props].filter(Boolean),
        // 简写:props: [...this.options.props, newOptions.props].filter((item)=>{
        //   return Boolean(item);
        // }),
      };

      this.options = options;
      this.getGoodsList(options);
    },
    deleteItem(item) {
      /* delete this.options.categoryName;
      delete this.options.category3Id; // category3Id也要改
      delete this.options.category2Id; // category2Id也要改
      delete this.options.category1Id; // category1Id也要改
      this.getGoodsList(this.options); */

      /* const { keyword, query } = this.$route; // 拿到现在的keyword和query
      const location = { name: 'Search' };
      if (keyword) {
        location.params = keyword;
      }
      if (query) {
        location.query = query;
      }
      delete location.query[item];
      this.$router.history.push(location);

      this.$router.history.replace({ name: 'Search' }); */
      if (item === 'keyword') {
        delete this.options[item];
        this.getProductList(this.options);
        return;
      }
      delete this.options.category3Id; // category3Id也要改
      delete this.options.category2Id; // category2Id也要改
      delete this.options.category1Id;
      delete this.options[item];
      this.getProductList(this.options);
    },
    addBrand(item) {
      this.options.trademark = `${item.tmId}:${item.tmName}`;
      this.getProductList();
    },
    deleteBrand() {
      this.options.trademark = '';
      this.getProductList();
    },
  },
  watch: {
    // 监视地址的变化(params\query)
    $route: {
      handler(newVal) {
        const {
          category1Id,
          category2Id,
          category3Id,
          categoryName,
        } = newVal.query;
        const { keyword } = newVal.params;
        this.search({
          category1Id,
          category2Id,
          category3Id,
          categoryName,
          keyword,
        });
      },
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
        // width: 733px;
        height: 66px;
        overflow: hidden;
        // float: right;
        display: flex;
        justify-content: center;

        // .sui-pagination {
        //   margin: 18px 0;

        //   ul {
        //     margin-left: 0;
        //     margin-bottom: 0;
        //     vertical-align: middle;
        //     width: 490px;
        //     float: left;

        //     li {
        //       line-height: 18px;
        //       display: inline-block;

        //       a {
        //         position: relative;
        //         float: left;
        //         line-height: 18px;
        //         text-decoration: none;
        //         background-color: #fff;
        //         border: 1px solid #e0e9ee;
        //         margin-left: -1px;
        //         font-size: 14px;
        //         padding: 9px 18px;
        //         color: #333;
        //       }

        //       &.active {
        //         a {
        //           background-color: #fff;
        //           color: #e1251b;
        //           border-color: #fff;
        //           cursor: default;
        //         }
        //       }

        //       &.prev {
        //         a {
        //           background-color: #fafafa;
        //         }
        //       }

        //       &.disabled {
        //         a {
        //           color: #999;
        //           cursor: default;
        //         }
        //       }

        //       &.dotted {
        //         span {
        //           margin-left: -1px;
        //           position: relative;
        //           float: left;
        //           line-height: 18px;
        //           text-decoration: none;
        //           background-color: #fff;
        //           font-size: 14px;
        //           border: 0;
        //           padding: 9px 18px;
        //           color: #333;
        //         }
        //       }

        //       &.next {
        //         a {
        //           background-color: #fafafa;
        //         }
        //       }
        //     }
        //   }

        //   div {
        //     color: #333;
        //     font-size: 14px;
        //     float: right;
        //     width: 241px;
        //   }
        // }
      }
    }
  }
}
</style>
