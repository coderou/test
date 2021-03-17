import request from "./request";

// 1.获取所有订单列表
export const reqGetOrderList = (page, limit) =>
  request({
    method: "GET",
    url: `/order/auth/${page}/${limit}`,
  });

// 2.获取当前用户的订单信息
export const reqGetOrder = () =>
  request({
    method: "GET",
    url: `/order/auth/trade`,
  });

// 3.提交订单
export const reqSubmitOrder = ({
  tradeNo,
  consigneeTel,
  orderDetailList,
  orderComment,
  deliveryAddress,
  paymentWay,
  consigne,
}) =>
  request({
    method: "POST",
    url: `/order/auth/submitOrder`,
    params: { tradeNo }, // query参数
    data: {
      consigne, // 收件人姓名
      consigneeTel, // 收件人电话
      deliveryAddress, // 收件地址
      paymentWay, // 支付方式 (ONLINE代表在线)
      orderComment, // 订单备注
      orderDetailList, // 存储多个商品对象的数组
    },
  });

// 4.获取订单的支付信息
export const reqGetPayInfo = (orderId) =>
  request({
    method: "GET",
    url: `/payment/weixin/createNative/${orderId}`, // 支付订单ID (通过提交订单得到)
  });

// 5.查询的支付状态
export const reqGetPayStatus = (orderId) =>
  request({
    method: "GET",
    url: `payment/weixin/queryPayStatus/${orderId}`, // 支付订单ID (通过提交订单得到)
  });
