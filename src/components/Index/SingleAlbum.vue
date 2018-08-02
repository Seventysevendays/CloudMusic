<template>
  <div class="singleAlbum" v-if="albumArr.length != 0">
    <TopBar :text="album" show='showAlbumDetail'></TopBar>
    <div class="top" :style="{background:'url(' + albumArr[albumIndex].albumbg + ') 0 / cover no-repeat'}">
      <div class="cover">
        <img :src="albumArr[albumIndex].albumImg" alt="">
        <div>
          <p class="title">专辑：{{'《'+albumArr[albumIndex].albumTitle+'》'}}</p>
          <p class="singer">歌手：{{albumArr[albumIndex].albumSinger}}</p>
        </div>
      </div>
    </div>
    <ul class="list">
      <li
        v-for="(item, index) in albumArr[albumIndex].albumList"
        :key="item.musicName"
        @click="showMusic(index, albumArr[albumIndex].albumList)"
        :class="[{cur: index === playIndex && albumArr[albumIndex].albumList[0].musicName === playList[0].musicName}]"
        >
        <div class="musicname">
          {{index + 1}}
          <span class="name">{{item.musicName}}</span>
          <p class="singer">{{item.musicSinger}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import TopBar from '../TopBar'
export default {
  components: {
    TopBar
  },
  computed: {
    album () {
      return this.$store.state.album
    },
    albumIndex () {
      return this.$store.state.albumIndex
    },
    playIndex () {
      return this.$store.state.playIndex
    },
    playList () {
      return this.$store.state.playList
    }
  },
  props: ['albumArr'],
  methods: {
    showMusic (index, playList) {
      this.$store.commit('changeFlag', {flag: true})
      this.$store.commit('showMusic', {showMusic: true})
      this.$store.commit('changePlayList', {playList})
      this.$store.commit('changePlayIndex', {playIndex: index})
    }
  }
}
</script>
<style lang="less">
.singleAlbum{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: #fff;
  z-index: 999;
  .top{
    width: 100%;
    height: 200px;
    .cover{
      padding: 40px 20px;
      display: flex;
      img{
        width: 120px;
        height: 120px;
      }
      div{
        flex: 1;
        margin-left: 20px;
        color: #fff;
        padding: 10px 0;
        font-size: 14px;
        p{
          margin: 10px 0;
        }
      }
    }
  }
  .list {
    padding: 0 10px;
    margin-top: 6px;
    li {
      border-bottom: 1px solid #eee;
      &:last-child{
        border: none;
      }
      padding: 10px 4px;
      .musicname {
        font-size: 14px;
        position: relative;
        .name{
          position: absolute;
          left: 24px;
        }
      }
      .singer {
        font-size: 12px;
        color: #666;
        margin-left: 24px;
        margin-top: 4px;
      }
    }
    .cur{
      color: #C20C02;
    }
  }
}
</style>
