import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index/Index'
import MyMusic from '../components/MyMusic/Index'
import Video from '../components/Video/Index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Index
    }, {
      path: '/mymusic',
      name: 'mymusic',
      component: MyMusic
    }, {
      path: '/video',
      name: 'video',
      component: Video
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})
