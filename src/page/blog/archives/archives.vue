<template>
  <div class="archives">
    <div class="archives-wrap">
      <div class="time-line"></div>
      <div class="list-content">
        <p class="normal-node">目前共计{{total}}篇文章~</p>
        <div
          class="bold-node"
          v-for="(year,key,index) in archives"
          :key="index">
          <p>{{key}}</p>
        <div
          class="bold-node month"
          v-for="(month, key, index) in year"
          :key="index">
          <p>{{key}}</p>
          <article-card2
            v-for="(article, index) in month"
            :key="index"
            :article="article"></article-card2>
        </div>
        </div>
      </div>
    </div>
    <div class="pagination" v-show="total > 0">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :current-page="currentPage"
        :total="total"
        @current-change="pageChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import {
  mapActions
} from 'vuex'
import articleCard2 from '../../../components/articleCard2'
export default {
  name: 'archives',
  components: {
    articleCard2
  },
  data () {
    return {
      page: 0,
      pageSize: 15,
      currentPage: 0,
      total: 0,
      archives: []
    }
  },
  methods: {
    ...mapActions(['getBlogArticleArchives']),
    pageChange (currentPage) {
      this.page = currentPage - 1
      this.currentPage = currentPage
      this.getList()
    },
    getList () {
      this.getBlogArticleArchives({
        page: this.page,
        pageSize: this.pageSize
      })
        .then((data) => {
          this.total = data.data.count
          this.archives = data.data.list
          console.log(data.data)
        })
        .catch(() => {
          this.archives = []
        })
    }
  },
  created () {
    this.page = 0
    this.getList()
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../assets/style/color.styl'
.archives
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
  .archives-wrap
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
    .list-content
      .normal-node
        position: relative
        color: #555555
        padding: 0 15px
        font-size: 16px
        margin-bottom: 20px
        @media (max-width: 768px)
          font-size: 14px
        &:before
          position: absolute
          left: -4px
          top: 5px
          content: ""
          width: 10px
          height: 10px
          border-radius: 10px
          background-color: #999999
          @media (max-width: 768px)
            left: -3px
            top: 4px
            width: 8px
            height: 8px
            border-radius: 8px
      .bold-node
        position: relative
        color: #555555
        padding: 0 15px
        font-size: 28px
        margin-bottom: 20px
        @media (max-width: 768px)
          font-size: 22px
        &:before
          position: absolute
          left: -4px
          top: 10px
          content: ""
          width: 10px
          height: 10px
          border-radius: 10px
          background-color: #999999
          @media (max-width: 768px)
            left: -3px
            top: 8px
            width: 8px
            height: 8px
            border-radius: 8px
        > p
          margin-bottom: 20px
        .month
          color: #666666
          font-size: 26px
          @media (max-width: 768px)
            font-size: 20px
          &:before
            left: -19px
            @media (max-width: 768px)
              left: -18px
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
