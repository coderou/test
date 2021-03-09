<template>
  <div>
    Search
    <div>搜索关键字(搜索框过来的): {{ $route.params.keyword }}</div>
    <div>搜索关键字(导航过来的): {{ $route.query }}</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Search',
};
</script>

<style lang="less" scoped></style>
