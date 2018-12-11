import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Post from '@/components/Post'
import Like from '@/components/Like'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/post',
      name: 'Post',
      component: Post
    },
    {
      path: '/like',
      name: 'Like',
      component: Like
    },
  ]
})
