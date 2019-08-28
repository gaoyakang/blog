<template>
<div class="article">
  <div class="article-wrap">
    <div class="article-message">
      <p class="article-title">{{article.title}}</p>
      <div class="article-info">
        <span class="classfy" @click="toList('category',category.id)">
          <i class="iconfont">&#xe617;</i>
          {{category.name}}
        </span>
        <span>
          <i class="iconfont">&#xe60f;</i>
          {{article.pageview}}次围观
        </span>
      </div>
      <div class="article-sub-message">{{article.subMessage}}</div>
    </div>
    <md-preview :contents="article.htmlContent"></md-preview>
    <div class="pre-next-wrap">
      <span class="pre-wrap" v-if="pn.pre" @click="goPre">
        <i class="iconfont">&#xe635;</i>
        {{pn.pre.title}}
      </span>
      <span class="next-wrap" v-if="pn.next"  @click="goNext">
        {{pn.next.title}}
        <i class="iconfont">&#xe636;</i>
      </span>
    </div>
  </div>
  <article-menu></article-menu>
  <no-data v-if="!article.id" text="您要找的文章不知去哪儿溜达去了"></no-data>
</div>
</template>
<script>
import {
  mapActions
} from 'vuex'
import noData from '../../../components/noData'
import mdPreview from '../../../components/mdPreview'
import articleMenu from '../../../components/articleMenu'
export default {
  name: 'article',
  data () {
    return {
      article: {},
      category: {},
      tags: [],
      pn: {}
    }
  },
  components: {
    mdPreview,
    articleMenu,
    noData
  },
  methods: {
    ...mapActions(['getBlogArticle']),
    goPre () {
      this.$router.push({
        path: 'article',
        query: {
          id: this.pn.pre.id
        }
      })
      window.scrollTo(0, 0)
    },
    goNext () {
      this.$router.push({
        path: 'article',
        query: {
          id: this.pn.next.id
        }
      })
      window.scrollTo(0, 0)
    },
    toList (type, id) {
      this.$router.push({
        name: 'articleList',
        params: {
          type: type,
          id: id
        }
      })
    },
    initData () {
      this.article = {}
      this.category = {}
      this.tags = []
      let id = this.$route.query.id
      if (id) {
        this.getBlogArticle(id)
          .then((data) => {
            this.article = data.data.article
            this.category = data.data.category
            this.tags = data.data.tags
            this.pn = data.data.pn
          })
          .catch((error) => {
            Promise.reject(error)
          })
      }
    }
  },
  watch: {
    $route (route) {
      this.initData()
    }
  },
  created () {
    this.initData()
  }
}
</script>
<style lang="stylus" scoped>
@import '../../../assets/style/color.styl'
.article
  position: relative
  padding: 30px 10px
  width: 100%
  .article-wrap
    position: relative
    animation: show .8s
    padding: 30px
    width: 100%
    @media (max-width: 768px)
      padding: 30px 15px
    background-color: $color-white
    box-shadow: 0px 0px 5px 0px rgba(38, 42, 48, .1)
    .article-message
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      .article-title
        font-size: 26px
        @media (max-width: 768px)
          font-size: 22px
        font-weight: bold
      .article-info
        font-size: 14px
        @media (max-width: 768px)
          font-size: 12px
        margin: 20px 0px
        color: #666666
        display: flex
        flex-direction: row
        justify-content: center
        flex-wrap: wrap
        .iconfont
          padding-left: 3px
        .classify
          color: #444444
          border-bottom: 1px solid $color-main
          cursor: pointer
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
          margin-right: 5px
          &:hover
            color: $color-main
        .iconfont
          font-size: 14px
          @media (max-width: 768px)
            font-size: 12px
          margin: 0 5px
          &:first-child
            margin-left: 0
      .article-sub-message
        font-size: 14px
        color: #999999
        margin-bottom: 20px
    .money-wrap
      width: 100%
      padding: 20px 30px
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      > p
        line-height: 2
        color: #555555
        font-size: 14px
        margin-top: 20px
        text-align: center
      .money-btn
        margin-top: 10px
        padding: 10px 24px
        background-color: #f44336
        border-radius: 5px
        color: $color-white
        font-size: 16px
        font-weight: bold
        cursor: pointer
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
        transition: background-color .3s
        &:hover
          background-color: lighten(#f44336, 30%)
      .qrcode-wrap
        margin-top: 10px
        display: flex
        flex-direction: row
        justify-content: center
        align-items: center
        flex-wrap: wrap
        .qrcode
          width: 200px
          display: flex
          flex-direction: column
          align-items: center
          justify-content: center
          margin-bottom: 10px
          padding: 10px
          > img
            width: 180px
            height: 180px
          > p
            text-align: center
            line-height: 1.5
            color: #555555
            font-size: 14px
    .tags
      width: 100%
      padding: 10px 0px
      display: flex
      flex-direction: row
      align-items: center
      flex-wrap: wrap
      border-bottom: 1px solid #eeeeee
      .tag
        color: $color-white
        padding: 5px
        background-color: $color-main
        font-size: 12px
        margin-right: 5px
        border-radius: 5px
        position: relative
        margin-left: 10px
        margin-top: 10px
        line-height: 1
        transition: all .3s
        cursor: pointer
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
        &:hover
          &:before
            border-right: 12px solid lighten($color-main, 10%)
          background-color: lighten($color-main, 10%)
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
        .iconfont
          font-size: 12px
    .pre-next-wrap
      width: 100%
      padding-top: 25px
      display: flex
      flex-direction: row
      font-size: 20px
      color: #555555
      font-weight: bold
      margin: 20px
      .pre-wrap
        padding-right: 10px
        text-align: left
      .next-wrap
        padding-left: 10px
        text-align: right
      .pre-wrap,
      .next-wrap
        flex: 1
        cursor: pointer
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
        &:hover
          color: lighten(#555555, 20%)
.slide-fade-enter-active
  transition: all .3s ease
.slide-fade-leave-active
  transition: all .3s ease
.slide-fade-enter
.slide-fade-leave-to
  transform: translateY(20px)
  opacity: 0
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
