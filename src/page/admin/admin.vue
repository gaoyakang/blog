<template>
  <div class="admin">
    <!-- 后台开始 -->
    <div class="admin-wrap">
      <div class="view-wrap">
        <router-view name="login"></router-view>
        <router-view name="register"></router-view>
        <router-view name="leftMenu" class="menu"></router-view>
        <router-view name="adminHome"></router-view>
        <router-view name="articleManage"></router-view>
        <router-view name="articleEdit"></router-view>
        <router-view name="articleDeleted"></router-view>
        <router-view name="articleDrafts"></router-view>
        <router-view name="articleList"></router-view>
        <router-view name="articlePreview"></router-view>
        <router-view name="adminCategories"></router-view>
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

<style lang="stylus" scoped>
.view-wrap
  display: flex
  .menu
    flex: flex-start
  .adminHome
    flex: 1
  .articleManage
    flex: 1
  .articleEdit
    flex: 1
  .articleDeleted
    flex: 1
  .articleDrafts
    flex: 1
  .adminCategories
    flex: 1
</style>
