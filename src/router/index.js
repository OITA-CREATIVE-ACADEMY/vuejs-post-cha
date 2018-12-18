import Vue from 'vue'
import Router from 'vue-router'
import Signup from '@/components/Signup'
import Signin from '@/components/Signin'
import Home from '@/components/Home'
import Post from '@/components/Post'
import Like from '@/components/Like'
import Mypage from '@/components/Mypage'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: 'signin'
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/post',
      name: 'Post',
      component: Post,
    },
    {
      path: '/mypage',
      name: 'Mypage',
      component: Mypage,
      meta: { requiresAuth: true }
    },
    {
      path: '/like',
      name: 'Like',
      component: Like,
      meta: { requiresAuth: true }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    // このルートはログインされているかどうか認証が必要です。
    // もしされていないならば、ログインページにリダイレクトします。
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        next()
      } else {
        next({
          path: '/signin',
          query: { redirect: to.fullPath }
        })
      }
    });
  } else {
    next() // next() を常に呼び出すようにしてください!
  }
})

export default router
