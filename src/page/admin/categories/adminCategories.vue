<template>
  <div id="category">
    <p>分类</p>
    <div class="category-wrap">
      <div class="table-wrap">
        <div class="action-btn-wrap">
          <span @click="newCategory">新增分类</span>
        </div>
        <el-table :data="catetoryList" border stripe size="mini" style="width: 100%">
          <el-table-column label="分类名称" show-overflow-tooltip min-width="120">
            <template slot-scope="scope">
              <div class="title" @click="toList('catetory', scope.row.categoryId)">{{ scope.row.categoryName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="文章数" prop="articleCount" width="60"></el-table-column>
          <el-table-column label="创建时间" prop="createTime" width="128" :formatter="formatTime"></el-table-column>
          <el-table-column label="更新时间" prop="updateTime" width="128" :formatter="formatTime"></el-table-column>
          <el-table-column label="状态" prop="status" width="70">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status == '0' ? 'success' : 'danger'" size="mini">{{ formatStatus(scope.row.status) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="updateTime" width="112" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" icon="el-icon-edit" type="primary" circle v-if="scope.row.canDel === '1'" @click="editCategory(scope.row)"></el-button>
              <el-button size="mini" icon="el-icon-delete" type="primary" circle v-if="scope.row.canDel === '1'" @click="underCategory(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'adminCategories',
  data () {
    return {
      catetoryList: [],
      tagList: []
    }
  },
  methods: {
    formatTime (row, column, cellValue, index) {
      return cellValue ? moment(parseInt(cellValue) * 1000).format('YYYY-MM-DD HH:mm') : '-'
    },
    newCategory () {},
    toList (type, id) {},
    editCategory (category) {},
    underCategory () {}
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../assets/style/color.styl'
#category
  position: relative
  width: 1300px
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
  .category-wrap
    position: relative
    width: 100%
    animation: show .8s
    display: flex
    flex-direction: row
    flex-wrap: wrap
    margin: 10px
    .table-wrap
      position: relative
      width: calc(50% - 10px)
      margin: 5px
      transition: all .3s
      @media (max-width: 1009px)
        width: calc(100% - 10px)
      .action-btn-wrap
        position: relative
        background-color: #eeeeee
        padding: 5px
        > span
          display: inline-block
          padding: 8px 10px
          font-size: 14px
          cursor: pointer
          background-color: $color-main
          color: $color-white
          border-radius: 8px
          &:hover
            background-color: lighten($color-main, 10%)
.title
  cursor: pointer
  &:hover
    color: #29b6f6

@keyframes show {
  from {
    margin-top: 0px;
    opacity: 0;
  }
  to {
    margin-top: 10px;
    opacity: 1;
  }
}
</style>

<style lang="stylus">
.el-message-box__wrapper
  .el-message-box
    width: auto !important
    max-width: calc(100% - 40px)
    .el-message-box__content
      font-size: 14px
      @media (max-width: 760px)
        font-size: 12px
</style>
