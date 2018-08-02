export default {
  state: {
    album: '',
    showAlbumDetail: false,
    showMusic: false,
    albumIndex: 0,
    playList: [],
    playIndex: 0,
    flag: false
  },
  mutations: {
    changeAlbum (state, {album}) {
      state.album = album
    },
    toggleShow (state, {showAlbumDetail}) {
      state.showAlbumDetail = showAlbumDetail
    },
    changeAlbumIndex (state, {albumIndex}) {
      state.albumIndex = albumIndex
    },
    showMusic (state, {showMusic}) {
      state.showMusic = showMusic
    },
    changePlayList (state, {playList}) {
      state.playList = playList
    },
    changePlayIndex (state, {playIndex}) {
      state.playIndex = playIndex
    },
    changeFlag (state, {flag}) {
      state.flag = flag
    }
  },
  actions: {
  }
}
