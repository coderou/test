<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info"
            >订单提交成功，请您及时付款，以便尽快为您发货~~</span
          >
        </h4>
        <div class="paymark">
          <span class="fl"
            >请您在提交订单<em class="orange time">4小时</em
            >之内完成支付，超时订单会自动取消。订单号：<em>{{
              $route.query.orderId
            }}</em></span
          >
          <span class="fr"
            ><em class="lead">应付金额：</em
            ><em class="orange money"
              >￥{{ $route.query.totalAmount }}</em
            ></span
          >
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>
            尚品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。
          </li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
          <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
        </ol>
        <h4>
          支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）
        </h4>
        <ul>
          <li>支付帐号：11111111</li>
          <li>密码：111111</li>
          <li>支付密码：111111</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="./images/pay2.jpg" /></li>
            <li><img src="./images/pay3.jpg" /></li>
          </ul>
        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg" /></li>
              <li><img src="./images/pay11.jpg" /></li>
              <li><img src="./images/pay12.jpg" /></li>
              <li><img src="./images/pay13.jpg" /></li>
              <li><img src="./images/pay14.jpg" /></li>
              <li><img src="./images/pay15.jpg" /></li>
              <li><img src="./images/pay16.jpg" /></li>
              <li><img src="./images/pay17.jpg" /></li>
              <li><img src="./images/pay18.jpg" /></li>
              <li><img src="./images/pay19.jpg" /></li>
              <li><img src="./images/pay20.jpg" /></li>
              <li><img src="./images/pay21.jpg" /></li>
              <li><img src="./images/pay22.jpg" /></li>
            </ul>
          </div>
        </div>
        <div class="hr"></div>
        <!-- 🍟🍟???,30%宽度,居中 -->
        <el-dialog :visible.sync="visible" width="30%" center>
          <div
            :style="{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }"
          >
            <!-- 图片通过QRCode插件生成 -->
            <img v-lazy="url" alt="QRCode" />
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="visible = false"
              >支付遇到问题</el-button
            >
            <el-button size="small" type="primary" @click="visible = false">
              我已支付成功
            </el-button>
          </span>
        </el-dialog>
        <div class="submit">
          <!-- 点击处理获取支付验证码 -->
          <button class="btn" @click="getQRCode">
            立即支付
          </button>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span><a href="weixinpay.html" target="_blank">微信支付</a></span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode';
// 请求支付信息,请求支付二维码地址
import { reqGetPayInfo, reqGetPayStatus } from '@/api/pay.js';

export default {
  name: 'Pay',
  data() {
    return {
      visible: false, // 对应按钮,默认不可点击
      url: '', // 对应二维码图片地址(拿到的地址是字符串,需要通过QRCode转化为二维码)
    };
  },
  // 组件守卫[如果pay从Trade跳转,不管,否则跳回Center(其实也可以用路由守卫)]
  beforeRouteEnter(to, from, next) {
    if (from.name === 'Trade') {
      next();
      return;
    }
    next({ name: 'Center' });
  },
  methods: {
    // FN:获取二维码,设置图片url,设置
    async getQRCode() {
      const res = await reqGetPayInfo(this.$route.query.orderId);
      // console.log(res); // 改订单需要的支付码等信息
      /*
        codeUrl: "weixin://wxpay/bizpayurl?pr=dbS0FPdzz"
        orderId: 2214
        resultCode: "SUCCESS"
        totalFee: 2598
      */
      const url = await QRCode.toDataURL(res.codeUrl);
      this.getOrderStatus(); // 调用FN:获取支付是否成功的函数
      this.url = url; // 设置二维码图片的地址
      this.visible = true; // 可以点击弹出框的按钮
    },
    // FN:获取支付是否成功的函数(每隔一段事件调用一次,确认支付结果,如果结果成功,跳转到paysuccess)
    getOrderStatus() {
      this.timeId = setInterval(async () => {
        // 支付成功,返回成功的promise
        // 支付中,会返回失败的promise
        // async函数特点:成功,向下执行,失败,直接退出async函数,不会向下执行
        await reqGetPayStatus(this.$route.query.orderId);
        // 支付成功,清空
        // clearInterval(this.timeId);
        this.$router.history.push('/paysuccess');
      }, 3000);
    },
  },
  beforeDestroy() {
    clearInterval(this.timeId);
  },
};
</script>

<style lang="less" scoped>
.pay-main {
  margin-bottom: 20px;

  .pay-container {
    margin: 0 auto;
    width: 1200px;

    a:hover {
      color: #4cb9fc;
    }

    .orange {
      color: #e1251b;
    }

    .money {
      font-size: 18px;
    }

    .zfb {
      color: #e1251b;
      font-weight: 700;
    }

    .checkout-tit {
      padding: 10px;

      .tit-txt {
        font-size: 14px;
        line-height: 21px;

        .success-icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          background: url(./images/icon.png) no-repeat 0 0;
        }

        .success-info {
          padding: 0 8px;
          line-height: 30px;
          vertical-align: top;
        }
      }

      .paymark {
        overflow: hidden;
        line-height: 26px;
        text-indent: 38px;

        .fl {
          float: left;
        }

        .fr {
          float: right;

          .lead {
            margin-bottom: 18px;
            font-size: 15px;
            font-weight: 400;
            line-height: 22.5px;
          }
        }
      }
    }

    .checkout-info {
      padding-left: 25px;
      padding-bottom: 15px;
      margin-bottom: 10px;
      border: 2px solid #e1251b;

      h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
        color: #e1251b;
      }

      ol {
        padding-left: 25px;
        list-style-type: decimal;
        line-height: 24px;
        font-size: 14px;
      }

      ul {
        padding-left: 25px;
        list-style-type: disc;
        line-height: 24px;
        font-size: 14px;
      }
    }

    .checkout-steps {
      border: 1px solid #ddd;
      padding: 25px;

      .hr {
        height: 1px;
        background-color: #ddd;
      }

      .step-tit {
        line-height: 36px;
        margin: 15px 0;
      }

      .step-cont {
        margin: 0 10px 12px 20px;

        ul {
          font-size: 0;

          li {
            margin: 2px;
            display: inline-block;
            padding: 5px 20px;
            border: 1px solid #ddd;
            cursor: pointer;
            line-height: 18px;
          }
        }
      }
    }

    .submit {
      text-align: center;

      .btn {
        display: inline-block;
        padding: 15px 45px;
        margin: 15px 0 10px;
        font: 18px '微软雅黑';
        font-weight: 700;
        border-radius: 0;
        background-color: #e1251b;
        border: 1px solid #e1251b;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
      }
    }
  }
}
</style>
