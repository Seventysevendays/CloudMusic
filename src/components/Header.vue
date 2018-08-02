<template>
  <div class="header">
    <div class="tab">
      <i class="iconfont icon-caidan"></i>
    </div>
    <ul class="tabs">
      <li
        v-for="item in nav"
        :key="item.class"
        :class="[{cur: item.name == routerName}]"
        @click="changeTab(item.name)"
        >
        <i class="iconfont" :class="[item.class]"></i>
      </li>
    </ul>
    <div class="tab">
      <i class="iconfont icon-chazhao"></i>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      nav: [
        {
          class: 'icon-music',
          name: 'mymusic'
        },
        {
          class: 'icon-wangyiyunyinlezizhi-copy',
          name: 'index'
        },
        {
          class: 'icon-shipin',
          name: 'video'
        }
      ]
    }
  },
  computed: {
    routerName () {
      return this.$route.name
    }
  },
  methods: {
    changeTab (name) {
      this.$router.push({name})
    }
  }
}
</script>
<style lang="less">
.header{
  display: flex;
  background-color: #C20C0C;
  color: #fff;
  justify-content: space-between;
  padding: 10px 0;
  i{
      font-size: 26px;
      text-align: center;
  }
  .tab{
    width: 60px;
    display: flex;
    justify-content: center;
  }
  .tabs{
    display: flex;
    width: 180px;
    justify-content: space-around;
    li{
      width: 50px;
      text-align: center;
      color: rgba(255, 255, 255, 0.5);
    }
    .cur{
        color: #fff;
      }
  }
}
</style>
