<template>
<div class="admin-home">
  <p>首页</p>
  <div class="card-wrap">
    <icon-card
      v-for="(item, index) in messageCards"
      :key="index"
      :backgroundColor="item.backgroundColor"
      :middleMessage="item.middleMessage"
      :bottomMessage="item.bottomMessage"
      :to="item.to"
    >
    </icon-card>
  </div>
  <div class="card-wrap">
    <message-card title="最新文章">
      <div slot="content">
        <div
          class="article-content"
          v-for="(article,index) in newestArticleList"
          :key="index"
        >
          <span
            class="article-title"
            @click="$router.push({path: '/admin/article/preview', query:{id: article.id}})"
          >
            {{article.title}}
          </span>
          <span class="time">{{article.publishTime}}</span>
        </div>
        <p class="more" @click="$router.push({path: '/admin/article/manage'})">更多</p>
      </div>
    </message-card>
  </div>
</div>
</template>
<script>
import iconCard from './components/iconCard'
import messageCard from './components/messageCard'
// import { mapActions } from 'vuex'
export default {
  name: 'admin-home',
  components: {
    iconCard,
    messageCard
  },
  // created () {
  //   this.getArticleList({
  //     by: 'status',
  //     status: '0',
  //     pageL: 0,
  //     pageSize: 10
  //   })
  //     .then(data => {
  //       this.newestArticleList = data.list
  //     })
  //     .catch(() => {})
  // },
  // methods: {
  //   ...mapActions(['getArticleList'])
  // },
  data () {
    return {
      newestArticleList: [
        {
          title: '搭建个人博客',
          publishTime: '1111111111',
          id: 'ttttttttt'
        },
        {
          title: '搭建个人博客',
          publishTime: '1111111111',
          id: 'jjjjjjjj'
        },
        {
          title: '搭建个人博客',
          publishTime: '1111111111',
          id: 'gggggggggggg'
        },
        {
          title: '搭建个人博客',
          publishTime: '1111111111',
          id: 'xxsaddascdas'
        },
        {
          title: '搭建个人博客',
          publishTime: '1111111111',
          id: 'xxsaddascdas'
        }
      ],
      logParams: {
        page: 0,
        pageSize: 8
      },
      messageCards: [
        {
          backgroundColor: '#29b6f6',
          middleMessage: '5',
          bottomMessage: '文章',
          to: '/admin/article/manage'
        },
        {
          backgroundColor: '#6e8cd7',
          middleMessage: '8',
          bottomMessage: '分类',
          to: '/admin/categories'
        }
      ]
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../../assets/style/color.styl'
.admin-home
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
  .card-wrap
    position: relative
    animation: show .8s
    margin: 10px
    display: flex
    flex-direction: row
    flex-wrap: wrap
    .article-content
      padding: 15px 10px
      margin: 0px 10px
      border: 1px solid #eeeeee
      border-top: 0px
      font-size: 14px
      color: #555555
      position: relative
      display: flex
      flex-direction: row
      align-items: center
      justify-content: space-between
      &:first-child
        margin-top: 10px
        border-top: 1px solid #eeeeee
      .article-title
        position: relative
        cursor: pointer
        flex: 1
        padding-bottom: 2px
        single-text-ellipsis()
        transition: color .3s
        margin-right: 300px
        &:hover
          color: #29b6f6
      .time
        color: #999999
        margin-left: 10px
        .iconfont
          font-size: 14px
          margin-right: 5px
    .more
      padding: 10px
      margin-top: 10px
      text-align: center
      font-size: 14px
      @media (max-width: 759px)
        font-size: 12px
      color: #555555
      background-color: #f9f9f9
      cursor: pointer
      transition: all .3s
      &:hover
        background-color: $color-main
        color: $color-white
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
