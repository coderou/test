/* eslint-disable import/prefer-default-export */
/*
包含所有接口请求函数的模块
*/
import ajax from './ajax';

// 获取商品的三级分类列表

export const reqBaseCategoryList = () => ajax.get('/product/getBaseCategoryList');
