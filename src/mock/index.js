// eslint-disable-next-line import/no-extraneous-dependencies
import Mock from 'mockjs';
import banners from './banners.json';
import floors from './floors.json';

Mock.mock('/mock/banners', {
  code: 200,
  data: banners,
});

Mock.mock('/mock/floors', 'get', {
  code: 200,
  data: floors,
});
