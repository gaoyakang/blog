<template>
<div class="menu-list" :style="{width: collapseMenu ? '64px' : '240px'}">
    <div class="wrap">
    <el-menu
      router
      class="menu"
      background-color="#262a30"
      text-color="#a7b1c2"
      :default-active="$route.path"
      :collapse="collapseMenu">
      <el-menu-item index="/admin">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span slot="title">文章</span>
        </template>
        <el-menu-item index="/admin/article/edit">写文章</el-menu-item>
        <el-menu-item index="/admin/article/manage">文章管理</el-menu-item>
        <!-- <el-menu-item index="/admin/article/drafts">草稿箱</el-menu-item> -->
        <!-- <el-menu-item index="/admin/article/deleted">回收站</el-menu-item> -->
      </el-submenu>
      <el-menu-item index="/admin/categories">
        <i class="el-icon-menu"></i>
        <span slot="title">分类</span>
      </el-menu-item>
      <!-- <el-submenu index="4">
        <template slot="title">
          <span slot="title">网站配置</span>
        </template>
        <el-menu-item index="/admin/webConfig">基本配置</el-menu-item>
        <el-menu-item index="/admin/webConfig/about">关于我</el-menu-item>
        <el-menu-item index="/admin/webConfig/resume">我的简历</el-menu-item>
        <el-menu-item index="/admin/webConfig/friends">友链管理</el-menu-item>
      </el-submenu> -->
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-more"></i>
          <span slot="title">其他</span>
        </template>
        <el-menu-item :route="$route.path" index="0" @click="signOut">退出</el-menu-item>
      </el-submenu>
    </el-menu>
    <div class="collapse-wrap" @click="toggleCollapse" @mouseover="setLineData" @mouseout="setLineData">
      <span
        class="collapse-line"
        v-for="(line, index) in toggleLineData"
        :key="index"
        :style="{
          width: line.width,
          top: line.top,
          transform: line.transform,
          opacity: line.opacity
        }">
      </span>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'leftMenu',
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
  methods: {
    toggleCollapse () {
      this.collapseMenu = !this.collapseMenu
      this.toggleLineData = this.collapseMenu ? this.lineStyle.arrowRightLineData : this.lineStyle.arrowLeftLineData
    },
    setLineData (e) {
      if (e.type === 'mouseover') {
        this.toggleLineData = this.collapseMenu ? this.lineStyle.arrowRightLineData : this.lineStyle.arrowLeftLineData
      } else {
        this.toggleLineData = this.lineStyle.normalLineData
      }
    },
    signOut () {
      window.localStorage.removeItem('token')
      this.$router.push('/login')
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
  background-color: red
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
