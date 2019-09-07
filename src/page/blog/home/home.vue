<template>
<div class="home">
  <!-- 文章列表  -->
  <div class="home">
    <article-card v-for="(article, index) in articleList" :key="index" :article="article"></article-card>
  </div>
  <!-- 分页 -->
  <div class="pagination" v-show="total > 0">
    <el-pagination layout="prev,pager,next" background :page-size="pageSize" :current-page="currentPage" :total="total" @current-change="pageChange"></el-pagination>
  </div>
  <!-- 没有数据时显示 -->
  <no-data v-if="total===0" :text="text"></no-data>
</div>
</template>
<script>
import articleCard from '../../../components/articleCard'
import noData from '../../../components/noData'
import {
  mapActions
} from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      page: 0,
      pageSize: 10,
      currentPage: 0,
      total: 0,
      text: '555,您来到了一片荒芜之地...',
      articleList: []
    }
  },
  components: {
    articleCard,
    noData
  },
  created () {
    this.getList()
  },
  methods: {
    ...mapActions(['getBlogArticleList']),
    pageChange (currentPage) {
      window.scrollTo(0, 0)
      this.page = currentPage - 1
      this.currentPage = currentPage
      this.getList()
    },
    getList () {
      this.getBlogArticleList({
        page: this.page,
        pageSize: this.pageSize
      }).then((data) => {
        console.log(data)
        this.total = data.data.count
        this.articleList = data.data.list
      }).catch(() => {
        this.articleList = []
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../../assets/style/color.styl'
.home
  position: relative
  padding: 30px 10px
  min-height: 100px
  .pagination
    width: 100%
    padding: 10px 0
    display: flex
    display: -webkit-flex
    flex-direction: row
    justify-content: center
    background-color: $color-white
</style>
