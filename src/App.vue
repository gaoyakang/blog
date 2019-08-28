<template>
  <div id="app">
    <!-- 主体开始 -->
    <div class="content-wrap">
      <m-header v-show="!showLogin"></m-header>
      <div class="view-wrap">
        <router-view></router-view>
      </div>
      <m-footer v-show="!showLogin"></m-footer>
    </div>
    <!-- 主体结束 -->
    <!-- 回到顶部按钮开始 -->
    <div class="to-top" @click="toTop" v-if="showTopIcon">
      <span class="to-top-line" v-for="(line, index) in lineData" :key="index" :style="{height: line.height,left: line.left,transform: line.transform}">
        </span>
    </div>
    <!-- 回到顶部按钮结束 -->
    <div class="login">
      <router-view name="login" v-show="showLogin"></router-view>
    </div>
  </div>
</template>

<script>
import mHeader from './components/mHeader'
import mFooter from './components/mFooter'
// import login from './page/admin/login/login'
export default {
  name: 'App',
  components: {
    mHeader,
    mFooter
  },
  data () {
    return {
      showTopIcon: false,
      showLogin: false,
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
      window.scrollTo(0, 0)
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scrollToTop)
    window.scrollTo(0, 0)
    this.showLogin = true
  },
  destoryed () {
    window.removeEventListener('scroll', this.scrollToTop)
  }
}
</script>

<style lang="stylus" scoped>
@import './assets/style/color.styl'
.view-wrap
  width: 1000px
  margin: 0 auto
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
