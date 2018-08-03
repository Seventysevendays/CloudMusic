> A Vue.js project

## 云音乐播放器

> * 首页展示：海报轮播、专辑推荐列表、热歌推荐列表
> * 专辑详情页面：专辑信息展示、专辑列表展示
> * 播放页面：歌曲信息显示、专辑封面动态特效、歌词显示、控制栏、小菜单
> * 功能：切换歌曲、歌词显示、歌词同步、顺序播放、单曲循环、随机播放、进度控制
> * 小菜单：当前播放曲目展示、暂停播放
### 项目总结
> * vue-cli起手，简单高效
> * 使用vuex进行数据管理
> * 路由：使用vue-router
> * 样式：使用less，flex布局
> * 通用组件：在components中进行封装
> * 主要部件：Index文件夹
#### HotLIst：热歌推荐
> * 当前播放歌曲单独样式显示
> * 单击进入播放页面
#### Recommend: 专辑推荐
> * 专辑列表展示
> * 可左右拖动
> * 单击进入专辑详情页面
#### SingleAlbum: 专辑详情
> * SeatMovieInfo：电影信息
> * SeatSelected：已选座位列表和确认选座按钮
> * SeatSelector：座位列表
#### Swiper：海报轮播
> * 使用vue资源库，vue-awesome-swiper
#### components: 通用组件
> * Header：主页头部，切换页面组件
> * Music：播放的主要组件
> * SmallMusic：小的播放列表组件
> * TopBar：具有返回主页面功能，带有播放信息展示的头部

#### 主页面

<img src="https://github.com/Seventysevendays/CloudMusic/blob/master/capture/front.png" width="300"/>

#### 专辑详情页面

<img src="https://github.com/Seventysevendays/CloudMusic/blob/master/capture/album.png" width="300"/>

#### 歌词展示

<img src="https://github.com/Seventysevendays/CloudMusic/blob/master/capture/lyric.png" width="300"/>

#### 播放页面

<img src="https://github.com/Seventysevendays/CloudMusic/blob/master/capture/play.png" width="300"/>

#### 播放列表

<img src="https://github.com/Seventysevendays/CloudMusic/blob/master/capture/playList.png" width="300"/>

#### 小播放列表

<img src="https://github.com/Seventysevendays/CloudMusic/blob/master/capture/smallList.png" width="300"/>
