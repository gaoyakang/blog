<template>
  <div class="md-preview">
    <link rel="stylesheet" href="//cdn.bootcss.com/github-markdown-css/2.4.1/github-markdown.css">
    <section id="markdown-preview-body" class="preview markdown-body" v-html="contents"></section>
  </div>
</template>

<script>
import {
  mapActions
} from 'vuex'
export default {
  name: 'mdPreview',
  props: ['contents'],
  data () {
    return {
      imgList: []
    }
  },
  watch: {
    contents (content) {
      setTimeout(this.init, 1000)
    }
  },
  methods: {
    ...mapActions(['setArticleMenuSource']),
    init () {
      window.scrollTo(0, 0)
      this.getMenu()
    },
    getMenu () {
      let headNodes = document.getElementById('markdown-preview-body').getElementsByClassName('my-blog-head')
      let headList = []
      Array.prototype.forEach.call(headNodes, item => {
        headList.push({
          id: item.id,
          index: parseInt(item.tagName.replace('H', '')),
          title: item.innerText
        })
      })
      let tree = this.treeify(headList, 0)
      if (tree.length === 0) {
        tree = false
      }
      let source = JSON.parse(JSON.stringify(headList))
      source.forEach(item => {
        item.children = []
      })
      this.setArticleMenuSource(source)
    },
    treeify (data, tag) {
      let tree = []
      let index = 0
      data.forEach(item => {
        item.children = []
        let len = tree.length
        if (len === 0) {
          item.tag = tag + (++index) + '.'
          tree.push(item)
        } else {
          let last = tree[len - 1]
          if (item.index <= last.index) {
            item.tag = tag + (++index) + '.'
            tree.push(item)
          } else {
            last.children.push(item)
          }
        }
      })
      tree.forEach(item => {
        let children = item.children
        let ids = []
        index = 0
        children.forEach(child => {
          child.tag = item.tag + (++index) + '.'
          if (ids.indexOf(child.index) === -1) {
            ids.push(child.index)
          }
        })
        if (ids.length > 1) {
          item.children = this.treeify(children, item.tag)
        }
      })
      return tree
    }
  },
  mounted () {
    setTimeout(this.init, 1000)
  }
}
</script>

<style lang="stylus" scoped>
.md-preview
  position: relative
  width: 100%
  margin-top: 10px
</style>
