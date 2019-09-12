<template>
  <div class="article-edit">
    <div class="header-wrap">
      编辑文章
      <div class="action-btn-wrap">
        <span @click="publish">发布</span>
        <span>提交</span>
        <span @click="save">保存</span>
      </div>
    </div>
    <div class="edit-wrap">
      <mavon-editor
        class="editor"
        v-model="article.content"
        ref=md
        :boxShadow="false"
        defaultOpen="edit"
        :toolbars="{
          bold: true,
          italic: true,
          header: true,
          underline: true,
          strikethrough: true,
          mark: true,
          superscript: true,
          subscript: true,
          quote: true,
          ol: true,
          ul: true,
          link: true,
          imagelink: true,
          code: true,
          table: true,
          fullscreen: false,
          readmodel: true,
          htmlcode: false,
          help: true,
          undo: true,
          redo: true,
          trash: true,
          save: false,
          navigation: false,
          alignleft: false,
          aligncenter: false,
          alignright: false,
          subfield: true,
          preview: true
        }"
      ></mavon-editor>
      <div class="input-wrap">
        <div class="fix-input-wrap">
          <up-cover
            class="upload-cover"
            :default-img="article.cover"
            ratio="2"
            WHRatio="2"
            maxWidth="300"
            maxHeight="150"
            tip="上传文章封面图"
            maxSize="2"
          >
          </up-cover>
          <el-input class="input-title" size="mini" v-model="article.title" placeholder="请输入文章标题"></el-input>
          <el-input class="input-title" type="textarea" size="mini" :rows="6" :maxlength="150" resize="none" v-model="article.subMessage" placeholder="请输入文章简介"></el-input>
          <div class="label-wrap">
            分类
            <el-select v-model="category" filterable allow-create default-first-option size="mini" placeholder="请选择文章分类">
              <el-option
                size="mini"
                v-for="item in categoryList"
                :key="item.categoryId"
                :label="item.categoryName"
                :value="item.categoryName"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import upCover from '../../../components/upCover'
import { markdown } from '../../../util/markdown'
import { mapActions } from 'vuex'
export default {
  name: 'articleEdit',
  components: {
    mavonEditor,
    upCover
  },
  data () {
    return {
      article: {
        content: '',
        cover: 'http://blogimg.codebear.cn/FsbffUDKA0bKZevMAee-Ve0uBuWK',
        title: '',
        subMessage: ''
      },
      categoryList: [],
      category: ''
    }
  },
  watch: {
    $route (route) {
      this.init()
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    ...mapActions(['saveArticle', 'getArticleWithId', 'publishArticle']),
    init () {
      let id = this.$route.query.id
      this.article = {
        content: '',
        cover: '',
        title: '',
        subMessage: ''
      }
      if (id) {
        this.getArticleWithId(id)
          .then(data => {
            data = data.data.data[0]
            this.article = {
              title: data.title,
              subMessage: data.subMessage
            }
          })
          .catch(() => {})
      }
    },
    getCategory () {
      return {
        name: this.category || ''
      }
    },
    markdownHtml (str) {
      return markdown(str)
    },
    getParams () {
      let html = this.markdownHtml(this.article.content)
      let params = {
        title: this.article.title,
        cover: this.article.cover,
        subMessage: this.article.subMessage,
        content: this.article.content,
        htmlContent: html
      }
      params.category = this.getCategory()
      if (this.$route.query.id) {
        params.id = this.$route.query.id
      }
      return params
    },
    save () {
      let params = this.getParams()
      this.saveArticle(params)
        .then(data => {
          this.$toast('已保存', 'success')
          this.$router.push({
            path: '/admin/article/edit',
            query: {
              id: data.data.data
            }
          })
        })
        .catch(error => {
          this.$toast(error, 'error')
        })
    },
    publish () {
      let params = this.getParams()
      if (!params.title) {
        this.$toast('文章标题不能为空', 'error')
        return
      }
      if (!params.subMessage) {
        this.$toast('文章简介不能为空', 'error')
        return
      }
      if (!params.content) {
        this.$toast('文章内容不能为空', 'error')
        return
      }
      this.publishArticle(params)
        .then(data => {
          console.log(data)
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../assets/style/color.styl'
.article-edit
  position: relative
  padding-top: 52px
  .header-wrap
    position: absolute
    width: 100%
    top: 0
    padding: 18px
    font-size: 16px
    font-weight: bold
    background-color: $color-white
    box-shadow: 1px 1px 10px 1px rgba(38, 42, 48, .1)
    z-index: 1000
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center
    .action-btn-wrap > span
      padding: 5px 10px
      margin-right: 5px
      font-size: 14px
      cursor: pointer
      background-color: $color-main
      color: $color-white
      border-radius: 8px
      &:hover
        background-color: lighten($color-main, 10%)
      &:last-child
        margin-right: 0px
  .edit-wrap
    padding: 30px 10px
    padding-top: 10px
    animation: show .8s
    display: flex
    flex-direction: row
    @media (max-width: 1324px)
      flex-direction: column-reverse
    .input-wrap
      position: relative
      width: 300px
      margin-left: 10px
      transition: all .3s
      @media (max-width: 1324px)
        width: 100%
        margin-left: 0px
        margin-bottom: 10px
      .fix-input-wrap
        position: relative
        width: 300px
        height: calc(100vh - 112px)
        transition: all .3s
        display: flex
        flex-direction: column
        align-items: center
        @media (max-width: 1324px)
          width: 100%
          height: auto
        .upload-cover
          margin-bottom: 10px
        .input-title
          margin-bottom: 10px
        .label-wrap
          color: #606266
          font-size: 14px
          width: 100%
          margin-bottom: 10px
          .el-select
            width: calc(100% - 46.7px) !important
    .editor
      min-width: calc(100% - 310px)
      height: calc(100vh - 112px)
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

<style lang="stylus">
.v-note-wrapper
  z-index: 1 !important
[type="button"]
  -webkit-appearance: none
</style>