/* eslint-disable import/prefer-default-export */
/*
包含所有接口请求函数的模块
封装请求的接口函数
*/
import request from './request';
import mockRequest from './mockRequest';
// 获取商品的三级分类列表

export const reqGetBaseCategoryList = () =>
  request({
    method: 'GET',
    url: '/product/getBaseCategoryList',
  });
export const reqGetBanners = () =>
  mockRequest({
    method: 'GET',
    url: '/banners',
  });

export const reqGetFloors = () =>
  mockRequest({
    method: 'GET',
    url: '/floors',
  });
export const reqGetGoodsList = (data) =>
  request({
    method: 'POST',
    url: '/list',
    data,
  });
export const reqGetDetail = (id) =>
  request({
    method: 'GET',
    url: `/item/${id}`,
    // params,// 不是这么写的,params在这里axios中是查询字符串,不是路由参数
  });
