<template>
<div class="article" v-loading='loading'>
  <div class="article-wrap">
    <div class="article-message">
      <p class="article-title">{{this.article.title}}</p>
      <div class="article-info">
        <span class="classfy" @click="toList('category',category.id)">
          <i class="iconfont">&#xe617;</i>
          分类名字
        </span>
      </div>
      <div class="article-sub-message">{{this.article.subMessage}}</div>
    </div>
    <md-preview :contents="this.article.html_content"></md-preview>
    <!-- <div class="pre-next-wrap">
      <span class="pre-wrap" v-if="pn.pre" @click="goPre">
        <i class="iconfont">&#xe635;</i>
        {{pn.pre.title}}
      </span>
      <span class="next-wrap" v-if="pn.next"  @click="goNext">
        {{pn.next.title}}
        <i class="iconfont">&#xe636;</i>
      </span>
    </div> -->
  </div>
  <article-menu></article-menu>
  <no-data v-if="!this.article.id" text="您要找的文章不知去哪儿溜达去了"></no-data>
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
      loading: false,
      article: {
        id: '',
        title: '',
        subMessage: ''
      },
      category: {
        id: '',
        name: ''
      },
      pn: {}
    }
  },
  components: {
    mdPreview,
    articleMenu,
    noData
  },
  watch: {
    $route (route) {
      this.initData()
    }
  },
  created () {
    this.initData()
  },
  methods: {
    ...mapActions(['getBlogArticleWithId', 'getCategoryNameWithId']),
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
      let id = this.$route.query.id
      this.article = {}
      this.category = {}
      this.article.id = id
      if (id) {
        this.loading = true
        this.getBlogArticleWithId(id)
          .then((data) => {
            let result = data.data[0]
            // console.log(result)
            this.article.title = result.title
            this.article.subMessage = result.submessage
            this.category.id = result.category_id
            this.article.html_content = result.html_content
            this.loading = false
            // return Promise.resolve(data.data[0].category_id)
          })
          .catch((error) => {
            Promise.reject(error)
          })
      }
    }
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
    background-color: $color-white
    box-shadow: 0px 0px 5px 0px rgba(38, 42, 48, .1)
    .article-message
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      .article-title
        font-size: 26px
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
