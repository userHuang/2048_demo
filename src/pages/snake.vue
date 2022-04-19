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
      data: [
        {
        value: 2,
        isHead: false,
        snakeStyle: {
          transform: `translate3d(0px, 0px, 0px)`,
          transitionDuration: `0ms`,
          transitionProperty: `none`
        },
      }, 
      {
        value: 1,
        isHead: true,
        x: 0,
        y: 0,
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
        direction: 39, //向右
        hasChangedIndexArr: []
      }],
      curentDirection: 39
    }
  },
  methods: {
    init (item, direction, x, y) {
      this.timer = setInterval(() => {
        console.log(x, y,'----x--y---')
        if (direction == 37) { // 左
          x -= 20
        }
        if (direction == 39) { // 右
          x += 20
        }
        if (direction == 38) { // 上
          y -= 20
        }
        if (direction == 40) { // 下
          y += 20
        }
        // this.snakeStyle.transform = `translate3d(${x}px, ${y}px, 0px)`
        // this.data.forEach(item => {
        //   item.snakeStyle.transform = `translate3d(${x}px, ${y}px, 0px)`
        // })
        item.snakeStyle.transform = `translate3d(${x}px, ${y}px, 0px)`
        item.x = x;
        item.y = y;
        if ((direction === 39 && x === 340) || 
          (direction === 37 && x === 0) ||
          (direction === 38 && y === 0) ||
          (direction === 40 && y === 340)) {
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
        direction,
        hasChangedIndexArr: [0]
      })
    },
    transformFn (direction, x, y) {
      const fn = () => {
        this.actions.forEach(item => {
          this.data.forEach((el, index) => {
            if (!item.hasChangedIndexArr.includes(index)) {
              if (item.changeX === el.x && item.changeY === el.y) {
                item.hasChangedIndexArr.push(index)
                this.init(el, item.direction, el.x, el.y)
              }
            }
            if (item.hasChangedIndexArr.length === this.data.length) {
              this.init(el, direction, el.x, el.y)
            }
          })
        })
      }
      // if (this.data.length >1) {
      //   fn(this.actions)
      // }
      fn()
    }
  },
  mounted () {
    this.transformFn(39, 0, 0)
    // this.init(this.data[0], 39, 0, 0)
    // this.actionChange(39, 340, 20)
    document.onkeydown = (e) => {
      //事件对象兼容
      let e1 = e || event || window.event || arguments.callee.caller.arguments[0]
      console.log(e1.keyCode, 'e1.keyCode')
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
        // this.init(e1.keyCode, x, y)
        this.transformFn()
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