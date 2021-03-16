<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmit)">
          <ValidationProvider
            class="content"
            name="phone"
            rules="required|phone"
            v-slot="{ errors }"
            tag="div"
            mode="eager"
          >
            <label>手机号:</label>
            <input v-model="phone" type="text" placeholder="请输入你的手机号" />
            <span class="error-msg">{{ errors[0] }}</span>
          </ValidationProvider>
          <ValidationProvider
            class="content"
            name="code"
            rules="required|code"
            v-slot="{ errors }"
            tag="div"
            mode="eager"
          >
            <label>验证码:</label>
            <input v-model="code" type="text" placeholder="请输入验证码" />
            <img
              ref="code"
              src="http://39.98.123.211/api/user/passport/code"
              alt="code"
            />
            <span class="error-msg">{{ errors[0] }}</span>
          </ValidationProvider>
          <ValidationProvider
            class="content"
            name="password"
            rules="required|password"
            v-slot="{ errors }"
            tag="div"
            mode="eager"
          >
            <label>登录密码:</label>
            <input
              v-model="password"
              type="text"
              placeholder="请输入你的登录密码"
            />
            <span class="error-msg">{{ errors[0] }}</span>
          </ValidationProvider>
          <ValidationProvider
            class="content"
            name="rePassword"
            :rules="`required|rePassword:${password}`"
            v-slot="{ errors }"
            tag="div"
            mode="eager"
          >
            <label>确认密码:</label>
            <input
              v-model="rePassword"
              type="text"
              placeholder="请输入确认密码"
            />
            <span class="error-msg">{{ errors[0] }}</span>
          </ValidationProvider>
          <ValidationProvider
            class="controls"
            name="isChecked"
            rules="isChecked"
            v-slot="{ errors }"
            tag="div"
            mode="eager"
          >
            <input v-model="isChecked" name="m1" type="checkbox" />
            <span>同意协议并注册《尚品汇用户协议》</span>
            <span class="error-msg">{{ errors[0] }}</span>
          </ValidationProvider>
          <div class="btn">
            <button>完成注册</button>
          </div>
        </form>
      </ValidationObserver>
    </div>
    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
import { extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

// 至少8个字符，至少1个大写字母，1个小写字母和1个数字：
// const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const phoneReg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
const codeReg = /^[0-9A-Za-z]{4}$/;

// 0.必填
extend('required', {
  ...required,
  message: '这是必填项',
});
// 1.校验勾选协议
extend('isChecked', {
  validate(value) {
    return value;
  },
  message: '请勾选XXX协议',
});
// 2.校验手机号
extend('phone', {
  validate(value) {
    if (phoneReg.test(value)) {
      return true;
    }
    return '输入的手机号不合法,请重新输入';
  },
  // message:'输入的手机号不合法,请重新输入',
});
// 3.校验验证码
extend('code', {
  validate(value) {
    if (value.length !== 4) {
      return '验证码长度为4位';
    }
    if (!codeReg.test(value)) {
      return '输入的验证码不合法,请重新输入';
    }
    return true;
  },
  // message:"xx"
});
// 4.校验密码
extend('password', {
  validate() {
    return true;
  },
});
// 5.校验再次输入密码
extend('rePassword', {
  validate(val, { password }) {
    if (val === password) return true;
    return '两次密码输入不一致';
  },
  // message:'xx'
  params: ['password'], // 声明参数的名称,相当于props
});

export default {
  name: 'Register',
  data() {
    return {
      phone: '',
      code: '',
      password: '',
      rePassword: '',
      isChecked: false,
    };
  },
  methods: {
    // 表单提交方法
    onSubmit() {
      console.log('表单提交');
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>
