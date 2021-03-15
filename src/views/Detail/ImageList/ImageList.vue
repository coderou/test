<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div
        v-for="(img, index) in skuImageList"
        :key="img.id"
        class="swiper-slide"
      >
        <img
          :class="{ active: currentIndex === index }"
          :src="img.imgUrl"
          :alt="img.imgName"
          @click="setCurrentIndex(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from 'swiper';

export default {
  name: 'ImageList',
  props: ['skuImageList'],
  data() {
    return {
      currentIndex: 0,
    };
  },
  watch: {
    // 监视获取到了数据
    skuImageList() {
      this.setCurrentIndex(0);// 数据拿到,触发一次emit,将数据传递给Zoom
      this.$nextTick(() => {
        /* eslint-disable-next-line */
        this.swiper = new Swiper(this.$refs.swiper, {
          // cssMode: true,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          slidesPerView: 5, // 每页显示图片数量
          slidesPerGroup: 5, // 每次轮播滑动的图片数量
        });
      });
    },
  },
  methods: {
    setCurrentIndex(index) {
      this.currentIndex = index;
      this.$bus.$emit('receive_imgs', {
        imgUrl: this.skuImageList[index].imgUrl,
        bigUrl: this.skuImageList[index].imgUrl, // 将来大图不一样,就要换一个容器
      });
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    display: flex;
    justify-content: center;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
