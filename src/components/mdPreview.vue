<template>
  <div class="md-preview">
    <link rel="stylesheet" href="//cdn.bootcss.com/github-markdown-css/2.4.1/github-markdown.css">
    <div class="preview markdown-body" v-html="contents"></div>
  </div>
</template>

<script>
export default {
  name: 'mdPreview',
  props: ['contents'],
  mounted () {
    console.log(this.contents)
  }
}
</script>

<style lang="stylus" scoped>
.md-preview
  position: relative
  width: 100%
  margin-top: 10px
</style>
