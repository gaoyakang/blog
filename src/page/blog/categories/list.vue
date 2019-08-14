<template>
<div class="list">
  <div class="list-wrap">
    <article-card2
      v-for="(article, index) in articleList"
      :key="index"
      :article="article"
    ></article-card2>
  </div>
  <div class="pagination" v-show="total > 0">
    <el-pagination background layout="prev, pager, next" :page-size="pageSize" :current-page="currentPage" :total="total" @current-change="pageChange">
    </el-pagination>
  </div>
  <no-data v-if="total === 0" text="呜呜呜，找不到了"></no-data>
</div>
</template>
<script>
import articleCard2 from '../../../components/articleCard2'
import noData from '../../../components/noData'
import {
  mapActions
} from 'vuex'
export default {
  name: 'list',
  data () {
    return {
      page: 0,
      pageSize: 15,
      currentPage: 0,
      total: 0,
      type: 'category',
      id: '',
      articleList: []
    }
  },
  watch: {
    $route (route) {
      this.init()
    }
  },
  created () {
    this.init()
  },
  methods: {
    ...mapActions(['getBlogArticleList']),
    pageChange (currentPage) {
      this.page = currentPage - 1
      this.currentPage = currentPage
      this.getList()
    },
    init () {
      this.type = this.$route.query.type
      this.id = this.$route.query.id
      if (this.type !== 'category' && this.type !== 'tag') {
        this.type = 'category'
      }
      this.total = 0
      this.articleList = []
      this.page = 0
      this.getList()
    },
    getList () {
      this.getBlogArticleList({
        by: this.type,
        categoryId: this.id,
        tagId: this.id,
        page: this.page,
        pageSize: this.pageSize
      })
        .then((data) => {
          this.total = data.data.total
          this.articleList = data.data.list
        })
        .catch(() => {
          this.articleList = []
        })
    }
  },
  components: {
    articleCard2,
    noData
  }
}
</script>
<style lang="stylus" scoped>
.list
  position: relative
  padding: 30px 10px
  .pagination
    width: 100%
    padding: 10px 0
    display: flex
    display: -webkit-flex
    flex-direction: row
    justify-content: center
    background-color: $color-white
  .list-wrap
    position: relative
    width: 100%
    padding: 10px 30px
    animation: show .8s
    @media (max-width: 768px)
      padding: 5px
    .time-line
      position: absolute
      left: 30px
      @media (max-width: 768px)
        left: 5px
      top: 15px
      bottom: 0
      width: 2px
      background-color: #eeeeee
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
