<template>
  <div class="snake-page">
    <div class="snake-list" ref="snakeList">
      <div class="item" :style="item.snakeStyle" v-for="(item, index) in data" :key="index" :ref="`item_isHead_${item.isHead}`">{{item.value}}</div>
    </div>
  </div>
</template>

<script>
const snakeDivWidth = 360
export default {
  data () {
    return {
      data: [{
        value: 2,
        isHead: false,
        snakeStyle: {
          transform: `translate3d(0px, 0px, 0px)`,
          transitionDuration: `0ms`,
          transitionProperty: `none`
        },
      }, {
        value: 1,
        isHead: true,
        snakeStyle: {
          transform: `translate3d(0px, 0px, 0px)`,
          transitionDuration: `0ms`,
          transitionProperty: `none`
        }
      }],
      snakeStyle: {
        transform: `translate3d(0px, 0px, 0px)`,
        transitionDuration: `0ms`,
        transitionProperty: `none`
      },
      slideLength: 0,
      actions: [{
        changeX: snakeDivWidth,
        changeY: 0,
        direction: 39 //向右
      }],
      curentDirection: 39
    }
  },
  methods: {
    init (direction, x, y) {
      this.timer = setInterval(() => {
        console.log(x, y,'----x--y---')
        if (direction == 37) {
          x -= 20
        }
        if (direction == 39) {
          x += 20
        }
        if (direction == 38) {
          y -= 20
        }
        if (direction == 40) {
          y += 20
        }
        this.snakeStyle.transform = `translate3d(${x}px, ${y}px, 0px)`
        if (x == 340 || x == 0 || y == 0 || y == 340) {
          clearInterval(this.timer)
        }
      }, 500)
    },
    getSnakeXY () {
      let snakeList = this.$refs['item_isHead_true'][0].style.transform
      snakeList = snakeList.replace('translate3d', '').replace('(', '').replace(')', '').replace(/px/g, '')
      snakeList = snakeList.split(',')
      const x = +snakeList[0]
      const y = +snakeList[1]
      console.log(x,y, '====snakeList====')
      return {x, y}
    },
    actionChange (direction, x, y) {
      this.actions.push({
        changeX: x,
        changeY: y,
        direction
      })
    },
    transformFn () {
      const fn = (actions) => {
        actions.forEach(item => {
          this.data.forEach(el => {
            
          })
        })
      }
      if (this.data.length >1) {
        fn(this.actions)
      }
    }
  },
  mounted () {
    this.init(39, 0, 0)
    document.onkeydown = (e) => {
      //事件对象兼容
      let e1 = e || event || window.event || arguments.callee.caller.arguments[0]
      const curentDirection = this.curentDirection
      if ([37, 38, 39, 40].includes(e1.keyCode)) {
        if (e1.keyCode == curentDirection) {
          return
        }
        // 
        let {x, y} = this.getSnakeXY()
        this.actionChange(e1.keyCode, x, y)
        console.log('11111')
        clearInterval(this.timer)
        this.init(e1.keyCode, x, y)
        this.curentDirection = e1.keyCode
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .snake-page {
    width 360px;
    height 360px;
    background #CCC;
    margin 0 auto;
    .snake-list {
      display flex;
      position: absolute;

      .item {
        width: 20px;
        height: 20px;
        background: red;
      }
    }
    
  }
</style>