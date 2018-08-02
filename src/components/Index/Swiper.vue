<template>
  <div class="swiper">
    <swiper :options="swiperOption">
      <swiper-slide v-for="item in swiperArr" :key="item.imageSrc">
        <a href="javascript:void(0)">
          <img :src="item.imageSrc">
        </a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  props: ['swiperArr']
}
</script>
<style lang="less">
.swiper {
  img{
    width: 100%;
  }
  .swiper-pagination-bullet-active{
    background: #C20C0C;
  }
}
</style>
