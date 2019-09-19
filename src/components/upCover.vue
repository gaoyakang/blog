<template>
  <div
    class="cover-upload-wrap"
    ref=coverOutWrap
  >
    <el-upload
      ref="upload"
      class="cover-uploader"
      action="http://upload-z1.qiniup.com"
      :show-file-list="false"
      :data="postData"
      :before-upload="beforeAvatarUpload"
      :on-success="handleAvatarSuccess"
      :on-error="handleError"
    >
      <div class="img-wrap">
        <img :src="imageUrl" class="cover" v-if="imageUrl">
        <div class="img-mask-default" :class="{'img-mask': imageUrl}">
          <i class="el-icon-upload"></i>
          <div>{{ tip }}</div>
        </div>
      </div>
    </el-upload>
  </div>
</template>
<script>
import {
  mapActions
} from 'vuex'

export default {
  name: 'up-cover',
  props: {
    tip: {
      default: '上传图片'
    },
    maxSize: {
      default: 3
    }
  },
  data () {
    return {
      postData: {
        token: '',
        key: ''
      },
      defaultImg: ''
    }
  },
  computed: {
    imageUrl () {
      return this.defaultImg
    }
  },
  mounted () {
    this.getQiniuToken()
      .then(data => {
        this.postData = {
          token: data.data.data
        }
      })
  },
  methods: {
    ...mapActions([
      'getQiniuToken'
    ]),
    beforeAvatarUpload (file) {
      const fileType = [
        'image/jpeg',
        'image/png',
        'image/webp'
      ]
      const type = fileType.indexOf(file.type)
      const size = file.size / 1024 / 1024 <= this.maxSize
      if (type === -1) {
        this.$toast('只限jpg、png、webp格式', 'error')
        return false
      }
      if (!size) {
        this.$toast(`图片太大了~最多支持${this.maxSize}MB`, 'error')
        return false
      }
      this.postData.key = file.name
    },
    handleAvatarSuccess (res, file) {
      this.defaultImg = 'http://pxx58uyi3.bkt.clouddn.com/' + res.key
      this.$emit('sendImgUrl', this.defaultImg)
    },
    handleError (res) {
      console.log(res)
    }
  }
}
</script>
<style lang="stylus">
@import '../assets/style/color.styl'
.cover-upload-wrap
  position: relative
  width: 100%
  max-width: 300px
  height: 150px
  border-radius: 5px
  .cover-uploader
    width: 100%
    height: 100%
    .el-upload
      width: 100%
      height: 100%
      overflow: hidden
      border-radius: 5px
      cursor: pointer
      border: 1px solid #dddddd
      .img-wrap
        position: relative
        width: 100%
        height: 100%
        &:hover
          .img-mask-default
            opacity: 1
            background-color: rgba(0, 0, 0, 0.5)
            color: $color-white
        .cover
          position: relative
          width: 100%
          height: 100%
          border-radius: 5px
        .img-mask-default
          position: absolute
          left: 0
          top: 0
          width: 100%
          height: 100%
          padding-left: 10px
          padding-right: 10px
          background-color: $color-white
          color: #555555
          display: flex
          flex-direction: column
          justify-content: center
          font-size: 12px
          transition: all .2s linear
          .el-icon-upload
            font-size: 18px
        .img-mask
          opacity: 0

</style>
