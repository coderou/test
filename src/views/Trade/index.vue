<template>
  <div class="trade-container">
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">收件人信息</h5>
      <div
        class="address clearFix"
        v-for="userAddress in userAddressList"
        :key="userAddress.id"
        @click="selectAddress(userAddress.id)"
      >
        <span :class="{ username: true, selected: userAddress.isChecked }">{{
          userAddress.name
        }}</span>
        <p>
          <span class="s1">{{ userAddress.address }}</span>
          <span class="s2">{{ userAddress.phone }}</span>
          <span class="s3" v-if="userAddress.isDefault">默认地址</span>
        </p>
      </div>
      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span class="username selected">在线支付</span>
        <span class="username" style="margin-left: 5px">货到付款</span>
      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1">天天快递</span>
          <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
        </div>
      </div>
      <div class="detail">
        <h5>商品清单</h5>
        <ul class="list clearFix" v-for="detail in detailList" :key="detail.id">
          <li>
            <img
              :src="detail.imgUrl"
              alt="商品图片"
              :style="{ width: '100px', height: '100px' }"
            />
          </li>
          <li>
            <p>
              {{ detail.skuName }}
            </p>
            <h4>7天无理由退货</h4>
          </li>
          <li>
            <h3>￥{{ detail.orderPrice }}</h3>
          </li>
          <li>X{{ detail.skuNum }}</li>
          <li>有货</li>
        </ul>
      </div>
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea
          placeholder="建议留言前先与商家沟通确认"
          class="remarks-cont"
        ></textarea>
      </div>
      <div class="line"></div>
      <div class="bill">
        <h5>发票信息：</h5>
        <div>普通发票（电子） 个人 明细</div>
        <h5>使用优惠/抵用</h5>
      </div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b
            ><i>{{ totalNum }}</i
            >件商品，总商品金额</b
          >
          <span>¥{{ totalAmount }}</span>
        </li>
        <li>
          <b>返现：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>运费：</b>
          <span>0.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">
        应付金额:<span>¥{{ totalAmount }}</span>
      </div>
      <div class="receiveInfo">
        寄送至:
        <!-- 通过计算属性得到的实时选择地址 -->
        <span>{{ address.address }}</span>
        收货人：<span>{{ address.name }}</span>
        <span>{{ address.phone }}</span>
      </div>
    </div>
    <div class="sub clearFix">
      <!-- <router-link class="subBtn" to="/trade">提交订单</router-link> -->
      <button class="subBtn" @click="submitOrder">提交订单</button>
    </div>
  </div>
</template>

<script>
// 导入{请求订单数据函数,提交订单函数}
import { reqGetOrder, reqSubmitOrder } from '@/api/pay.js';

