<template>
  <div class="article-menu">
    <ul class="article-menu">
      <li v-for="item of articleMenuSource" :key="item.tag">
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
import {
  mapState
} from 'vuex'
export default {
  name: 'articleMenu',
  components: {
    menuContent
  },
  data () {
    return {
      articleMenuTag: '1.'
    }
  },
  methods: {
    is (item) {
      return item.tag === this.articleMenuTag
    },
    isParent (item) {
      return this.articleMenuTag.indexOf(item.tag) === 0
    }
  },
  computed: {
    ...mapState(['articleMenuSource'])
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/style/color.styl'
.article-menu
  width: 100%
  line-height: 1.8
  font-weight: bold
  font-size: 14px
  color: #999
  > li
    margin-left: 10px
    > span
      cursor: pointer
      transition: all .3s
      border-bottom: 1px solid #555555
      &.active
      &:hover
        color: $color-white
</style>
