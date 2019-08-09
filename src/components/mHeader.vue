<template>
  <div class="m-header">
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
        this.$toast('555,这个功能还没开发出来呢...')
      } else {
        this.$router.push({path: tab.to})
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/style/color.styl'
.m-header
  position: relative
  width: 100%
  background-color: #f9f9f9
  .header-wrap
    position :relative
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
@keyframes logo-line {
  from {
    width: 0px
  }
  to {
    width: 70px
  }
}
@keyframes logo-name {
  from {
    margin-left: -60px
    opacity: 0
  }
  to {
    margin-left: 0px
    opacity: 1
  }
}
</style>
