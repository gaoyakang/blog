<template>
  <div
    class="icon-card"
    :style="{backgroundColor:backgroundColor}"
    @click="$router.push({path: to})"
  >
    <span class="content">{{middleMessage}}/{{bottomMessage}}</span>
  </div>
</template>

<script>
export default {
  name: 'iconCard',
  props: ['topMessage', 'middleMessage', 'bottomMessage', 'backgroundColor', 'to']
}
</script>

<style lang="stylus" scoped>
@import '../../../../assets/style/color.styl'
.icon-card
  position: relative
  width: 45%
  height: 120px
  border-radius: 5px
  margin: 5px
  display: flex
  justify-content: center
  align-items: center
  cursor: pointer
  &:hover
    box-shadow: 0px 0px 5px 0px rgba(38, 42, 48, .3)
  .content
    margin: 0 20px
    padding: 30px
    text-align: center
    color: #f9f9f9
    font-size: 16px
    font-weight: bold
    color: $color-white
</style>
