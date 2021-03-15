import request from './request';

const PREFIX_URL = '/cart';

/*
获取购物车列表
*/
export const reqGetCartList = () =>
  request({
    method: 'GET',
    url: `${PREFIX_URL}cartList`,
  });
/*
添加购物车
*/
export const reqAddCartList = (skuId, skuNum) =>
  request({
    method: 'GET',
    url: `${PREFIX_URL}addToCart/${skuId}/${skuNum}`,
  });
/*
更新商品选中状态
*/
export const reqUpdateCartList = (skuId, isChecked) =>
  request({
    // 这里是修改,理论上应该是POST
    method: 'GET',
    url: `${PREFIX_URL}checkCart/${skuId}/${isChecked}`,
  });
/*
删除商品
*/
export const reqDeleteCartList = (skuId) =>
  request({
    // 这里是修改,理论上应该是POST
    method: 'DELETE',
    url: `${PREFIX_URL}deleteCart/${skuId}`,
  });
