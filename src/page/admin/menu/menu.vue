<template>
  <div class="menu-list">
    <div class="wrap">
      menu
    </div>
  </div>
</template>

<script>
export default {
  name: 'menu',
  data () {
    return {
      collapseMenu: false,
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
        arrowLeftLineData: [
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
        ],
        arrowRightLineData: [
          {
            width: '50%',
            top: '3px',
            transform: 'translateX(7px) rotateZ(45deg)',
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
            transform: 'translateX(7px) rotateZ(-45deg)',
            opacity: '1'
          }
        ]
      },
      toggleLineData: []
    }
  },
  created () {
    this.toggleLineData = this.lineStyle.normalLineData
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../assets/style/color.styl'
.menu-list
  position: relative
  height: 100%
  width: 64px
  z-index: 1100
  transition: width .5s
  .wrap
    position: fixed
    height: 100%
    .menu
      position: relative
      height: 100%
      font-weight: bold
      padding-bottom: 30px
      &:not(.el-menu--collapse)
        width: 240px
    .collapse-wrap
      position: absolute
      width: 24px
      height: 24px
      background-color: $color-main
      right: 20px
      bottom: 15px
      padding: 5px
      z-index: 1050
      cursor: pointer
      line-height: 0
      .collapse-line
        position: relative
        display: inline-block
        vertical-align: top
        width: 100%
        height: 2px
        margin-top: 4px
        background-color: $color-white
        transition: all .3s
        &:first-child
          margin-top: 0px
</style>

<style lang="stylus">
.el-menu-item
.el-submenu__title
  font-size: 14px !important
  &.is-active
    background-color: rgb(30, 34, 38) !important
  .iconfont
    margin-right: 10px !important
    font-size: 14px !important
</style>
