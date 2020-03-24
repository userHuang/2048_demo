import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: r => require(['@/pages/index'], r),
      meta: {
        keepAlive: false
      }
    }
  ]
})
