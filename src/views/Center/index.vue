<template>
  <div class="order-main">
    <div class="container">
      <div class="order-body">
        <!--左侧列表-->
        <div class="order-left">
          <dl>
            <dt><i>·</i> 订单中心</dt>
            <dd>我的订单</dd>
            <dd>团购订单</dd>
            <dd>本地生活订单</dd>
            <dd>我的预售</dd>
            <dd>评价晒单</dd>
            <dd>取消订单记录</dd>
          </dl>
          <dl>
            <dt><i>·</i> 关注中心</dt>
            <dd>关注的商品</dd>
            <dd>关注的店铺</dd>
            <dd>关注的专辑</dd>
            <dd>关注的品牌</dd>
            <dd>关注的活动</dd>
            <dd>浏览历史</dd>
          </dl>
          <dl>
            <dt><i>·</i> 特色业务</dt>
            <dd>我的营业厅</dd>
            <dd>京东通信</dd>
            <dd>定期送</dd>
            <dd>京东代下单</dd>
            <dd>我的回收单</dd>
            <dd>节能补贴</dd>
            <dd>医药服务</dd>
            <dd>流量加油站</dd>
            <dd>黄金托管</dd>
          </dl>
          <dl>
            <dt><i>·</i> 客户服务</dt>
            <dd>返修退换货</dd>
            <dd>价格保护</dd>
            <dd>意见建议</dd>
            <dd>购买咨询</dd>
            <dd>交易纠纷</dd>
            <dd>我的发票</dd>
          </dl>
          <dl>
            <dt><i>·</i> 设置</dt>
            <dd>个人信息</dd>
            <dd>收货地址</dd>
          </dl>
        </div>
        <!-- 右侧内容 -->
        <div class="order-right">
          <div class="order-content">
            <div class="title">
              <h3>我的订单</h3>
            </div>
            <div class="chosetype">
              <table>
                <thead>
                  <tr>
                    <th width="29%">商品</th>
                    <th width="31%">订单详情</th>
                    <th width="13%">收货人</th>
                    <th>金额</th>
                    <th>状态</th>
                    <th>操作</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div class="orders">
              <table
                class="order-item"
                v-for="order in orderList"
                :key="order.id"
              >
                <!--
                  {
                        id: 2193,
                        totalAmount: 37992,
                        orderStatus: "UNPAID",
                        userId: 2055,
                        paymentWay: "ONLINE",
                        deliveryAddress: null,
                        orderComment: "请尽快发货",
                        outTradeNo: "ATGUIGU1615943885524485",
                        tradeBody:
                          "Redmi 10X 4G 4GB+128GB 冰雾白 游戏智能手机 小米 红米 小米10 至尊纪念版 ",
                        createTime: "2021-03-17 09:18:06",
                        operateTime: null,
                        expireTime: "2021-03-18 09:18:06",
                        processStatus: "UNPAID",
                        trackingNo: null,
                        parentOrderId: null,
                        imgUrl: null,
                        provinceId: null,
                        activityReduceAmount: null,
                        couponAmount: null,
                        originalTotalAmount: null,
                        feightFee: null,
                        feightFeeReduce: null,
                        refundableTime: null,
                        orderDetailList: [
                          {
                            id: 4281,
                            orderId: 2193,
                            skuId: 3,
                            skuName:
                              "小米10 至尊纪念版 双 透明版 游戏手机",
                            imgUrl:
                              "http://47.93.148.1fo612.jpg",
                            orderPrice: 5999,
                            skuNum: 6,
                            createTime: "2021-03-17 09:18:06",
                            sourceType: "QUERY",
                            sourceId: 3,
                            splitTotalAmount: 35994,
                            splitActivityAmount: 0,
                            splitCouponAmount: 0,
                            refundStatus: "",
                            refundStatusString: "",
                            hasStock: null,
                            activityRule: null,
                            couponInfoList: null,
                          },
                          {
                            id: 4280,
                            orderId: 2193,
                            skuId: 4,
                            skuName:
                              "Redmi 1电量  游戏智能手机 小米 红米",
                            imgUrl:
                              "rBHu8l-rgJqAHPnoAAF9hoDNfsc505.jpg",
                            orderPrice: 999,
                            skuNum: 2,
                            createTime: "2021-03-17 09:18:06",
                            sourceType: "QUERY",
                            sourceId: 4,
                            splitTotalAmount: 1998,
                            splitActivityAmount: 0,
                            splitCouponAmount: 0,
                            refundStatus: "",
                            refundStatusString: "",
                            hasStock: null,
                            activityRule: null,
                            couponInfoList: null,
                          },
                        ],
                        orderDetailVoList: null,
                        orderStatusName: "未支付",
                        wareId: null,
                        couponInfo: null,
                      };

               -->
                <thead>
                  <tr>
                    <th colspan="5">
                      <span class="ordertitle"
                        >{{ order.createTime }} 订单编号：{{
                          order.outTradeNo
                        }}</span
                      >
                      <span class="pull-right delete">
                        <img src="./images/delete.png" />
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(orderDetail, index) in order.orderDetailList"
                    :key="orderDetail.id"
                  >
                    <td width="60%">
                      <div class="typographic">
                        <img
                          :style="{ width: '100px', height: '100px' }"
                          v-lazy="orderDetail.imgUrl"
                        />
                        <a class="block-text">{{ orderDetail.skuName }}</a>
                        <span>x{{ orderDetail.skuNum }}</span>
                        <a class="service">售后申请</a>
                      </div>
                    </td>
                    <!-- template空标签 -->
                    <template v-if="index === 0">
                      <td rowspan="2" width="8%" class="center">xxx</td>
                      <td rowspan="2" width="13%" class="center">
                        <ul class="unstyled">
                          <li>总金额¥{{ order.totalAmount }}</li>
                          <li>
                            {{
                              order.paymentWay === 'ONLINE'
                                ? '在线支付'
                                : 'xx支付'
                            }}
                          </li>
                        </ul>
                      </td>
                      <td rowspan="2" width="8%" class="center">
                        <a class="btn">{{ order.orderStatusName }} </a>
                      </td>
                      <td rowspan="2" width="13%" class="center">
                        <ul class="unstyled">
                          <li>
                            <a href="mycomment.html" target="_blank"
                              >评价|晒单</a
                            >
                          </li>
                        </ul>
                      </td>
                    </template>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="choose-order">
              <Pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                :page-sizes="[5, 10, 15, 20]"
                :total="total"
                :pager-count="7"
              />
            </div>
          </div>
          <!--猜你喜欢-->
          <div class="like">
            <h4 class="kt">猜你喜欢</h4>
            <ul class="like-list">
              <li class="likeItem">
                <div class="p-img">
                  <img src="./images/itemlike01.png" />
                </div>
                <div class="attr">
                  <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
                </div>
                <div class="price">
                  <em>¥</em>
                  <i>3699.00</i>
                </div>
                <div class="commit">已有6人评价</div>
              </li>
              <li class="likeItem">
                <div class="p-img">
                  <img src="./images/itemlike02.png" />
                </div>
                <div class="attr">Apple苹果iPhone 6s/6s Plus 16G 64G 128G</div>
                <div class="price">
                  <em>¥</em>
                  <i>4388.00</i>
                </div>
                <div class="commit">已有700人评价</div>
              </li>
              <li class="likeItem">
                <div class="p-img">
                  <img src="./images/itemlike03.png" />
                </div>
                <div class="attr">
                  DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
                </div>
                <div class="price">
                  <em>¥</em>
                  <i>4088.00</i>
                </div>
                <div class="commit">已有700人评价</div>
              </li>
              <li class="likeItem">
                <div class="p-img">
                  <img src="./images/itemlike04.png" />
                </div>
                <div class="attr">
                  DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
                </div>
                <div class="price">
                  <em>¥</em>
                  <i>4088.00</i>
                </div>
                <div class="commit">已有700人评价</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {reqGetOrderList} from '@/api/pay';

