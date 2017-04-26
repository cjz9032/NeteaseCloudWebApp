<template>
  <div class="gt-wrap">
    <span class="gt-text" :style="gradientStyle">
      {{text}}
    </span>
  </div>
</template>
<script>
// import { mapGetters } from 'vuex'
export default {
  name: 'gradient-text',
  props: {
    text: {
      type: String,
      default: 'gradient text'
    },
    from: {
      type: String,
      default: '#B0E537'
    },
    to: {
      type: String,
      default: '#009DE9'
    },
    direction: {
      type: String,
      default: 'right'
    }
  },
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
    gradientStyle () {
      return {
        'color': this.to,
        'background': '-webkit-linear-gradient(' + this.direction + ', ' + this.to + ',' + this.from + ')'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.gt-wrap{
  .gt-text{
    -webkit-background-clip: text!important;
    -webkit-text-fill-color: transparent;
  }
}
</style>
