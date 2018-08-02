<template>
  <div class="recommend">
    <p class="title">专辑推荐</p>
    <ul>
      <li v-for="(item,index) in recommendAlbumArr" :key="index" @click="changeAlbum(item.albumTitle, index)">
        <a href="javascript:void(0)">
          <div>
            <img :src="item.albumImg" alt="">
          </div>
          <p>
            {{item.albumTitle}}
          </p>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['recommendAlbumArr', 'albumArr'],
  methods: {
    changeAlbum (album, albumIndex) {
      this.$store.commit('changeAlbum', { album })
      this.$store.commit('toggleShow', { showAlbumDetail: true })
      this.$store.commit('changeAlbumIndex', { albumIndex })
    }
  }
}
</script>
<style lang="less" scoped>
.recommend {
  padding: 6px 10px;
  .title {
    font-size: 16px;
    color: #000;
    margin-bottom: 12px;
    font-weight: 600;
  }
  ul {
    font-size: 12px;
    color: #333;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
    border-bottom: 1px solid #eee;
    padding-bottom: 6px;
    li {
      margin-right: 4px;
      div {
        img {
          width: 100px;
        }
      }
    }
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
