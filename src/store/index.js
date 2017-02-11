import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import api from '../api'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    audio: {
      'id': 0,
      'name': '歌曲名称',
      'singer': '演唱者',
      'albumPic': '/static/player-bar.png',
      'location': '',
      'album': ''
    },
    lyric: '正在加载中。。',
    currentIndex: 0, // 当前播放的歌曲位置
    playing: false, // 是否正在播放
    loading: false, // 是否正在加载中
    showDetail: false,
    songList: [],    // 播放列表
    currentTime: 0,
    tmpCurrentTime: 0,
    durationTime: 0,
    bufferedTime: 0,
    change: false   // 判断是更改的时间还是播放的时间
  },
  getters: {
    audio: state => state.audio,
    playing: state => state.playing,
    loading: state => state.loading,
    showDetail: state => state.showDetail,
    durationTime: state => state.durationTime,
    currentIndex: state => state.currentIndex,
    bufferedTime: state => state.bufferedTime,
    tmpCurrentTime: state => state.tmpCurrentTime,
    songList: state => state.songList,
    change: state => state.change,
    currentTime: state => state.currentTime,
    prCurrentTime: state => {
      return state.currentTime / state.durationTime * 100
    },
    prBufferedTime: state => {
      return state.bufferedTime / state.durationTime * 100
    }
  },
  mutations: {
    play (state) {
      state.playing = true
    },
    pause (state) {
      state.playing = false
    },
    toggleDetail (state) {
      state.showDetail = !state.showDetail
    },
    setAudio (state) {
      state.audio = state.songList[state.currentIndex - 1]
    },
    setChange (state, flag) {
      state.change = flag
    },
    setLocation (state, location) {
      state.audio.location = location
    },
    updateCurrentTime (state, time) {
      state.currentTime = time
    },
    updateDurationTime (state, time) {
      state.durationTime = time
    },
    updateBufferedTime (state, time) {
      state.bufferedTime = time
    },
    changeTime (state, time) {
      state.tmpCurrentTime = time
    },
    openLoading (state) {
      state.loading = true
    },
    closeLoading (state) {
      state.loading = false
    },
    resetAudio (state) {
      state.currentTime = 0
    },
    playNext (state) { // 播放下一曲
      state.currentIndex++
      if (state.currentIndex > state.songList.length) {
        state.currentIndex = 1
      }
      state.audio = state.songList[state.currentIndex - 1]
    },
    playPrev (state) { // 播放上一曲
      state.currentIndex--
      if (state.currentIndex < 1) {
        state.currentIndex = state.songList.length
      }
      state.audio = state.songList[state.currentIndex - 1]
    },
    addToList (state, item) {
      var flag = false
      state.songList.forEach(function (element, index) { // 检测歌曲重复
        if (element.id === item.id) {
          flag = true
          state.currentIndex = index + 1
        }
      })
      if (!flag) {
        state.songList.push(item)
        state.currentIndex = state.songList.length
      }
    },
    setLrc (state, lrc) {
      state.lyric = lrc
    }
  },
  // 异步的数据操作
  actions: {
    getSong ({commit, state}, id) {
      commit('openLoading')
      Axios.get(api.getSong(id)).then(res => {
        // 统一数据模型，方便后台接口的改变
        var id = res.data.songs[0].id
        var name = res.data.songs[0].name
        var singer = res.data.songs[0].artists[0].name
        var albumPic = res.data.songs[0].album.picUrl
        var location = res.data.songs[0].mp3Url
        var album = res.data.songs[0].album
        var audio = {id, name, singer, albumPic, location, album}
        commit('addToList', audio)
        commit('setAudio')
      })
    },
    getLrc ({commit, state}, id) {
      commit('setLrc', '[txt](加载中。。。')
      console.log('getlrc')
      Axios.get(api.getLrc(id)).then(res => {
        // 1、先判断是否有歌词
        if (res.data.nolyric) {
          commit('setLrc', '[txt](⊙０⊙) 暂无歌词')
        } else {
          console.log(res.data.lrc.lyric)
          commit('setLrc', res.data.lrc.lyric)
        }
      })
    }
  }
})
export default store