<template>
<div class="categories">
  <p class="title">分类</p>
  <div class="categories-wrap">
    <div
      class="category-item"
      v-for="(category, index) in categories"
      :key="index"
      @click="toList('category',category.categoryId)"
    >
      {{category.categoryName}}
      <span>{{category.articleCount}}篇</span>
    </div>
  </div>
</div>
</template>
<script>
import {
  mapActions
} from 'vuex'
export default {
  name: 'categories',
  data () {
    return {
      categories: [],
      tags: []
    }
  },
  methods: {
    ...mapActions([
      'getBlogCategoryList',
      'getBlogTagList'
    ]),
    toList (type, id) {
      this.$router.push({
        path: 'list',
        query: {
          type: type,
          id: id
        }
      })
    }
  },
  created () {
    this.getBlogCategoryList()
      .then((data) => {
        this.categories = data.data.list
      })
      .catch(() => {
        this.categories = []
      })
  }
}
</script>
<style lang="stylus" scoped>
@import '../../../assets/style/color.styl'
.categories
  position: relative
  padding: 30px 10px
  display: flex
  flex-direction: column
  align-items: center
  animation: show .8s
  .title
    font-size: 22px
    font-weight: blod
    margin-bottom: 20px
  .categories-wrap
    max-width: 600px
    display: flex
    flex-direction: row
    flex-wrap: wrap
    margin-bottom: 60px
    align-items: center
    justify-content: center
    .category-item
      padding: 5px 10px
      margin: 5px
      border: 1px solid #eeeeee
      border-radius: 5px
      cursor: pointer
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
      color: $color-main
      transition: all .3s
      font-size: 16px
      @media (max-width: 768px)
        font-size: 14px
      > span
        font-size: 12px
        color: #999999
      &:hover
        background-color: $color-main
        color: $color-white
  .tags-wrap
    max-width: 600px
    display: flex
    flex-direction: row
    flex-wrap: wrap
    margin-bottom: 20px
    align-items: flex-end
    justify-content: center
    .tag-item
      position: relative
      padding: 5px 10px
      margin: 5px
      cursor: pointer
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
      color: $color-main
      &:after
        content: ""
        position: absolute
        bottom: 0px
        left: 0
        width: 100%
        height: 2px
        background-color: $color-main
        visibility: hidden
        transform: scaleX(0)
        transition-duration: .2s
        transition-timing-function: ease
      &:hover
        &:after
          visibility: visible
          transform: scaleX(1)
          transition-duration: .2s
          transition-timing-function: ease
@keyframes show {
  from {
    margin-top: -10px;
    opacity: 0;
  }
  to {
    margin-top: 0px;
    opacity: 1;
  }
}
</style>
