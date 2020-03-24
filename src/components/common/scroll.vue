<template>
  <div class="scroll-component"
    @touchstart="touchstart()"
    @touchmove="touchmove()"
    @touchend="touchend"
    ref="scrollDiv">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data () {
    return {
      scrollSize: 8,
      status: ''
    }
  },
  methods: {
    touchstart () {
      // event.preventDefault() //阻止默认事件（长按的时候出现复制）
      this.startX = event.changedTouches[0].pageX
      this.startY = event.changedTouches[0].pageY
    },

    touchmove () { // 如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
      event.preventDefault()
      var moveEndX = event.changedTouches[0].pageX
      var moveEndY = event.changedTouches[0].pageY
      var X = moveEndX - this.startX
      var Y = moveEndY - this.startY
      let scrollDiv = this.$refs.scrollDiv.children[0] || null
      if (Math.abs(X) > Math.abs(Y) && X > 0) {
        // console.log('left to right')
        // this.$emit('scrollRight')
        this.status = 'scrollRight'
      } else if (Math.abs(X) > Math.abs(Y) && X < 0) {
        // console.log('right to left')
        // this.$emit('scrollLeft')
        this.status = 'scrollLeft'
      } else if (Math.abs(Y) > Math.abs(X) && Y > 0) {
        // console.log('top to bottom')
        // this.$emit('scrollBottom')
        this.status = 'scrollBottom'
      } else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
        // console.log('bottom to top')
        // this.$emit('scrollTop')
        this.status = 'scrollTop'
      } else {
        console.log('just touch')
        this.status = ''
      }
      scrollDiv = null
    },

    touchend () {
      console.log('----touchend------')
      if (this.status) {
        this.$emit(this.status)
      }
    }
  }
}
</script>
