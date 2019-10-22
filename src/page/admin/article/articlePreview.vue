<template>
  <div id="article-preview">
    <p><span @click="$router.go(-1)" style="margin-right: 20px;cursor: pointer;font-size: 14px"><i class="el-icon-arrow-left"></i>返回</span>文章预览</p>
    <div class="article-preview-wrap">
      <div class="article-warp" v-if="article.id">
        <div class="article-message">
          <p class="article-title">
            {{ article.title }}
          </p>
          <div class="article-info" v-if="article.status === 0">
            <span class="info">
              <i class="iconfont icon-calendar"></i>
              <span class="info-item">发表于 {{ article.publish_time }}</span>
            </span>
            <span class="line">|</span>
            <span class="info">
              <i class="iconfont icon-folder"></i>
              <span class="info-item">分类于
                <span class="classify" @click="$router.push({path: '/admin/article/list', query:{type: 'category', id: category.category_id}})">
                  {{ category.category_name }}
                </span>
              </span>
            </span>
          </div>
          <div class="article-sub-message">{{ article.submessage }}</div>
        </div>
        <md-preview :contents="article.html_content" />
      </div>
      <no-data
        class="noDa"
        v-if="!article.id"
        text="没有找到该文章~"/>
    </div>
  </div>
</template>

<script>
import noData from '../../../components/noData'
import mdPreview from '../../../components/mdPreview'
import { mapActions } from 'vuex'
export default {
  name: 'articlePreview',
  components: {
    noData,
    mdPreview
  },
  data () {
    return {
      article: {
        title: ''
      },
      category: {}
    }
  },
  methods: {
    ...mapActions(['getArticleWithId'])
  },
  created () {
    let id = this.$route.query.id
    if (id) {
      this.getArticleWithId(id)
        .then(data => {
          console.log(data.data.data[0])
          this.article = data.data.data[0]
          this.category.category_name = data.data.data[0].category_name
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../assets/style/color.styl'
#article-preview
  position: relative
  padding-top: 52px
  > p
    position: fixed
    width: 100%
    top: 0
    padding: 18px
    font-size: 16px
    font-weight: bold
    background-color: $color-white
    box-shadow: 1px 1px 10px 1px rgba(38, 42, 48, .1)
    z-index: 1000
  .article-preview-wrap
    position: relative
    width: 1000px
    margin: 0 auto
    padding: 30px 10px
    .article-warp
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
          margin: 10px 0px
          color: #999999
          display: flex
          flex-direction: row
          justify-content: center
          align-items: flex-end
          flex-wrap: wrap
          .line
            margin-bottom: 4px
            @media (max-width: 460px)
              display: none
          .info
            margin-bottom: 4px
            margin-left: 4px
            margin-right: 4px
            .info-item
              .classify
                color: #666666
                border-bottom: 1px solid $color-main
                cursor: pointer
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
            .iconfont
              font-size: 14px
              @media (max-width: 768px)
                font-size: 12px
              margin-right: 5px
        .article-sub-message
          font-size: 14px
          color: #999999
          margin-bottom: 20px
    .noDa
      width: 1000px
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
