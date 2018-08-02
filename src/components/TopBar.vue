<template>
  <div class="topBar">
    <div class="back" @click="hide(show)">
      <i class="iconfont icon-houtui1"></i>
    </div>
    <div class="text">{{text}}</div>
  </div>
</template>
<script>
export default {
  props: ['text', 'show'],
  methods: {
    hide (show) {
      switch (show) {
        case 'showAlbumDetail':
          this.$store.commit('toggleShow', {show: false})
          break
        case 'showMusic':
          this.$store.commit('showMusic', {show: false})
          break
        default: return
      }
      this.$router.push({name: 'index'})
    }
  }
}
</script>
<style lang="less">
.topBar {
  padding: 10px 60px 10px 10px;
  background-color: #C20C0C;
  display: flex;
  .back {
    width: 50px;
    text-align: center;
    .iconfont {
      text-align: center;
      font-size: 20px;
      color: #fff;
    }
  }
  .text{
    flex: 1;
    text-align: center;
    color: #fff;
  }
}
</style>
