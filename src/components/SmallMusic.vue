<template>
  <div class="smallMusic" v-if="playList.length !== 0">
    <div class="img">
      <img :src="playList[playIndex].singerImg" alt="">
    </div>
    <div class="title">
      <p class="musicName">
        {{playList[playIndex].musicName}}
      </p>
      <p class="singerName">
        {{playList[playIndex].musicSinger}}
      </p>
    </div>
    <div class="icon">
      <i class="iconfont icon-bofang"></i>
      <i class="iconfont icon-caidan"></i>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    playList () {
      return this.$store.state.playList
    },
    playIndex () {
      return this.$store.state.playIndex
    }
  }
}
</script>
<style lang="less">
.smallMusic{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: #fff;
  z-index: 999;
  display: flex;
  padding: 0 6px;
  justify-content: space-between;
  align-items: center;
  .img{
    width: 40px;
    height: 40px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .title{
    flex: 1;
    text-align: left;
    .musicName{
      margin-left: 10px;
      font-size: 14px;
    }
    .singerName{
      font-size: 10px;
      color: #666;
      margin-left: 10px
    }
  }
  .icon{
    width: 70px;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    i{
      font-size: 20px;
      width: 34px;
      text-align: left;
    }
  }
}
</style>
