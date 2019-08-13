<template>
  <div class="article-menu">
    <ul class="article-menu">
      <li v-for="item of menu" :key="item.tag">
        <span :class="{'active': is(item) || isParent(item)}">
          {{ item.tag }} {{ item.title }}
        </span>
        <menu-content :menu="item.children"></menu-content>
      </li>
    </ul>
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
  methods: {
    is (item) {
      return item.tag === this.articleMenuTag
    },
    isParent (item) {
      return this.articleMenuTag.indexOf(item.tag) === 0
    }
  },
  mounted () {
    console.log(this.menu)
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/style/color.styl'
</style>
