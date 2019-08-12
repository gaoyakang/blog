<template>
  <div class="no-data">
    <img src="../assets/img/nodata.png" class="default-img">
    <p>{{text}}</p>
  </div>
</template>

<script>
export default {
  name: 'noData',
  props: ['text']
}
</script>

<style lang="stylus" scoped>
@import '../assets/style/color.styl'
.no-data
  width: 100%
  height: 100%
  background-color: $color-white
  font-size: 16px
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  min-height: 450px
  .default-img
    width: 240px
    height: 190px
  p
    color: #aaa
</style>
