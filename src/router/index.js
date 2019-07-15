import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
import Article from '@/views/article'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        { name: 'welcome', path: '/', component: Welcome },
        { name: 'article', path: '/article', component: Article }
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
