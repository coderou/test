// eslint-disable-next-line import/no-extraneous-dependencies
import Mock from 'mockjs';
import banners from './banners.json';

Mock.mock('/mock/banners', {
  code: 200,
  data: banners,
});
