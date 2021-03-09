<template>
  <!-- Swiper -->
  <div
    class="swiper-container"
    @mouseenter="swiper[0].autoplay.stop()"
    @mouseleave="swiper[0].autoplay.start()"
  >
    <div class="swiper-wrapper">
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
      <div class="swiper-slide">Slide 3</div>
      <div class="swiper-slide">Slide 4</div>
    </div>
    <!-- Add Arrows -->
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
    <!-- Add Pagination -->
    <div class="swiper-pagination"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';

export default {
  name: 'Carousel',
  data() {
    return {
      swiper: null,
    };
  },
  mounted() {
    this.swiper = new Swiper('.swiper-container', {
      cssMode: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
      },
      loop: true,
      autoplay: {
        delay: 1000,
        // stopOnLastSlide: false, // 最后一张不停止自动轮播
        // disableOnInteraction: true, // 鼠标移入时停止自动轮播
      },
    });
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
}
</style>
