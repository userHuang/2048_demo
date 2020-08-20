import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/play',
      component: r => require(['@/pages/index'], r),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/',
      component: r => require(['@/pages/login'], r),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/snake',
      component: r => require(['@/pages/snake'], r),
      meta: {
        keepAlive: false
      }
    }
  ]
})
