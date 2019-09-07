<template>
  <div id="article-manage">
    <p>文章管理（共计：{{ total }}篇）</p>
    <div class="article-table-wrap">
      <el-table
        :data="articleList"
        border
        stripe
        size="mini"
        style="width: 100%">
        <el-table-column
          label="标题"
          show-overflow-tooltip
          min-width="200">
          <template slot-scope="scope">
            <div class="article-title" @click="preview(scope.row)">{{ scope.row.title || '未填写标题' }}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="封面图"
          width="61">
          <template slot-scope="scope">
            <img
              v-if="scope.row.cover"
              :src="scope.row.cover"
              style="width: 100%;height: 20px; cursor: pointer"
              @click="previewImg">
          </template>
        </el-table-column>
        <el-table-column
          prop="categoryName"
          label="分类"
          show-overflow-tooltip
          width="120">
        </el-table-column>
        <el-table-column
          prop="pageview"
          label="阅读量"
          width="60">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="128"
          :formatter="formatTime">
        </el-table-column>
        <el-table-column
          prop="publishTime"
          label="发布时间"
          width="128"
          :formatter="formatTime">
        </el-table-column>
        <el-table-column
          prop="updateTime"
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
              {{ formatStatus(scope.row.status) }}
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
      <!-- 分页 -->
      <div
        class="pagination"
        v-show="articleList.length > 0">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          @current-change="pageChange"
          :current-page="currentPage"
          :total="total">
        </el-pagination>
      </div>
      <!-- 分页 结束 -->
    </div>
  </div>
</template>
<script>
// import moment from 'moment'
export default {
  name: 'articleManage',
  data () {
    return {
      total: 0,
      articleList: [],
      page: 0,
      pageSize: 15,
      currentPage: 0
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../assets/style/color.styl'
#article-manage
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
