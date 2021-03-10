<template>
  <!-- Swiper -->
  <!-- 传递的时候可以传递元素选择器或者真实DOM元素 -->
  <div
    ref="swiper"
    class="swiper-container"
    @mouseenter="swiper[0].autoplay.stop()"
    @mouseleave="swiper[0].autoplay.start()"
  >
    <div class="swiper-wrapper">
      <div v-for="image in carouselList" :key="image.id" class="swiper-slide">
        <img :src="image.imgUrl" :alt="image.title" />
      </div>
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
  props: ['carouselList'],
  data() {
    return {
      swiper: null,
    };
  },
  watch: {
    carouselList() {
      // newVal
      // console.log(newVal);
      /*
        先等数据回来,再new Swiper
        vue的更新是异步的
          也就是说数据回来了
          但是DOM元素并没有创建,数据更新先于DOM更新,真正的源码内部是异步更新的,cb会被塞到异步队列中更新
        还需要等DOM元素创建好,才能new Swiper
          updated:会触发多次,不行
          nextTick():等待DOM元素更新完成才触发,且只触发一次
        总结:new Swiper一定要等内部的DOM元素加载完成才行
      */
      //  nextTick方法:等待DOM更新完成才触发,只触发一次
      this.$nextTick(() => {
        // 未来组件复用的时候,这个swiper是不一样的,this指向是不一样的\
        // 如果是类名,name就会导致下面的轮播图也会动,因为类名可以复用,而ref是DOM元素的标记,通过this.$refs拿到的这个真实DOM元素,而this不同,拿到的也不同
        this.swiper = new Swiper(this.$refs.swiper, {
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
        console.log(this.swiper);
      });
    },
  },
  mounted() {},
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
