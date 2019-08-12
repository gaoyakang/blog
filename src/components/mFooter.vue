<template>
  <div class="m-footer">
    <div class="footer-wrap">
      <p>本博客已经运行<span>{{runningTime}}</span></p>
      <p>51zxw教学博客网站,禁止非法抄袭,违者必究</p>
      <p>本站由51讲师--kk维护-@2019. 京ICP备888888号-1</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mFooter',
  data () {
    return {
      runningTime: 0
    }
  },
  created () {
    this.running()
  },
  methods: {
    running () {
      let startTime = new Date('2019/08/01 00:00:00')
      setInterval(() => {
        let time = new Date() - startTime
        let day = parseInt(time / 1000 / 60 / 60 / 24, 10)
        let hour = parseInt(time / 1000 / 60 / 60 % 24, 10)
        let minute = parseInt(time / 1000 / 60 % 60, 10)
        let second = parseInt(time / 1000 % 60, 10)
        this.runningTime = `${day}天${hour}时${minute}分${second}秒`
      }, 1000)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/style/color.styl'
.m-footer
  position: relative
  height: 120px
  width: 100%
  background-color: $color-main
  .footer-wrap
    position: relative
    max-width: 1000px
    padding: 0 20px
    margin: 0 auto
    height: 120px
    font-size: 13px
    display: flex
    flex-direction: column
    justify-content: center
    color: #999999
    > p
      margin: 4px 0
      a
        color: rgba(59, 116, 241, .8)
        text-decoration: underline
</style>
