<template>
  <div class="admin">
    <!-- 后台开始 -->
    <div class="admin-wrap">
      <menu></menu>
      <div class="view-wrap">
        <router-view></router-view>
      </div>
    </div>
    <!-- 后台结束 -->
  </div>
</template>

<script>
export default {
  name: 'admin'
}
</script>

<style lang="stylus" scoped></style>
