<template>
<div class="about">
  <div class="about-wrap">
    <div class="about-message">
      <p class="about-title">关于我</p>
    </div>
    <md-preview :contents="htmlContent"></md-preview>
  </div>
</div>
</template>
<script>
import mdPreview from '../../../components/mdPreview'
import {
  mapActions
} from 'vuex'
export default {
  name: 'about',
  components: {
    mdPreview
  },
  data () {
    return {
      htmlContent: ''
    }
  },
  methods: {
    ...mapActions(['getBlogAboutMe'])
  },
  created () {
    this.getBlogAboutMe()
      .then((data) => {
        this.htmlContent = data.data.html
      })
      .catch(() => {})
  }
}
</script>
<style lang="stylus" scoped>
.about
  position: relative
  padding: 30px 10px
  width: 100%
  .about-wrap
    position: relative
    animation: show .8s
    padding: 30px
    width: 100%
    @media (max-width: 768px)
      padding: 30px 15px
    background-color: $color-white
    box-shadow: 0px 0px 5px 0px rgba(38, 42, 48, .1)
    .about-message
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      .about-title
        font-size: 26px
        @media (max-width: 768px)
          font-size: 22px
        font-weight: bold
    .money-wrap
      width: 100%
      padding: 20px 30px
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      > p
        line-height: 2
        color: #555555
        font-size: 14px
        margin-top: 20px
        text-align: center
      .money-btn
        margin-top: 10px
        padding: 10px 24px
        background-color: #f44336
        border-radius: 5px
        color: $color-white
        font-size: 16px
        font-weight: bold
        cursor: pointer
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
        transition: background-color .3s
        &:hover
          background-color: lighten(#f44336, 30%)
      .qrcode-wrap
        margin-top: 10px
        display: flex
        flex-direction: row
        justify-content: center
        align-items: center
        flex-wrap: wrap
        .qrcode
          width: 200px
          display: flex
          flex-direction: column
          align-items: center
          justify-content: center
          margin-bottom: 10px
          padding: 10px
          > img
            width: 180px
            height: 180px
          > p
            text-align: center
            line-height: 1.5
            color: #555555
            font-size: 14px
.slide-fade-enter-active
  transition: all .3s ease
.slide-fade-leave-active
  transition: all .3s ease
.slide-fade-enter
.slide-fade-leave-to
  transform: translateY(20px)
  opacity: 0
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