export default {
  name: 'Trade',
  data() {
    return {
      detailList: [], // 商品详情数据
      totalAmount: 0, // 商品总金额
      totalNum: 0, // 商品总数量
      tradeNo: '', // 购物车订单编号
      userAddressList: [], // 用户收货地址
      orderComment: '', // 订单备注
    };
  },
  async mounted() {
    // 1.拿到订单数据
    const res = await reqGetOrder();
    // console.log(res);
    // 2.初始化数据
    this.detailList = res.detailArrayList; // 商品详情列表
    this.totalAmount = res.totalAmount;
    this.totalNum = res.totalNum; // 总数
    this.tradeNo = res.tradeNo; // 订单编号
    this.userAddressList = res.userAddressList || [
      {
        id: 1, // 编号(用于遍历)
        name: '沛华', // 收货人
        address: '草围爱情公寓', // 地址
        phone: '13800000000', // 电话号码
        isChecked: true, // 用户选中
        isDefault: true, // 默认值
      },
      {
        id: 2,
        name: '静哥',
        address: '草围单身公寓',
        phone: '13811111111',
        isChecked: false,
        isDefault: false,
      },
      {
        id: 3,
        name: '雷哥',
        address: '草围老年公寓',
        phone: '13822222222',
        isChecked: false,
        isDefault: false,
      },
    ];
  },
  computed: {
    // COM:当前选中是哪个地址
    address() {
      // 找到那个isChecked为true的地址,或者为空(一上来会报错,赋值空以解决)
      return this.userAddressList.find((address) => address.isChecked) || {};
    },
  },
  methods: {
    // FN:选择收货地址的函数
    selectAddress(id) {
      this.userAddressList.forEach((userAddress) => {
        // 遍历所有用户地址,判断是当前点选的地址,更改isChecked
        if (userAddress.id === id) {
          userAddress.isChecked = true;
          return;
        }
        // 如果不是,改为false
        userAddress.isChecked = false;
      });
    },
    // FN:🍟🍟🍟提交订单的函数
    async submitOrder() {
      // 1.从this中获取数据
      const {
        tradeNo, // 订单编号
        orderComment, // 备注
        detailList: orderDetailList, // 商品列表
        totalAmount, // 总价(通过路由传递给pay.vue)
      } = this;
      // 2.从计算属性中拿数据(拿到的同时重命名)
      const {
        name: consigne, // 收货人
        phone: consigneeTel, // 收货人电话号码
        address: deliveryAddress, // 收货人地址
      } = this.address;
      // 3.支付方式目前只支持线上
      const paymentWay = 'ONLINE'; // 目前只支持线上
      // 4.发送请求,orderId:订单编号(通过路由传递给pay.vue)
      const orderId = await reqSubmitOrder({
        tradeNo,
        orderComment,
        deliveryAddress,
        paymentWay,
        orderDetailList,
        consigne,
        consigneeTel,
      });
      // 5.请求成功,跳转到pay.vue,路由query携带id和总价
      this.$router.history.push({
        name: 'Pay',
        query: {
          orderId,
          totalAmount,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.trade-container {
  .title {
    width: 1200px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 21px;
  }

  .content {
    width: 1200px;
    margin: 10px auto 0;
    border: 1px solid rgb(221, 221, 221);
    padding: 25px;
    box-sizing: border-box;

    .receive,
    .pay {
      line-height: 36px;
      margin: 18px 0;
    }

    .address {
      padding-left: 20px;
      margin-bottom: 15px;

      .username {
        float: left;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ddd;
        position: relative;
      }

      .username::after {
        content: '';
        display: none;
        width: 13px;
        height: 13px;
        position: absolute;
        right: 0;
        bottom: 0;
        background: url(./images/choosed.png) no-repeat;
      }

      .username.selected {
        border-color: #e1251b;
      }

      .username.selected::after {
        display: block;
      }

      p {
        width: 610px;
        float: left;
        line-height: 30px;
        margin-left: 10px;
        padding-left: 5px;
        cursor: pointer;

        .s1 {
          float: left;
        }

        .s2 {
          float: left;
          margin: 0 5px;
        }

        .s3 {
          float: left;
          width: 56px;
          height: 24px;
          line-height: 24px;
          margin-left: 10px;
          background-color: #878787;
          color: #fff;
          margin-top: 3px;
          text-align: center;
        }
      }

      p:hover {
        background-color: #ddd;
      }
    }

    .line {
      height: 1px;
      background-color: #ddd;
    }

    .way {
      width: 1080px;
      height: 110px;
      background: #f4f4f4;
      padding: 15px;
      margin: 0 auto;

      h5 {
        line-height: 50px;
      }

      .info {
        margin-top: 20px;

        .s1 {
          float: left;
          border: 1px solid #ddd;
          width: 120px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin-right: 10px;
        }

        p {
          line-height: 30px;
        }
      }
    }

    .detail {
      width: 1080px;

      background: #feedef;
      padding: 15px;
      margin: 2px auto 0;

      h5 {
        line-height: 50px;
      }

      .list {
        display: flex;
        justify-content: space-between;

        li {
          line-height: 30px;

          p {
            margin-bottom: 20px;
          }

          h4 {
            color: #c81623;
            font-weight: 400;
          }

          h3 {
            color: #e12228;
          }
        }
      }
    }

    .bbs {
      margin-bottom: 15px;

      h5 {
        line-height: 50px;
      }

      textarea {
        width: 100%;
        border-color: #e4e2e2;
        line-height: 1.8;
        outline: none;
        resize: none;
      }
    }

    .bill {
      h5 {
        line-height: 50px;
      }

      div {
        padding-left: 15px;
      }
    }
  }

  .money {
    width: 1200px;
    margin: 20px auto;

    ul {
      width: 220px;
      float: right;

      li {
        line-height: 30px;
        display: flex;
        justify-content: space-between;

        i {
          color: red;
        }
      }
    }
  }

  .trade {
    box-sizing: border-box;
    width: 1200px;
    padding: 10px;
    margin: 10px auto;
    text-align: right;
    background-color: #f4f4f4;
    border: 1px solid #ddd;

    div {
      line-height: 30px;
    }

    .price span {
      color: #e12228;
      font-weight: 700;
      font-size: 14px;
    }

    .receiveInfo {
      color: #999;
    }
  }

  .sub {
    width: 1200px;
    margin: 0 auto 10px;

    .subBtn {
      float: right;
      width: 164px;
      height: 56px;
      font: 700 18px '微软雅黑';
      line-height: 56px;
      text-align: center;
      color: #fff;
      background-color: #e1251b;
    }
  }
}
</style>
