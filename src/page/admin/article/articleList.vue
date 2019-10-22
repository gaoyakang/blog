<template>
  <div id="article-list">
    <p>
      <span @click="$router.go(-1)">
        返回
      </span>
      <span>
        共计:{{ total }}篇
      </span>
    </p>
    <div class="article-table-wrap">
      <el-table
        :data="articleList"
        border
        stripe
        size="mini"
        style="width: 100%">
        <el-table-column
          label="标题"
          min-width="200">
          <template slot-scope="scope">
            <div class="article-title" @click="preview(scope.row)">{{ scope.row.title }}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="封面图"
          width="61">
          <template slot-scope="scope">
            <img
              :src="scope.row.cover"
              style="width: 100%;height: 20px; cursor: pointer"
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          width="128"
          :formatter="formatTime">
        </el-table-column>
        <el-table-column
          prop="publish_time"
          label="发布时间"
          width="128"
          :formatter="formatTime">
        </el-table-column>
        <el-table-column
          prop="update_time"
          label="更新时间"
          width="128"
          :formatter="formatTime">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="70">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status == '0' ? 'success' : 'danger'" size="mini">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="112">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-edit"
              type="primary"
              circle
              @click="edit(scope.row)">
            </el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="under(scope.row)">
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapActions } from 'vuex'
export default {
  name: 'articleList',
  data () {
    return {
      articleList: [],
      total: 0,
      type: '',
      id: ''
    }
  },
  created () {
    this.type = this.$route.query.type
    this.id = this.$route.query.id
    this.getCategoryWithId(this.id)
      .then(data => {
        // console.log(data.data)
        // console.log(data.data.data.list)
        if (data.data.errno === 0) {
          this.total = data.data.data.total
          this.articleList = data.data.data.list
        } else {
          this.$toast('┭┮，没有数据啊~~~', 'error')
        }
      })
      .catch(() => {})
  },
  methods: {
    ...mapActions(['getCategoryWithId', 'deleteArticleWithId']),
    formatTime (row, column, cellValue, index) {
      return cellValue ? moment(parseInt(cellValue)).format('YYYY-MM-DD HH:mm') : '-'
    },
    showDialog (tip, next) {
      this.$confirm(tip, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          next()
        })
        .catch(() => {})
    },
    under (row) {
      let id = row.id
      this.showDialog('此操作为删除, 是否继续?', () => {
        this.deleteArticleWithId(id)
          .then(data => {
            this.$toast('已删除')
          })
          .catch(err => {
            this.$toast(err, 'error')
          })
      })
    },
    edit (row) {
      this.$router.push({
        path: '/admin/article/edit',
        query: {
          id: row.id
        }
      })
    },
    preview (row) {
      this.$router.push({
        path: '/admin/article/preview',
        query: {
          id: row.id
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../assets/style/color.styl'
#article-list
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
    @media (max-width: 760px)
      font-size: 12px
      padding: 18px 5px
    > span
      margin-right: 20px
      cursor: pointer
      font-size: 14px
      @media (max-width: 760px)
        font-size: 12px
        margin-right: 5px
  .article-table-wrap
    width: 100%
    animation: show .8s
    .pagination
      width: 100%
      margin: 20px 0
      display: flex
      justify-content: center
.article-title
  cursor: pointer
  &:hover
    color: #29b6f6
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
