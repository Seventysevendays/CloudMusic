<template>
  <div class='index'>
    <Swiper :swiperArr='swiperArr' v-if="!showAlbumDetail"></Swiper>
    <Recommend :recommendAlbumArr='recommendAlbumArr' v-if="!showAlbumDetail"></Recommend>
    <HotList :hotList='hotList' v-if="!showAlbumDetail"></HotList>
    <SingleAlbum v-show="showAlbumDetail" :albumArr='albumArr'></SingleAlbum>
    <router-view></router-view>
  </div>
</template>
<script>
import data from '../../../static/data'
import Swiper from './Swiper'
import Recommend from './Recommend'
import HotList from './HotList'
import SingleAlbum from './SingleAlbum'
export default {
  name: 'Index',
  components: {
    Swiper,
    Recommend,
    HotList,
    SingleAlbum
  },
  data () {
    return {
      swiperArr: [
        {
          imageSrc: '../../../static/img/1.jpg',
          imageUrl: 'http://music.163.com/m/at/direnjie'
        },
        {
          imageSrc: '../../../static/img/2.jpg',
          imageUrl: 'https://music.163.com/song?id=1296410418'
        },
        {
          imageSrc: '../../../static/img/3.jpg',
          imageUrl: 'https://music.163.com/song?id=1294899541'
        },
        {
          imageSrc: '../../../static/img/4.jpg',
          imageUrl: 'https://music.163.com/song?id=1294924388'
        }
      ],
      recommendAlbumArr: data.mapList.recommendAlbum,
      albumArr: data.mapList.album,
      hotList: data.mapList.hotList
    }
  },
  computed: {
    showAlbumDetail () {
      return this.$store.state.showAlbumDetail
    },
    showMusic () {
      return this.$store.state.showMusic
    }
  }
}
</script>
