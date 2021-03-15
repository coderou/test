import { v4 as uuidv4 } from 'uuid';

/* 步骤分析
  userTempId 用户未登录的凭据
  token      用户已登录的凭据

  用户未登录时，购物车功能由 userTempId 负责保存
  用户已登录时，购物车功能由 token 负责保存

  当用户由未登录切换到已登录时，
    此时发送请求需要携带上两个userTempId、token
    目的：为了将 userTempId 中的购物车数据添加到 token 中保存
    后续 userTempId 这个参数就可有可以无
*/

// tip:永久存储的localStorage比较慢,如果每次都要使用,就比较慢,所以将uuid保存到内存中,拿id从内存拿
// tip:代码存储的内容都是内存储存:读写速度快
// localStorage是硬盘存储:读写速度比内存慢
let uuid = window.localStorage.getItem('uuid');

export default function getUuid() {
  // 1.如果之前保存过,就用之前的
  if (uuid) return uuid;
  // 2.如果没有就产生一个新的
  uuid = uuidv4();
  window.localStorage.setItem('uuid', uuid);
  return uuid;
}
