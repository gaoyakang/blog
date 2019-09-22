<template>
  <div class="blog">
    <!-- 前台开始 -->
    <div class="content-wrap">
      <div class="view-wrap">
        <router-view name="header" class="mheader"></router-view>
        <router-view name="home" class="mView"></router-view>
        <router-view name="categories" class="mView"></router-view>
        <!-- <router-view name="archives" class="mView"></router-view> -->
        <!-- <router-view name="about" class="mView"></router-view> -->
        <router-view name="search" class="mView"></router-view>
        <router-view name="article" class="mView"></router-view>
        <router-view name="list" class="mView"></router-view>
        <!-- <router-view name="resume" class="mView"></router-view> -->
        <router-view name="all" class="mView"></router-view>
        <router-view name="footer" class="mheader"></router-view>
      </div>
    </div>
    <!-- 前台结束 -->
    <!-- 回到顶部按钮开始 -->
    <div class="to-top" @click="toTop" v-if="showTopIcon">
      <span class="to-top-line" v-for="(line, index) in lineData" :key="index" :style="{height: line.height,left: line.left,transform: line.transform}">
        </span>
    </div>
    <!-- 回到顶部按钮结束 -->
  </div>
</template>

<script>
export default {
  name: 'App',
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
      window.scrollTo(0, 0)
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scrollToTop)
    window.scrollTo(0, 0)
  },
  destoryed () {
    window.removeEventListener('scroll', this.scrollToTop)
  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/style/color.styl'
.blog
  .content-wrap
    .view-wrap
      .mHeader,mFooter
        width: 100%
      .mView
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
