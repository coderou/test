<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <!--
          cartPrice:4188
          couponInfoList:null
          createTime:"2021-03-15 16:54:42"
          id:4794
          imgUrl:"http://47.93.148.192:8080/group1/M00/00/02/rBHu8l-sklaALrngAAHGDqdpFtU741.jpg"
          isChecked:1
          isOrdered:0
          operateTime:"2021-03-15 16:54:42"
          orderTime:null
          skuId:13
          skuName:"华为 HUAWEI P40 麒麟990 5G SoC芯片 5000万超感知徕卡三摄 30倍数字变焦 6GB+128GB亮黑色全网通5G手机"
          skuNum:1
          skuPrice:4188
          sourceId:13
          sourceType:"QUERY"
          userId:"c5a105eb-752f-4ab3-85e1-3d8080838930"
         -->
        <ul class="cart-list" v-for="cart in cartList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked"
              @change="handleChecked(cart.skuId, !cart.isChecked)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>
          <!-- <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li> -->
          <li class="cart-list-con4">
            <span class="price">{{ cart.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins">-</a>
            <input
              autocomplete="off"
              type="text"
              value="1"
              minnum="1"
              class="itxt"
            />
            <a href="javascript:void(0)" class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a
              href="#none"
              class="sindelet"
              @click.prevent="deleteCartList(cart.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          :checked="isCheckAll"
          @change="handleCheckALl(!isCheckAll)"
          type="checkbox"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click.prevent="handleDeletePart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ checkedNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  name: 'ShopCart',
  computed: {
    ...mapState({
      cartList: (state) => state.shopcart.cartList,
    }),
    ...mapGetters(['totalPrice', 'checkedNum', 'isCheckAll']),
  },
  methods: {
    ...mapActions([
      'getCartList',
      'updateCartList',
      'deleteCartList',
      'updateAllCartList',
      'deletePartCartList',
    ]),
    handleChecked(skuId, isChecked) {
      // isChecked 值为1或0
      // tip:直接取反是因为你要改变的就是现在的取反
      this.updateCartList({ skuId, isChecked: isChecked ? 1 : 0 });
    },
    handleCheckALl(isCheckAll) {
      const idArr = [];
      // 变量当前cartList的所有cart,如果cart.isChecked !== isCheckAll[目标修改值],说明需要修改
      this.cartList.forEach((cart) => {
        if (!!cart.isChecked !== isCheckAll) {
          idArr.push(cart.skuId);
        }
      });
      // tip:是0/1不是false/true
      isCheckAll = isCheckAll ? 1 : 0;
      this.updateAllCartList({ idArr, isCheckAll });
    },
    handleDeletePart() {
      const idArr = [];
      this.cartList.forEach((cart) => {
        if (cart.isChecked) {
          idArr.push(cart.skuId);
        }
      });
      this.deletePartCartList(idArr);
    },
  },
  mounted() {
    this.getCartList();
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 45%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 400px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        // .cart-list-con3 {
        //   width: 10.5%;

        //   .item-txt {
        //     text-align: center;
        //   }
        // }

        .cart-list-con4 {
          width: 10.5%;
        }

        .cart-list-con5 {
          width: 16.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
