/* eslint-disable import/prefer-default-export */
/*
包含所有接口请求函数的模块
封装请求的接口函数
*/
import ajax from './ajax';
import request from './request';
// 获取商品的三级分类列表

export const reqBaseCategoryList = () => {
  ajax.get('/product/getBaseCategoryList');
};

export function getBaseCategoryList() {
  return request({
    method: 'GET',
    url: '/product/getBaseCategoryList',
  });
}

/**
 * 请求上级分类列表数据
 */
/* export const getBaseCategoryList = () =>
  request({
    method: 'GET',
    url: '/product/getBaseCategoryList',
  }); */
