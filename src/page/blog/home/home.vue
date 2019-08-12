<template>
<div class="home">
  <!-- 文章列表  -->
  <div class="home" v-show="total > 0">
    <article-card v-for="(article,index) in articleList" :key="index" :article="article"></article-card>
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
export default {
  name: 'home',
  data () {
    return {
      pageSize: 1,
      currentPage: 1,
      total: 1,
      text: '555,您来到了一片荒芜之地...',
      articleList: [
        {
          id: '22536',
          title: 'vue+express+mysql开发博客',
          publishTime: '2019年1月1日',
          pageview: '2000',
          subMessage: '基于vue+express+mysql开发的个人博客',
          category: {
            name: '游戏开发'
          },
          tags: [
            {
              id: '001',
              name: '全栈开发'
            },
            {
              id: '002',
              name: 'vue'
            }
          ]
        },
        {
          id: '22536',
          title: 'vue+express+mysql开发博客',
          publishTime: '2019年1月1日',
          pageview: '2000',
          subMessage: '基于vue+express+mysql开发的个人博客',
          category: {
            name: '游戏开发'
          },
          tags: [
            {
              id: '001',
              name: '全栈开发'
            },
            {
              id: '002',
              name: 'vue'
            }
          ]
        },
        {
          id: '22536',
          title: 'vue+express+mysql开发博客',
          publishTime: '2019年1月1日',
          pageview: '2000',
          subMessage: '基于vue+express+mysql开发的个人博客',
          category: {
            name: '游戏开发'
          },
          tags: [
            {
              id: '001',
              name: '全栈开发'
            },
            {
              id: '002',
              name: 'vue'
            }
          ]
        }
      ]
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
    pageChange (currentPage) {
      this.page = currentPage - 1
      this.currentPage = currentPage
    },
    getList () {
      this.getBlogArticleList({
        page: this.page,
        pageSize: this.pageSize
      }).then((data) => {
        this.total = data.count
        this.articleList = data.list
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
