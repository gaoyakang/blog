<template>
  <div id="m-header">
    <div class="header-wrap">
      <div class="header-logo">
        <p class="line"></p>
        <p class="blog-name">博客</p>
        <p class="line"></p>
      </div>
      <header-tab-view :tabs="tabs" @tab-click="selectTab"></header-tab-view>
    </div>
  </div>
</template>

<script>
import headerTabView from './headerTabView'
export default {
  name: 'mHeader',
  components: {
    headerTabView
  },
  data () {
    return {
      tabs: [
        {
          name: '首页',
          to: 'home'
        },
        {
          name: '分类',
          to: 'categories'
        },
        {
          name: '归档',
          to: 'archives'
        },
        {
          name: '关于',
          to: 'about'
        },
        {
          name: '更多',
          to: 'more'
        },
        {
          name: '搜索',
          to: 'search'
        }
      ]
    }
  },
  methods: {
    selectTab (tab) {
      if (tab.to === 'more') {
        console.log('这个功能还没开发完呢...')
      }
      this.$router.push({name: tab.to})
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/style/color.styl'
*
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
#m-header
  position: relative
  width: 100%
  background-color: #f9f9f9
  .header-wrap
    position: relative
    max-width: 1000px
    padding: 0 10px
    margin: 0 auto
    height: 90px
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center
    transition: height .3s
    .header-logo
      height: 100%
      display: flex
      flex-direction: column
      align-items: center
      justify-content: space-between
      color: $color-main
      font-size: 20px
      font-weight: bold
      padding: 25px 0
      &:hover
        cursor: pointer
        .line
          width: 0px
      .line
        width: 70px
        height: 2px
        background-color: $color-main
        animation: logo-line .5s
        transition: width .3s
      .blog-name
        animation: logo-name .5s
    .toggle
      width: 24px
      height: 24px
      background-color: #f9f9f9
      padding: 5px
      cursor: pointer
      line-height: 0
      .toggle-line
        position: relative
        display: inline-block
        vertical-align: top
        width: 100%
        height: 2px
        margin-top: 4px
        background-color: $color-main
        &:first-child
          margin-top: 0px
  .mobile-tab-wrap
    width: 100%
    transition: all .3s
    // overflow: hidden
    border-top: 1px solid #eeeeee
    .tab
      position: relative
      width: 100%
      padding: 8px 15px
      font-size: 12px
      line-height: 1
      .iconfont
        font-size: 12px
        margin-right: 5px
@keyframes logo-name {
  from {
    margin-left: -60px;
    opacity: 0
  }
  to {
    margin-left: 0px;
    opacity: 1
  }
}
@keyframes logo-line {
  from {
    width: 0px;
  }
  to {
    width: 70px;
  }
}
</style>
