<template>
  <div id="app">
    <div class="app-page">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',

  data () {
    return {
      ceshi: false
    }
  },

  created () {
    document.body.addEventListener('touchmove', function(e) {
      if(e._isScroller) return;
      // 阻止默认事件
      e.preventDefault();
    }, {
        passive: false
    });
  }
}
</script>

<style>
body {
  background: #ded9cb;
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
