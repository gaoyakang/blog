<template>
  <div id="app">
    <!-- 前台开始 -->
    <blog></blog>
    <!-- 前台结束 -->
    <!-- 后台开始 -->
    <admin></admin>
    <!-- 后台结束 -->
  </div>
</template>

<script>
import blog from './page/blog/blog'
import admin from './page/admin/admin'

export default {
  name: 'App',
  components: {
    blog,
    admin
  }
}
</script>

<style lang="stylus" scoped></style>
