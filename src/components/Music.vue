<template>
  <div v-if="playList.length != 0" class="music" :style="'height:' + (showMusic ? '100%' : 'auto')">
    <transition name="move">
      <div class="small" v-show="!showMusic">
        <div class="smallMusic">
          <div class="img">
            <img :src="playList[playIndex].singerImg" alt="">
          </div>
          <div class="title" @click="showBig">
            <p class="musicName">
              {{playList[playIndex].musicName}}
            </p>
            <p class="singerName">
              {{playList[playIndex].musicSinger}}
            </p>
          </div>
          <div class="icon">
            <i :class="['iconfont', {'icon-bofang': paused}, {'icon-pause-20': !paused}]" id='smallBtn'></i>
            <i class="iconfont icon-caidan" @click="hideCurrentList"></i>
          </div>
        </div>
        <transition name="move">
            <div class="currentListBox" v-show="showCurrentList" @click="hideCurrentList">
              <ul class="currentList">
                <li
                  v-for="(item,index) in playList"
                  :key="item.musicName"
                  :class="[{cur: index === playIndex}]"
                  @click="changeSong(index)"
                  >
                  <div class="musicname">
                    {{index + 1}}
                    <span class="name">{{item.musicName}}</span>
                    <p class="singer">{{item.musicSinger}}</p>
                  </div>
                </li>
              </ul>
            </div>
        </transition>
      </div>
    </transition>
    <transition name="move">
      <div class="big" v-show="showMusic">
        <TopBar :text='playList[playIndex].musicName + " - " + playList[playIndex].musicSinger' show='showMusic'></TopBar>
        <div class="play" :style="{background:'url(' + playList[playIndex].playerbg + ') 0 -10px / cover no-repeat'}">
          <div class="content">
            <div class="cd">
              <img src="../../static/img/cd.png" />
              <div class="singerbg">
                <img :src=" playList[playIndex].singerImg" />
              </div>
            </div>
            <div class="switch">
              <img src="../../static/img/swith.png">
            </div>
            <transition name="fade">
              <div
                class="lyric"
                :style="{background:'url(' + playList[playIndex].playerbg + ') 0 -10px / cover no-repeat'}"
                v-if="showLyric"
                >
                <div class="lyricBg">
                  <div class="lyricBox">
                    <p
                      v-for="(item, index) in lyric"
                      :key="index"
                      :class="['singleLyric', {lyricCur: currentTime >= item.time}, {passed: currentTime >= item.time}]"
                      >
                      {{item.content}}
                    </p>
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <div class="playCtrl">
            <div class="top">
              <i class="iconfont icon-xin1"></i>
              <i class="iconfont icon-icon--"></i>
              <i class="iconfont icon-BAI-pinglun"></i>
              <i class="iconfont icon-more-vert"></i>
            </div>
            <div class="progress">
              <span class="current">{{min}}:{{sec}}</span>
              <div class="proBox" @click="changePro($event)">
                <div class="proBg">
                  <div class="proTop" ref="proTop"></div>
                </div>
              </div>
              <span class="total">{{duration}}</span>
            </div>
            <div class="bottom">
              <i class="iconfont" :class="mode[modeIndex]" id='mode'></i>
              <i class="iconfont icon-previous"></i>
              <i :class="['iconfont', {'icon-bofang': paused}, {'icon-pause-20': !paused}]" id="playBtn"></i>
              <i class="iconfont icon-next"></i>
              <i class="iconfont icon-zhankaicaidan" @click="hideCurrentList"></i>
            </div>
            <transition name="move">
              <ul class="currentList" v-show="showCurrentList">
                <li
                  v-for="(item,index) in playList"
                  :key="item.musicName"
                  :class="[{cur: index === playIndex}]"
                  @click="changeSong(index)"
                  >
                  <div class="musicname">
                    {{index + 1}}
                    <span class="name">{{item.musicName}}</span>
                    <p class="singer">{{item.musicSinger}}</p>
                  </div>
                </li>
              </ul>
            </transition>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import TopBar from '../components/TopBar'
