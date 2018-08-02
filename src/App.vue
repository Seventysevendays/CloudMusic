<template>
  <div id="app">
    <Header></Header>
    <Music></Music>
    <transition name="slide-fade">
      <router-view/>
    </transition>
  </div>
</template>
<script>
import Header from './components/Header'
import Music from './components/Music'
import data from '../static/data'
export default {
  name: 'App',
  components: {
    Music,
    Header
  },
  beforeCreate () {
    this.$store.commit('changePlayList', { playList: data.mapList.hotList })
  }
}
</script>
<style>
.slide-fade-enter-active {
  transition: all .2s ease;
  opacity: 0;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(400px);
}
</style>
