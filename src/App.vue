<template>
  <div id="app">
    <div class="content-wrap">
      <m-header></m-header>
      <div class="view-wrap">
        <router-view></router-view>
      </div>
      <m-footer></m-footer>
    </div>
  </div>
</template>

<script>
import mHeader from './components/mHeader'
import mFooter from './components/mFooter'

export default {
  name: 'App',
  components: {
    mHeader,
    mFooter
  }
}
</script>

<style lang="stylus" scoped>
.view-wrap
  width: 100%
</style>
