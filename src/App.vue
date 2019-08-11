<template>
  <div id="app">
    <div class="content-wrap">
      <m-header></m-header>
      <div class="view-wrap">
        <router-view></router-view>
      </div>
      <m-footer></m-footer>
    </div>
    <div class="to-top" @click="toTop" v-if="showTopIcon">
      <span class="to-top-line" v-for="(line, index) in lineData" :key="index" :style="{height: line.height,left: line.left,transform: line.transform}">
        </span>
    </div>
  </div>
</template>

<script>
import mHeader from './components/mHeader'
import mFooter from './components/mFooter'

export default {
  name: 'App',
  components: {
    mHeader,
    mFooter
  },
  data () {
    return {
      showTopIcon: false,
      lineData: [
        {
          height: '50%',
          left: '3px',
          transform: 'rotateZ(45deg)'
        },
        {
          height: '100%',
          top: '0px',
          transform: 'rotateZ(0deg)'
        },
        {
          height: '50%',
          left: '-3px',
          transform: 'rotateZ(-45deg)'
        }
      ]
    }
  },
  methods: {
    scrollToTop () {
      const that = this
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      that.scrollTop = scrollTop
      if (that.scrollTop > 60) {
        that.showTopIcon = true
      } else {
        that.showTopIcon = false
      }
    },
    toTop () {
      const that = this
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
        if (that.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 16)
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scrollToTop)
  },
  destoryed () {
    window.removeEventListener('scroll', this.scrollToTop)
  }
}
</script>

<style lang="stylus" scoped>
@import './assets/style/color.styl'
.to-top
  position: fixed
  width: 24px
  height: 24px
  background-color: $color-main
  right: 10px
  bottom: 15px
  padding: 5px
  z-index: 1050
  cursor: pointer
  line-height: 0
  display: flex
  flex-direction: row
  align-items: flex-start
  .to-top-line
    position: relative
    width: 2px
    height: 100%
    margin-left: 4px
    background-color: $color-white
    &:first-child
      margin-left: 0px
</style>
