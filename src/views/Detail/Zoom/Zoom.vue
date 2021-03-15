<template>
  <div class="spec-preview">
    <img src="../images/s1.png" />
    <div ref="event" class="event" @mousemove="show"></div>
    <div ref="mask" class="mask"></div>

    <div class="big">
      <img ref="bigImg" src="../images/s1.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Zoom',
  methods: {
    show(e) {
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
    },
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
