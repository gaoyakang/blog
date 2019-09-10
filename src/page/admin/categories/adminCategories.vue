<template>
  <div id="category">
    <p>分类</p>
    <div class="category-wrap">
      <div class="table-wrap">
        <div class="action-btn-wrap">
          <span @click="newCategory">新增分类</span>
        </div>
        <el-table :data="catetoryList" border stripe size="medium" style="width: 100%">
          <el-table-column label="分类名称" prop="category_name" width="120">
            <template slot-scope="scope">
              <div class="title" @click="toList('catetory', scope.row.id)">{{scope.row.category_name}}</div>
            </template>
          </el-table-column>
          <el-table-column label="文章数" prop="article_count" width="60"></el-table-column>
          <el-table-column label="创建时间" prop="create_time" width="128" :formatter="formatTime"></el-table-column>
          <el-table-column label="更新时间" prop="update_time" width="128" :formatter="formatTime"></el-table-column>
          <el-table-column label="状态" prop="status" width="70">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status === '0' ? 'success' : 'danger'" size="mini">{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="updateTime" width="112" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" icon="el-icon-edit" type="primary" circle v-if="scope.row.can_del === '1'" @click="editCategory(scope.row)"></el-button>
              <el-button size="mini" icon="el-icon-delete" type="primary" circle v-if="scope.row.can_del === '1'" @click="deleteCate(scope.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'
export default {
  name: 'adminCategories',
  data () {
    return {
      catetoryList: [],
      tagList: []
    }
  },
  mounted () {
    this.getCateList()
  },
  methods: {
    ...mapActions(['addCategory', 'getCategoryList', 'deleteCategory', 'modifyCategory']),
    formatTime (row, column, cellValue, index) {
      return cellValue ? moment(parseInt(cellValue) * 1000).format('YYYY-MM-DD HH:mm') : '-'
    },
    getCateList () {
      this.getCategoryList()
        .then(data => {
          console.log('成功获取列表数据')
          this.catetoryList = data.data
        })
        .catch(() => {
          this.catetoryList = []
        })
    },
    showDialogWithInput (tip, next, placeholder) {
      this.$prompt(tip, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder: placeholder
      }).then((value) => {
        next(value)
      }).catch(() => {})
    },
    newCategory () {
      this.showDialogWithInput('新增分类', (value) => {
        if (!value) {
          this.$toast('分类名不能为空', 'error')
        }
        let name = value.value
        this.addCategory(name)
          .then((data) => {
            console.log('成功添加新分类标签')
            this.$toast('添加成功')
          })
          .then(() => {
            this.getCateList()
          })
      }, '请输入分类名称')
    },
    toList (type, id) {
      this.$router.push({
        path: '',
        query: {
          type: type,
          id: id
        }
      })
    },
    editCategory (row) {
      this.showDialogWithInput('修改分类', (value) => {
        if (!value) {
          this.$toast('分类名不能为空', 'error')
        }
        let params = {
          id: row.id,
          name: value.value
        }
        this.modifyCategory(params)
          .then(data => {
            this.$toast('修改成功')
            this.getCateList()
          })
      }, '请输入修改后的分类名')
    },
    deleteCate (id) {
      this.deleteCategory(id)
        .then(data => {
          this.$toast('删除成功', 'success')
          this.getCateList()
        })
        .catch(error => {
          this.$toast(error, 'error')
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../assets/style/color.styl'
#category
  position: relative
  width: 1300px
  padding-top: 52px
  padding-left: 20px
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
