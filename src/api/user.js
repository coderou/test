import request from './request';
// 1.发送注册验证码
export const reqSendCode = (phone) =>
  request({
    method: 'GET',
    url: `/user/passport/sendCode/${phone}`,
  });
// 2.注册
export const reqRegister = ({ phone, password, code }) =>
  request({
    method: 'POST',
    url: '/user/passport/register',
    data: { phone, password, code },
  });
// 3.登录
export const reqLogin = ({ phone, password }) =>
  request({
    method: 'POST',
    url: `/user/passport/login`,
    data: { phone, password },
  });
// 4.登出
export const reqLogout = () =>
  request({
    method: 'GET',
    url: `/user/passport/logout`,
  });
