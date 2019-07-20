import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
import Article from '@/views/article'
import Image from '@/views/image'
import Publish from '@/views/publish'
import Comment from '@/views/comment'
import Fanns from '@/views/fanns'
import Setting from '@/views/setting'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        { name: 'welcome', path: '/', component: Welcome },
        { name: 'article', path: '/article', component: Article },
        { name: 'image', path: '/image', component: Image },
        { name: 'publish', path: '/publish', component: Publish },
        { name: 'comment', path: '/comment', component: Comment },
        { name: 'fanns', path: '/fanns', component: Fanns },
        { name: 'setting', path: '/setting', component: Setting }
      ]
    },
    { name: '404', path: '*', component: NotFound }
  ]
})

router.beforeEach((to, from, next) => {
//   if (to.path === '/login') return next()
//   const user = window.sessionStorage.getItem('heima73ll')
//   if (user) {
//     next()
//   } else {
//     next('/login')
//   }
// })

  const user = window.sessionStorage.getItem('heima73ll')
  if (to.path !== '/login' && !user) return next('/login')
  next()
})
export default router
