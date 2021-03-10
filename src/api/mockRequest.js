import axios from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// 自定义错误信息
const errorMessages = {
  401: '未授权',
  403: '进制访问',
  404: '资源找不到,请检查地址',
  500: '服务器错误',
};
// 创建axios实例
const request = axios.create({
  baseURL: '/mock',
  timeout: 100000,
});
// 请求拦截器
request.interceptors.request.use((config) => {
  NProgress.start();
  return config;
});
// 响应拦截器
request.interceptors.response.use(
  (response) => {
    NProgress.done();
    if (response.data.code === 200) {
      return response.data.data;
    }
    return Promise.reject(response.data.message || '未知错误');
  },
  (error) => {
    NProgress.done();
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
