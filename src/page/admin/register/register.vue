<template>
<div class="login">
  <div class="login-wrap">
    <h1 class="login-title">注册页</h1>
    <div class="login-form-wrap">
      <el-form
        :model="registerForm"
        :rules="registerRules"
        ref="registerForm"
      >
        <el-form-item prop="username">
          <el-input
            type="text"
            :maxlength="11"
            placeholder="请输入用户名"
            v-model="registerForm.username"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            :maxlength="16"
            placeholder="请输入密码"
            v-model="registerForm.password"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm"
          >
            立即注册
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</div>
</template>
<script>
import {
  mapActions
} from 'vuex'
export default {
  name: 'register',
  data () {
    return {
      registerForm: {
        username: '',
        password: ''
      },
      registerRules: {
        username: [
          {
            required: true,
            message: '木有写用户名啊',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '木有写密码啊',
            trigger: 'blur'
          },
          {
            min: 6,
            message: '最少写6位啊',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['adminRegister']),
    submitForm () {
      this.$refs['registerForm'].validate((valid) => {
        if (valid) {
          let registerFormParams = {
            username: this.registerForm.username,
            password: this.registerForm.password
          }
          this.adminRegister(registerFormParams)
            .then(data => {
              if (data.errno === 0) {
                this.$toast(data.message, 'success')
                this.$router.push({
                  path: '/login'
                })
              } else {
                this.$toast(data.data, 'error')
              }
            })
            .then(() => {})
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../../assets/style/color.styl'
.login
  position: fixed
  top: 0
  left: 0
  bottom: 0
  right: 0
  z-index: 2000
  background-color: $color-white
  background-position: center
  background-size: cover
  background-image: url('https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3761270698,3399798420&fm=26&gp=0.jpg')
  .login-wrap
    position: relative
    background-color: $color-white
    padding: 20px
    border-radius: 10px
    max-width: 460px
    margin: 20px auto
    line-height: 1
    top: 50%
    transform: translateY(-50%)
    .login-title
      font-size: 36px
      color: $color-main
      text-align: center
      margin-top: 20px
      margin-bottom: 30px
      @media (max-width: 759px)
        font-size: 20px
    .login-form-wrap
      margin: 0px auto
    .el-button
      width: 100%
      height: 40px
      font-size: 16px
      border-radius: 5px
      border: none
      background-color: $color-main
      transition: all .3s
      color: $color-white
      &:hover
        background-color: lighten($color-main, 20%)
      &.disabled
        border: none
        background-color: #e5e5e5
        &:hover
          background-color: #e5e5e5
</style>
