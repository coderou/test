<template>
  <div class="pagination">
    <button @click="changeMyCurrentPage(-1)">←</button>
    <button>1</button>
    <button v-show="startEnd.start > 2">...</button>

    <!-- <button v-for="num in 10" :key="num">{{num}}</button> -->
    <!-- <template v-if="startEnd.end - startEnd.start > 0"> -->
    <button
      class="active"
      v-for="num in middleBtnCount"
      :key="num"
      @click="clickChange(num + startEnd.start - 1)"
    >
      {{ num + startEnd.start - 1 }}
    </button>
    <!-- </template> -->

    <button v-show="startEnd.end < totalPage-1">...</button>
    <button>{{ totalPage }}</button>
    <button @click="changeMyCurrentPage(1)">→</button>
    <span class="pagination-total">总数:{{ total }}</span>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Pagination',
  data() {
    return {
      // 目的:props是只读的
      myCurrentPage: this.currentPage,
    };
  },
  props: {
    'current-page': {
      // 定义属性时 a-b 命名，使用的时候可以使用小驼峰 aB
      // 当前页码
      type: Number,
      default: 1,
    },
    // 每页条数
    'page-size': {
      type: Number,
      default: 5,
    },
    // 总数
    total: {
      type: Number,
      default: 0,
    },
    // 显示多少个按钮
    'page-count': {
      type: Number,
      default: 7,
      validator(val) {
        return val >= 5 && val <= 21 && val % 2 === 1;
      },
    },
  },
  methods: {
    changeMyCurrentPage(num) {
      if (num === 1) {
        if (this.myCurrentPage >= this.totalPage) return;
        this.myCurrentPage += 1;
      } else {
        if (this.myCurrentPage <= 1) return;
        this.myCurrentPage -= 1;
      }
    },
    clickChange(num) {
      this.myCurrentPage = num;
    },
  },
  computed: {
    // 中间显示按钮的数量
    middleBtnCount() {
      const num = this.startEnd.end - this.startEnd.start + 1;
      return num < 0 ? 0 : num;
    },
    // 总页数(total/每页条数)
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算中间按钮 -开始到结束坐标
    startEnd() {
      const { pageCount, myCurrentPage, totalPage } = this;
      console.log(pageCount, myCurrentPage, totalPage);
      if (totalPage <= pageCount) {
        const start = 2;
        const end = totalPage - 1;
        return { start, end };
      }

      const middleBtnCount = pageCount - 2;
      const halfMiddleBtnCount = Math.floor(middleBtnCount / 2);

      let start = myCurrentPage - halfMiddleBtnCount;

      if (start < 2) { start = 2; }
      let end = start + middleBtnCount - 1;

      if (end >= totalPage) {
        end = totalPage - 1;
        start = end - middleBtnCount + 1;
      }
      return {
        start,
        end,
      };
    },
    startEnd1() {
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

      // //特殊情况1
      // if (this.currentPage <= halfMiddleBtnCount + 1) {
      //   start = 2;
      // }
      // 滑块思想:左顶点
      if (start < 2) {
        start = 2;
      }

      // 计算end
      let end = start + middleBtnCount - 1;

      // // 特殊情况2
      // if (this.currentPage >= this.totalPage - halfMiddleBtnCount) {
      //   end = this.totalPage - 1;
      //   start = end - 5 + 1; // 这里不应该减 5，应该使用 middleBtnCount
      // }

      if (end >= this.totalPage) {
        end = this.total - 1; // 修正end
        start = end - middleBtnCount + 1; // 修正start
      }

      // 特殊情况3
      if (this.totalPage <= this.pageCount) {
        start = 2;
        end = this.totalPage - 1;
      }
      // 特殊情况4
      if (this.pageCount === 1) {
        start = 1;
        end = 1;
      }

      // 函数返回
      return { start, end };
    },
  },
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
