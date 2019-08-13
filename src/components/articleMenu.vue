<template>
  <div class="article-menu">
    <div
      class="article-menu-wrap"
      :style="{
        'width': showMenu ? '320px' : '0px',
        'transition': 'all .3s'
      }"
      v-show="showMenu"
    >
      <div class="menu-info-head">文章目录</div>
      <div class="content-wrap">
        <transition name="slide-fade">
          <menu-content class="article-menu-content" :menu="menu"></menu-content>
        </transition>
      </div>
    </div>
    <div class="toggle">
      <span
        class="toggle-line"
        v-for="(line,index) in toggleLineData"
        :key="index"
        :style="{
          width: line.width,
          top: line.top,
          transform: line.transform,
          opacity: line.opacity,
          transition: 'all .3s',
        }"
        @click="toggle"
        @mouseover="setLineData"
        @mouseout="setLineData"
      ></span>
    </div>
  </div>
</template>

<script>
import menuContent from './menuContent'
export default {
  name: 'articleMenu',
  props: ['menu'],
  components: {
    menuContent
  },
  data () {
    return {
      showMenu: false,
      toggleLineData: [],
      lineStyle: {
        normalLineData: [
          {
            width: '100%',
            top: '0px',
            transform: 'rotateZ(0deg)',
            opacity: '1'
          },
          {
            width: '100%',
            top: '0px',
            transform: 'rotateZ(0deg)',
            opacity: '1'
          },
          {
            width: '100%',
            top: '0px',
            transform: 'rotateZ(0deg)',
            opacity: '1'
          }
        ],
        closeLineData: [
          {
            width: '100%',
            top: '6px',
            transform: 'rotateZ(-45deg)',
            opacity: '1'
          },
          {
            width: '100%',
            top: '0px',
            transform: 'rotateZ(0deg)',
            opacity: '0'
          },
          {
            width: '100%',
            top: '-6px',
            transform: 'rotateZ(45deg)',
            opacity: '1'
          }
        ],
        arrowLineData: [
          {
            width: '50%',
            top: '3px',
            transform: 'rotateZ(-45deg)',
            opacity: '1'
          },
          {
            width: '100%',
            top: '0px',
            transform: 'rotateZ(0deg)',
            opacity: '1'
          },
          {
            width: '50%',
            top: '-3px',
            transform: 'rotateZ(45deg)',
            opacity: '1'
          }
        ]
      }
    }
  },
  methods: {
    setLineData (e) {
      if (this.showMenu) {
        return
      }
      if (e.type === 'mouseover') {
        this.toggleLineData = this.lineStyle.arrowLineData
      } else {
        this.toggleLineData = this.lineStyle.normalLineData
      }
    },
    toggle () {
      this.showMenu = !this.showMenu
      this.toggleLineData = this.showMenu ? this.lineStyle.closeLineData : this.lineStyle.normalLineData
    }
  },
  created () {
    this.toggleLineData = this.lineStyle.normalLineData
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/style/color.styl'
.article-menu
  position: relative
  width: 320px
  .article-menu-wrap
    position: fixed
    right: 0
    top: 0
    bottom: 0
    width: 320px
    background-color: $color-main
    color: $color-white
    z-index: 1000
    display: flex
    flex-direction: column
    align-items: center
    padding-top: 30px
    overflow: hidden
    .menu-info-head
      margin-bottom: 10px
      > span
        color: #999999
        padding: 5px
        font-weight: bold
        cursor: pointer
        &:hover
        &.active
          color: $color-white
    .content-wrap
      position: relative
      width: 100%
      max-height: calc(100vh - 150px)
      overflow-y: auto
  .toggle
    position: fixed
    width: 24px
    height: 24px
    background-color: $color-main
    right: 10px
    bottom: 45px
    padding: 5px
    z-index: 1050
    cursor: pointer
    line-height: 0
    .toggle-line
      position: relative
      display: inline-block
      vertical-align: top
      width: 100%
      height: 2px
      margin-top: 4px
      background-color: $color-white
      &:first-child
        margin-top: 0px

.slide-fade-enter
.slide-fade-leave-to
  opacity: 0
</style>
