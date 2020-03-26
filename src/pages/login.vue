<template>
  <div class="login-page">
    <p class="title">2048</p>
    <p class="welcome">welcome</p>
    <button @click="play">开始游戏</button>
    <button v-clipboard:copy="message" v-clipboard:success="onCopy">分享好友</button>
    <textarea id="shareUrl" style="display: none" value="222">33334433333</textarea>
    <div class="tips" v-show="isShow">连接已复制，快去分享给好友吧~</div>
  </div>
</template>

<style lang="stylus" scoped>
  .login-page {
    background-image: url(".././assets/images/login.png")
    width: 100%;
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center 300px;

    .title {
      height: 60px;
      font-size: 40px;
      line-height: 60px;
      text-align: center;
      color: #c16d45;
      font-family: fantasy;
      letter-spacing: 5px;
    }
    .welcome {
      height: 60px;
      font-size: 40px;
      line-height: 60px;
      text-align: center;
      color: #b58d7a;
      margin-top: -40px;
    }
    button {
      height: 50px;
      border: none;
      color: #fff;
      font-size: 18px;
      width: 130px;
      display: block;
      margin: auto;
      margin-bottom: 20px;
      background: #4eaf7e;
      letter-spacing: 2px;
    }
    .tips {
      height: 48px;
      line-height: 48px;
      text-align: center;
      color: #c33535;
      background: #ccc;
      position: absolute;
      width: 100%;
      top: 0px;
      font-size: 18px;
    }
  }
</style>
<script>
export default {
  data () {
    return {
      message: window.location.href,
      isShow: false
    }
  },
  methods: {
    play () {
      this.$router.push({
        path: '/play'
      })
    },
    onCopy () {
      this.isShow = true
      setTimeout(() => {
        this.isShow = false
      }, 3000)
    }
  }
}
</script>
