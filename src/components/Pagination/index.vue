<template>
  <div class="pagination">
    <button>←</button>
    <button>1</button>
    <button>...</button>
    <button>3</button>
    <button>4</button>
    <button class="active">5</button>
    <button>6</button>
    <button>7</button>
    <button>...</button>
    <button>11</button>
    <button>→</button>
    <span class="pagination-total">总数:xxx</span>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  name: 'Pagination',
  props:{
    "current-page":{
      // 定义属性时 a-b 命名，使用的时候可以使用小驼峰 aB
      // 当前页码
      type: Number,
      default: 1,
    },
    // 每页条数
    "page-size": {
      type: Number,
      default: 5,
    },
    // 总数
    total: {
      type: Number,
      default: 0,
    },
    // 显示多少个按钮
    "page-count":{
      type:Number,
      default:7,
      validator(val){
        return val >= 5 && val <= 21 && val % 2 === 1;
      },
    },
  },
  computed:{
    // 总页数(total/每页条数)
    totalPage(){
      return Math.ceil(total / pageSize);
    },
    // 计算中间按钮 -开始到结束坐标
    startEnd(){
      /*
        需求:计算开始和结束坐标
        需要的数据:
          pageCount 显示所有带数字按钮的数量
          currentPage 当前页码
        计算start:
          结构分析:
            1 ... 3 4 [5] 6 7 ... 11
            [5] -- currentPage
          核心公式:
            start=currentPage-halfMiddleBtnCount
          特殊情况1:
            结构分析:
              [1] 2 3 4 5 6 ...11
              1 [2] 3 4 5 6 ...11
              1 2 [3] 4 5 6 ...11   --- 7 小于等于3
              1 2 3 4 5 6 7 8 ...11   --- 9 小于等于4
            规律:
              7 --> 3
              9 --> 4
              11 --> 5
            解决办法:
              1.(pageCount-1)/2
              2,halfMiddleBtnCount+1
          特殊情况2:
            结构分析:
              1...6 7 8 9 10 [11]
              1...6 7 8 9 [10] 11
              1...6 7 8 [9] 10 11       7\11 -> 9
              1...4 5 6 7 [8] 9 10 11   9\11 -> 8
            规律:
              totalPage-halfMiddleBtnCount
          特殊情况3:
            结构分析:
              1 [2] 3 4
          特殊情况4:
            结构分析:
              [1]
        计算End
          end=start+middleBtnCount-1
      */
      // 中间显示按钮的数量
      const middleBtnCount = this.pagerCount - 2;
      // 中间显示按钮的数量要减去的一半(中间显示区域开始是几)
      const halfMiddleBtnCount = Math.floor(middleBtnCount / 2);
      // 计算start
      let start = this.currentPage - halfMiddleBtnCount;
      /*
      特殊情况1
      */
      if (this.currentPage <= halfMiddleBtnCount + 1) {
        start = 2;
      }
      let end = start +middleBtnCount -1;
      /*
      特殊情况2
      */
      if (this.currentPage >= this.totalPage - halfMiddleBtnCount) {
        end = this.totalPage - 1;
        start = end - 5 + 1; // 这里不应该减 5，应该使用 middleBtnCount
      }
      /*
      特殊情况3
      */
      if (this.totalPage <= this.pageCount) {
        start = 2;
        end = this.totalPage - 1;
      }
      // 函数返回
      return {start,end}
    },
  }
};
</script>

<style lang="less" scoped>
.pagination {
  display: flex;
  align-items: center;
}
.pagination-total {
  font-size: 13px;
  margin-left: 10px;
  font-weight: 400;
  color: #606266;
}
button {
  margin: 0 5px;
  background-color: #f4f4f5;
  color: #606266;
  min-width: 30px;
  border-radius: 2px;
  outline: none;
  border: none;
  padding: 0 4px;
  display: inline-block;
  font-size: 13px;
  min-width: 35.5px;
  height: 28px;
  line-height: 28px;
  cursor: pointer;
  box-sizing: border-box;
  text-align: center;
}
.active {
  background-color: #409eff;
  color: #fff;
}
</style>
