<template>
  <div id="app">
    <div class="app-page">
      <div id="loud" class="loud-link-click" data-sound="shimmer-vibes" ref="loudClick"></div>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </div>
</template>

<script>
import loudlinks from '@/pages/utils/lounlinks.min.js'
export default {
  name: 'App',

  data () {
    return {
      ceshi: false
    }
  },

  created () {
    // 防止页面滑动
    document.body.addEventListener('touchmove', function(e) {
      if(e._isScroller) return
      // 阻止默认事件
      e.preventDefault()
    }, {
        passive: false
    })

    // 禁用手指双击缩放
    let lastTouchEnd = 0
    document.documentElement.addEventListener('touchend', function (event) {
      const now = Date.now()
      if (now - lastTouchEnd <= 300) {
        event.preventDefault()
      }
      lastTouchEnd = now
    }, false)
  },

  mounted () {
    loudlinks(document)
  }
}
</script>

<style>
body {
  background: #ded9cb;
  cursor: pointer;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100%;
}
.app-page{
  width: 100%;
  height: 100%;
}
</style>
