/*
  封装axios:
    1.设置请求地址前缀和超事件
      axios.create

    2.设置公共请求头 token
      请求拦截器
    3.设置功能成功时得到具体的数据
      功能失败得到错误的具体原因
    4.设置进度条
    5.处理跨域
*/
// eslint-disable-next-line import/no-cycle
import store from '@/store';
import axios from 'axios';
import NProgress from 'nprogress'; // 引入JS
import 'nprogress/nprogress.css'; // 引入css
import getUuid from '@/utils/uuid';

const errorMessages = {
  401: '未授权',
  403: '进制访问',
  404: '资源找不到,请检查地址',
  500: '服务器错误',
};

const request = axios.create({
  baseURL: '/api', // 🤣🤣🤣/ 就是当前服务器地址(代理服务器)
  timeout: 100000,
});

request.interceptors.request.use((config) => {
  NProgress.start();
  // 设置公共请求数据
  config.headers.userTempId = getUuid();// ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
  const { token } = store.state.user.user;
  if (token) {
    config.headers.token = token;
  }
  return config;
});

request.interceptors.response.use(
  (response) => {
    NProgress.done(); // 关闭进度条
    // 请求成功-->响应状态码 200-299
    // 判断功能是否成功
    if (response.data.code === 200) {
      // 功能成功
      // 返回具体的数据
      return response.data.data;
    }
    // 功能失败
    // 返回具体的错误原因
    return Promise.reject(response.data.message || '未知错误');
  },
  (error) => {
    NProgress.done(); // 关闭进度条
    // 请求失败

    // 如果响应回来了,就会有error.response,反之则没有  --> 401 403 404 500
    // 如果没有回来-->断网,请求超市
    if (error.response) {
      return Promise.reject(errorMessages[error.response.status]);
    }
    if (error.message.indexOf('Network Error') !== -1) {
      return Promise.reject(new Error('网络连接失败.请链接网络或打开wifi重试'));
    }
    if (error.message.indexOf('timeout') !== -1) {
      return Promise.reject(new Error('网速太慢了,请链接wifi重试'));
    }
    return Promise.reject(new Error('未知错误,请联系管理员解决'));
  },
);

export default request;
