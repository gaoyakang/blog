<template>
  <div class="article-card">
    <div class="article-card-wrap">
      <!-- 封面 -->
      <div class="article-cover" :style="{background: 'url(' + getCover + ') no-repeat center'}">
        <div class="article-title">
          <span @click="showArticle">{{this.article.article.title}}</span>
        </div>
      </div>
      <!-- 文章信息 -->
      <div class="article-info">
        <i class="iconfont">&#xe654;</i>
        <span>发表于:{{ this.formatTime(this.article.article.publishTime) }}</span>
      </div>
      <!-- 文章副标题 -->
      <div class="article-sub-message">{{ this.article.article.submessage }}</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'articleCard',
  props: ['article'],
  data () {
    return {
      defaultCover: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4094515638,4231758982&fm=26&gp=0.jpg'
    }
  },
  methods: {
    formatTime (time) {
      return moment(time).format('YYYY-MM-DD')
    },
    showArticle () {
      this.$router.push({
        path: '/article',
        query: {
          id: this.article.article.id
        }
      })
    },
    toList (type, id) {
      this.$router.push({
        path: '/list',
        query: {
          type: type,
          id: id
        }
      })
    }
  },
  watch: {
    '$route' (to, from) {
      this.$router.go(0)
    }
  },
  computed: {
    getCover () {
      if (this.article && this.article.article && this.article.article.cover) {
        return this.article.article.cover
      }
      return this.defaultCover
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/style/color.styl'
.article-card
  width: 100%
  position: relative
  background-color: $color-white
  padding: 20px
  box-shadow: 0px 0px 5px 0px rgba(38, 42, 48, .1)
  min-height: 603px
  line-height: 1
  animation: show .8s
  margin-top: -30px
  .article-card-wrap
    position: relative
    .article-cover
      position: relative
      width: 100%
      background-position: center
      &:before
        top: 0
        left: 0
        width: 100%
        padding-top: 50%
        content: ' '
        background: rgba(0, 0, 0, .3)
        display: block
      .article-title
        position: absolute
        font-size: 24px
        width: 100%
        height: 100%
        top: 0
        left: 0
        font-weight: bold
        color: $color-white
        display: flex
        align-items: center
        justify-content: center
        padding: 10px
        span
          position: relative
          cursor: pointer
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
          &:after
            content: ""
            position: absolute
            bottom: 0px
            left: 0
            width: 100%
            height: 2px
            background-color: $color-white
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
    .article-info
      font-size: 14px
      margin: 20px 0px
      color: #666666
      display: flex
      flex-direction: row
      justify-content: center
      flex-wrap: wrap
      .iconfont
        margin-right: 4px
      .middle
        margin: 0 6px
    .article-sub-message
      color: #666666
      border-left: 2px solid #666666
      padding: 20px
      font-size: 16px
      margin-bottom: 15px
      letter-spacing: 1px
      line-height: 20px
    .tags
      width: 100%
      padding: 10px 0px
      display: flex
      flex-direction: row
      align-items: center
      flex-wrap: wrap
      border-bottom: 1px solid #eeeeee
      margin-bottom: 10px
      color: #000
      .tag
        color: $color-white
        padding: 5px
        background-color: $color-main
        font-size: 12px
        margin-right: 5px
        border-radius: 5px
        transition: all .3s
        position: relative
        margin-left: 10px
        margin-top: 10px
        line-height: 1
        cursor: pointer
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
        &:hover
          &:before
            border-right: 12px solid lighten($color-main, 20%)
          background-color: lighten($color-main, 20%)
        &:before
          position: absolute
          left: -9px
          top: 0
          width: 0
          height: 0
          content: ""
          border-top: 11px solid transparent
          border-bottom: 11px solid transparent
          border-right: 12px solid $color-main
          transition: all .3s
@keyframes show {
  from {
    margin-top: -10px
    opacity: 0
  }
  to {
    margin-top: 0px
    opacity: 1
  }
}
</style>
