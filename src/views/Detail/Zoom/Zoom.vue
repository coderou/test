<template>
  <div class="spec-preview">
    <!-- <img :src="skuImageList[0].imgUrl" /> -->
    <img :src="imgUrl" />
    <div ref="event" class="event" @mousemove="show"></div>
    <div ref="mask" class="mask"></div>

    <div class="big">
      <!-- <img ref="bigImg" :src="skuImageList[0].imgUrl" /> -->
      <img ref="bigImg" :src="bigUrl" />
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle';
import { mapGetters } from 'vuex';

export default {
  name: 'Zoom',
  data() {
    return {
      // 可以不初始化么?不行,因为添加的数据不是响应式的!
      imgUrl: '',
      bigUrl: '',
    };
  },
  computed: {
    ...mapGetters(['skuImageList']),
  },
  methods: {
    show: throttle(function (e) {
      const { mask, bigImg } = this.$refs;
      /*
        offsetX:e事件距离该元素边缘的位置
      */
      const maskY = e.offsetY - mask.clientWidth / 2;
      const maskX = e.offsetX - mask.clientHeight / 2;
      // 滑块位置
      const maskPosition = {
        x: maskX,
        y: maskY,
      };
      if (maskPosition.x <= 0) maskPosition.x = 0;
      if (maskPosition.y <= 0) maskPosition.y = 0;
      if (maskPosition.x >= 200)maskPosition.x = 200;
      if (maskPosition.y >= 200)maskPosition.y = 200;
      // console.log(maskPosition);
      mask.style.left = `${maskPosition.x}px`;
      mask.style.top = `${maskPosition.y}px`;
      // 大图位置
      const bigImgPosition = {
        x: -maskX * 2,
        y: -maskY * 2,
      };
      bigImg.style.left = `${bigImgPosition.x}px`;
      bigImg.style.top = `${bigImgPosition.y}px`;
    }, 10, {}),
  },
  mounted() {
    this.$bus.$on('receive_imgs', ({ imgUrl, bigUrl }) => {
      this.imgUrl = imgUrl;
      this.bigUrl = bigUrl;
    });
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