export default {
  name: 'Center',
  data() {
    return {
      orderList: [], // 保存订购商品数据
      currentPage: 1, // 保存当前是第几页
      pageSize: 5, // 保存每页显示几条数据
      total: 0, // 保存一共有多少数据
    };
  },
  methods: {
    // FN:点击切换页码
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getOrderList(this.currentPage, pageSize);
    },
    // FN:点击改变当前显示第几页
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getOrderList(currentPage, this.pageSize);
    },
    // FN:🍟获取orderList
    async getOrderList(currentPage, pageSize) {
      const response = await reqGetOrderList(currentPage, pageSize);
      this.orderList = response.records;
      this.total = response.total;
    },
  },
  mounted() {
    // 1.结构需要的参数
    const { currentPage, pageSize } = this;
    // 2.调用🍟获取orderList函数(FN来自methods)
    this.getOrderList(currentPage, pageSize);
  },
};
</script>

<style lang="less" scoped>
.order-main {
  .container {
    margin: 0 auto;
    width: 1200px;

    .order-body {
      padding: 10px;
      color: #333;

      &:after {
        content: '';
        display: block;
        clear: both;
      }

      //左边
      .order-left {
        float: left;
        width: 16.67%;

        dl {
          line-height: 28px;

          dt {
            font-weight: 700;
            padding: 5px;

            i {
              color: #77b72c;
            }
          }

          dd {
            margin: 0 0 6px;
            border-bottom: 1px solid #ededed;
            text-align: center;
          }
        }
      }

      //右边
      .order-right {
        float: right;
        width: 83.33%;

        //订单部分
        .order-content {
          margin: 0 20px;
          color: #666;

          //标题
          .title {
            margin-bottom: 22px;
            border: 1px solid #ddd;

            h3 {
              padding: 12px 10px;
              font-size: 15px;
              background-color: #f1f1f1;
            }
          }

          //表头
          .chosetype {
            margin-bottom: 15px;
            color: #666;

            table {
              border: 1px solid #e6e6e6;
              border-collapse: separate;
              border-radius: 2px;
              width: 100%;
              max-width: 100%;
              border-spacing: 0;

              th {
                padding: 6px 8px;
                color: #666;
                font-weight: 700;
                vertical-align: bottom;
                background-color: #f4f4f4;
                line-height: 18px;
                border-bottom: 1px solid #e6e6e6;
                font-size: 12px;
                text-align: left;
              }
            }
          }

          // 表单内容
          .orders {
            font-size: 12px;

            a {
              &:hover {
                color: #4cb9fc;
              }
            }

            table {
              border: 1px solid #e6e6e6;
              border-collapse: collapse;
              border-radius: 2px;
              width: 100%;
              margin-bottom: 18px;
              max-width: 100%;

              th {
                padding: 6px 8px;
                line-height: 18px;
                text-align: left;
                vertical-align: bottom;
                background-color: #f4f4f4;
                font-size: 12px;
                color: #666;

                .pull-right {
                  float: right;
                  cursor: pointer;

                  img {
                    margin-right: 10px;
                    vertical-align: middle;
                  }
                }
              }

              td {
                font-size: 12px;
                color: #666;
                padding: 6px 8px;
                line-height: 18px;
                text-align: left;
                vertical-align: middle;
                border: 1px solid #e6e6e6;

                &.center {
                  text-align: center;
                }

                .typographic {
                  img {
                    float: left;
                    margin-right: 10px;
                  }

                  a {
                    float: left;
                    min-width: 80px;
                    max-width: 250px;
                    color: #e1251b;

                    &.service {
                      color: #666;
                    }
                  }

                  span {
                    float: left;
                    min-width: 80px;
                    max-width: 250px;
                    text-align: center;
                  }
                }
              }
            }
          }

          // 分页
          .choose-order {
            .pagination {
              margin: 38px 0;

              ul {
                font-size: 0;
                display: inline-block;

                li {
                  display: inline-block;
                  padding: 4px 9px;
                  font-size: 14px;
                  border: 1px solid #e0e9ee;

                  &.prev,
                  &.next {
                    background-color: #fafafa;
                  }

                  &.prev {
                    border-right-color: #28a3ef;
                  }

                  &.page {
                    border-color: #28a3ef;
                    border-left: 0;

                    &.actived {
                      background-color: #28a3ef;

                      a {
                        color: #fff;
                      }
                    }
                  }
                }
              }

              div {
                display: inline-block;
                font-size: 14px;
                color: #333;
              }
            }
          }
        }

        // 猜你喜欢
        .like {
          border: 1px solid #ddd;
          margin: 15px 20px;

          .kt {
            border-bottom: 1px solid #ddd;
            background: #f1f1f1;
            color: #666;
            margin: 0;
            padding: 12px;
            font-size: 15px;
          }

          .like-list {
            padding: 15px 11px;
            overflow: hidden;

            .likeItem {
              width: 25%;
              float: left;

              .p-img {
                text-align: left;

                img {
                  width: 167px;
                  height: 123px;
                }
              }

              .attr {
                padding: 0 15px;
              }

              .price {
                padding: 0 15px;
                font-size: 16px;
                color: #c81623;
                margin-bottom: 20px;
              }

              .commit {
                padding: 0 15px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
