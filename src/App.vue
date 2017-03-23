<template>
  <div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    <Player v-show="songList.length > 0 && !showDetail"></Player>
    <!-- modal root -->
    <Toast ref="alert"></Toast>
  </div>
</template>
<script>
  import Player from './components/playerBar'
  import Vue from 'vue'
  import { mapGetters } from 'vuex'
  // migration from
  import Bus from './utils/evt-bus.js'
  export default {
    data () {
      return {
        toast: false
      }
    },
    mounted () {
      // this.$refs.alert.show('fkup')
      this.$refs.alert
      Bus.$on('error:network', (err) => {
        Vue.nextTick(function () {
          this.$refs.alert.show(err.message)
        }, this)
      })
    },
    components: {
      Player
    },
    computed: {
      ...mapGetters([
        'songList',
        'showDetail'
      ])
    }
  }
</script>