export default {
  components: {
    TopBar
  },
  data () {
    return {
      min: '00',
      sec: '00',
      duration: '00:00',
      proPercent: 0,
      lastSong: '',
      index: 0,
      paused: true,
      mode: ['icon-xunhuan', 'icon-bofangye-caozuolan-suijibofang', 'icon-singlecycle'],
      modeIndex: 0,
      showCurrentList: false,
      showLyric: false,
      lyric: [],
      currentTime: 0,
      lyricTop: 0,
      durationOrigin: 0
    }
  },
  computed: {
    playList () {
      return this.$store.state.playList
    },
    playIndex () {
      return this.$store.state.playIndex
    },
    flag () {
      return this.$store.state.flag
    },
    showMusic () {
      return this.$store.state.showMusic
    }
  },
  methods: {
    changePro (v) {
      this.proPercent = v.offsetX / v.target.clientWidth
      $('.proTop').css('left', -(1 - this.proPercent) * 254 + 'px')
      this.audio.currentTime = this.durationOrigin * this.proPercent
    },
    hideCurrentList () {
      this.showCurrentList = !this.showCurrentList
    },
    parseLrc (lrc) {
      var _this = this
      var lrcs = lrc.split('\n')
      var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g
      lrcs.forEach(function (ele, index) {
        var timeStr = ele.match(timeReg)
        var minReg = /\[\d*/
        var secReg = /\:\d*/
        var content = ele.replace(timeReg, '')
        if (timeStr != null) {
          var min = Number(timeStr[0].match(minReg)[0].slice(1))
          var sec = Number(timeStr[0].match(secReg)[0].slice(1))
          var time = min * 60 + sec
          _this.lyric.push({ time, content })
        }
      })
    },
    getLyric () {
      var _this = this
      $.ajax({
        type: 'GET',
        url: `${this.playList[this.playIndex].musicLyric}`,
        headers: { contentType: 'application/x-www-form-urlencoded' },
        success: function (data) {
          _this.parseLrc(data)
        }
      })
    },
    changeSong (index) {
      this.lyric = []
      this.$store.commit('changePlayIndex', { playIndex: index })
      this.$store.commit('changeFlag', { flag: true })
      this.showCurrentList = false
    },
    dbTime (time) {
      if (time < 10) {
        return '0' + time
      } else {
        return '' + time
      }
    },
    showBig () {
      this.$store.commit('showMusic', { showMusic: true })
      this.showCurrentList = false
    },
    changeModeNext (mode, index, length) {
      if (mode === 'icon-bofangye-caozuolan-suijibofang') {
        this.index = parseInt(Math.random() * length)
      }
      if (mode === 'icon-singlecycle' || mode === 'icon-xunhuan') {
        if (index === length - 1) {
          this.index = 0
        } else {
          this.index = index + 1
        }
      }
    },
    changeModePrev (mode, index, length) {
      if (mode === 'icon-bofangye-caozuolan-suijibofang') {
        this.index = parseInt(Math.random() * length)
      }
      if (mode === 'icon-singlecycle' || mode === 'icon-xunhuan') {
        if (index === 0) {
          this.index = length - 1
        } else {
          this.index = index - 1
        }
      }
    },
    changeModeAuto (mode, index, length) {
      if (mode === 'icon-bofangye-caozuolan-suijibofang') {
        this.index = parseInt(Math.random() * length)
      }
      if (mode === 'icon-xunhuan') {
        if (index === length - 1) {
          this.index = 0
        } else {
          this.index = index + 1
        }
      }
      if (mode === 'icon-singlecycle') {
        this.index = index
        this.lastSong = ''
      }
    }
  },
  mounted () {
    var _this = this
    this.audio = new Audio()
    this.audio.src = this.playList[this.playIndex].musicUrl
    this.audio.load()
    this.getLyric()
    this.durationOrigin = this.audio.duration
    this.audio.oncanplay = function () {
      _this.durationOrigin = _this.audio.duration
    }
    document.body.appendChild(this.audio)
    $('body').on('click', '#playBtn , #smallBtn', function () {
      if (_this.audio.paused) {
        _this.audio.play()
        $('.switch').addClass('cur')
        $('.singerbg').addClass('cur')
        _this.timer = setInterval(function () {
          _this.currentTime = parseInt(_this.audio.currentTime)
          _this.min = _this.dbTime(parseInt(_this.audio.currentTime / 60))
          _this.sec = _this.dbTime(parseInt(_this.audio.currentTime % 60))
          _this.proPercent = _this.audio.currentTime / _this.audio.duration
          if (_this.proPercent === 1) {
            $('.switch').removeClass('cur')
            $('.singerbg').removeClass('cur')
            clearInterval(_this.timer)
            _this.changeModeAuto(_this.mode[_this.modeIndex], _this.index, _this.playList.length)
            _this.$store.commit('changePlayIndex', { playIndex: _this.index })
            _this.$store.commit('changeFlag', { flag: true })
          }
        }, 300)
      } else {
        _this.audio.pause()
        $('.switch').removeClass('cur')
        $('.singerbg').removeClass('cur')
        clearInterval(_this.timer)
      }
      _this.paused = _this.audio.paused
    })
    $('body').on('click', '.icon-previous', function () {
      _this.changeModePrev(_this.mode[_this.modeIndex], _this.index, _this.playList.length)
      _this.$store.commit('changePlayIndex', { playIndex: _this.index })
      _this.$store.commit('changeFlag', { flag: true })
      _this.lyric = []
    })
    $('body').on('click', '.icon-next', function () {
      _this.changeModeNext(_this.mode[_this.modeIndex], _this.index, _this.playList.length)
      _this.$store.commit('changePlayIndex', { playIndex: _this.index })
      _this.$store.commit('changeFlag', { flag: true })
      _this.lyric = []
    })
    $('body').on('click', '#mode', function () {
      _this.modeIndex++
      if (_this.modeIndex >= _this.mode.length) {
        _this.modeIndex = 0
      }
    })
    $('body').on('click', '.singerbg', function () {
      _this.showLyric = true
    })
    $('body').on('click', '.lyric', function () {
      _this.showLyric = false
    })
    $('body').on('click', '.content', function () {
      _this.showCurrentList = false
    })
    $('.proTop').draggable()
  },
  updated () {
    var _this = this
    var audio = this.audio
    this.index = this.playIndex
    this.paused = this.audio.paused
    $('.lyricBox').css('top', -$('.passed').length * 34 + $('.lyricBg').height() * 0.5 + 'px')
    $('.lyricCur:not(:last)').removeClass('lyricCur')
    if (this.flag) {
      this.$store.commit('changeFlag', { flag: false })
      if (this.playList.length !== 0) {
        audio.load()
        audio.src = this.playList[this.playIndex].musicUrl
        audio.play()
        this.lyric = []
        audio.oncanplay = function () {
          _this.durationOrigin = audio.duration
          _this.duration = _this.dbTime(parseInt(audio.duration / 60)) + ':' + _this.dbTime(parseInt(audio.duration % 60))
        }
        this.getLyric()
        $('.switch').addClass('cur')
        $('.singerbg').addClass('cur')
        _this.lastSong = _this.playList[_this.playIndex].musicName
      }
      this.timer = setInterval(function () {
        _this.currentTime = parseInt(audio.currentTime)
        _this.min = _this.dbTime(parseInt(audio.currentTime / 60))
        _this.sec = _this.dbTime(parseInt(audio.currentTime % 60))
        _this.proPercent = audio.currentTime / audio.duration
        if (_this.proPercent === 1) {
          clearInterval(_this.timer)
          $('.switch').removeClass('cur')
          $('.singerbg').removeClass('cur')
          _this.changeModeAuto(_this.mode[_this.modeIndex], _this.index, _this.playList.length)
          _this.$store.commit('changePlayIndex', { playIndex: _this.index })
          _this.$store.commit('changeFlag', { flag: true })
        }
      }, 300)
    }
    $('.proTop').css('left', -(1 - this.proPercent) * 254 + 'px')
  }
}
</script>
<style lang="less" scoped>
.music {
  &::-webkit-scrollbar {
    display: none;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
  .move-enter-active{
    transition: all .2s
  }
  .move-leave-active {
    transform: translateX(400px);
    opacity: 1;
  }
  .move-enter{
    opacity: 0;
    transform: translateY(400px);
  }
  .move-leave-to{
    transform: translateY(-400px);
  }
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 9999;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .small {
    width: 100%;
    height: 100%;
    .currentListBox{
      width: 100%;
      height: 100%;
      position: fixed;
      background: rgba(0, 0, 0, 0.3);
      .currentList{
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        background: #fff;
        padding: 0 10px;
        height: 300px;
        overflow-y: scroll;
        padding-bottom: 50px;
        li {
          &:nth-child(n) {
            border-bottom: 1px solid #eee;
          }
          padding: 2px 4px;
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
    .smallMusic {
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
      .img {
        width: 40px;
        height: 40px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title {
        flex: 1;
        text-align: left;
        margin-right: 20px;
        .musicName {
          margin-left: 10px;
          font-size: 14px;
        }
        .singerName {
          font-size: 10px;
          color: #666;
          margin-left: 10px;
        }
      }
      .icon {
        width: 70px;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        i {
          font-size: 20px;
          width: 34px;
          text-align: left;
        }
      }
    }
  }
  .big{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    .play {
      flex: 1;
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      flex-flow: column;
      overflow: hidden;
      .currentList{
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        background: #fff;
        padding: 0 10px;
        margin-top: 6px;
        height: 128px;
        overflow-y: scroll;
        li {
          &:nth-child(n) {
            border-bottom: 1px solid #eee;
          }
          padding: 2px 4px;
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
      .content {
        flex: 1;
        padding: 60px 0;
        overflow: hidden;
        width: 100%;
        .lyric{
          position: fixed;
          width: 100%;
          height: calc(100% - 206px);
          top: 40px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
          .lyricBg{
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            overflow: hidden;
            text-align: center;
            overflow-y: scroll;
            transition: all 1s;
            position: relative;
            &::-webkit-scrollbar {
              display: none;
            }
            .lyricBox{
              width: 100%;
              position: absolute;
              top: 0;
              .singleLyric{
                padding: 8px 0;
                transition: all 0.3s;
              }
              .lyricCur{
                  color: #fff;
                  transform: scale(1.1)
              }
            }
          }
        }
        .cd {
          width: 80%;
          margin: 30px auto 0;
          position: relative;
          img {
            width: 100%;
          }
          .singerbg {
            border-radius: 999px;
            overflow: hidden;
            width: 60%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: donghua 6s linear infinite paused;
            img {
              display: block;
            }
          }
          .singerbg.cur {
            animation-play-state: running;
          }
          @keyframes donghua {
            from {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            to {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }
        }
        .switch {
          width: 110px;
          height: 165px;
          position: absolute;
          top: -21px;
          left: 59%;
          transform: translateX(-50%) rotate(-15deg);
          /*transform-origin 是控制旋转中心的*/
          transform-origin: 15px 15px;
          transition: all 1s ease 0s;
          img {
            width: 100%;
            display: block;
          }
        }
        .switch.cur {
          transform: translateX(-50%) rotate(0deg);
        }
      }
      .playCtrl {
        bottom: 0;
        width: 100%;
        height: 166px;
        background-color: rgba(0, 0, 0, 0.3);
        .top {
          padding: 0 10px;
          display: flex;
          justify-content: space-around;
          margin-top: 20px;
          i {
            width: 80px;
            font-size: 26px;
            color: #fff;
            text-align: center;
          }
        }
        .bottom {
          color: #fff;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 14px;
          i {
            width: 60px;
            font-size: 26px;
            text-align: center;
          }
          .icon-bofang,
          .icon-pause-20 {
            font-size: 40px;
          }
        }
        .progress {
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
          padding: 0 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 14px;
          .proBox {
            width: 260px;
            height: 10px;
            overflow: hidden;
            display: flex;
            align-items: center;
            .proBg {
              height: 2px;
              width: 259px;
              background: rgba(255, 255, 255, 0.7);
              position: relative;
              .proTop {
                height: 2px;
                width: 260px;
                background: #eb3939;
                position: absolute;
                left: 0;
                &::after {
                  content: "";
                  display: block;
                  position: absolute;
                  width: 6px;
                  height: 6px;
                  background-color: #eb3939;
                  right: 0;
                  top: -2px;
                  border-radius: 50%;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
