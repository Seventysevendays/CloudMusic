<template>
  <div class="hotList">
    <p class="title">
      热歌推荐
    </p>
    <ul class="list">
      <li
        v-for="(item,index) in hotList"
        :key="item.singerImg"
        @click="showMusic(index, hotList)"
        :class="[{cur: index === playIndex && hotList[0].musicName === playList[0].musicName}]"
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
export default {
  props: ['hotList'],
  methods: {
    showMusic (index, hotList) {
      this.$store.commit('changeFlag', {flag: true})
      this.$store.commit('changePlayList', {playList: hotList})
      this.$store.commit('changePlayIndex', {playIndex: index})
      this.$store.commit('showMusic', {showMusic: true})
    }
  },
  computed: {
    playIndex () {
      return this.$store.state.playIndex
    },
    playList () {
      return this.$store.state.playList
    }
  }
}
</script>
<style lang="less" scoped>
.hotList {
  padding: 0 10px 48px;
  .title {
    font-size: 16px;
    color: #000;
    font-weight: bold;
  }
  .list {
    padding: 0 10px;
    margin-top: 6px;
    li {
      &:nth-child(n) {
        border-bottom: 1px solid #eee;
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
