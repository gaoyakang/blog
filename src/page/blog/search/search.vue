<template>
<div class="search">
  <div class="search-input-wrap">
    <input
      type="search"
      class="search-real-input"
      id="search-input"
      v-model="searchValue"
      placeholder="输入关键字搜索..."
      @keyup.enter="toSearch()"
    >
  </div>
  <div class="search-article-wrap">
    <article-card2
      v-for="(article, index) in articleList"
      :key="index"
      :article="article"
    ></article-card2>
  </div>
  <!-- 分页 -->
  <div class="pagination" v-show="total > 0">
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :current-page="currentPage"
      :total="total"
      @current-page="pageChange"
    ></el-pagination>
  </div>
  <!-- 无数据 -->
  <no-data v-if="total === 0" text="呜呜呜，木有内容啊~"></no-data>
</div>
</template>
<script>
import {
  mapActions
} from 'vuex'
import articleCard2 from '../../../components/articleCard2'
import noData from '../../../components/noData'

export default {
  name: 'search',
  data () {
    return {
      searchValue: '',
      total: 0,
      articleList: [],
      page: 0,
      pageSize: 15,
      currentPage: 0,
      type: 'category'
    }
  },
  components: {
    articleCard2,
    noData
  },
  mounted () {
    this.init()
  },
  methods: {
    ...mapActions(['searchArticle']),
    init () {
      this.searchValue = this.$route.query.value
      this.total = 0
      this.articleList = []
      this.page = 0
      if (this.searchValue || this.searchValue === '0') {
        this.getList()
      } else {
        document.getElementById('search-input').focus()
      }
    },
    getList () {
      this.searchArticle({
        searchValue: this.searchValue,
        page: this.page,
        pageSize: this.pageSize
      })
        .then((data) => {
          this.total = data.data.data.length
          this.articleList = data.data.data
        })
        .catch(() => {
          this.articleList = []
        })
    },
    toSearch () {
      if (this.searchValue === '') {
        this.$toast('搜索内容不能为空', 'error')
        return
      }
      this.$router.push({
        path: '/search',
        query: {
          value: this.searchValue
        }
      })
    },
    pageChange (currentPage) {
      this.page = currentPage - 1
      this.currentPage = currentPage
      this.getList()
    }
  },
  watch: {
    $route (route) {
      this.init()
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../../assets/style/color.styl'
.search
  position: relative
  padding: 30px 10px
  display: flex
  flex-direction: column
  align-items: center
  .pagination
    width: 100%
    padding: 10px 0
    display: flex
    display: -webkit-flex
    flex-direction: row
    justify-content: center
    background-color: $color-white
  .search-input-wrap
    width: 100%
    max-width: 900px
    height: 30px
    border-radius: 5px
    border: 1px solid #eeeeee
    .search-real-input
      width: 100%
      height: 28px
      padding: 5px 10px
      border-radius: 5px
      border: none
      font-size: 14px
      background-color: $color-white
      &::placeholder
        color: $text-tip
  .search-article-wrap
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
