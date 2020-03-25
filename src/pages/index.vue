<template>
  <div class="home-page">
    <div class="title">得分：{{score}}</div>
    <scroll @scrollTop="scrollTop" @scrollBottom="scrollBottom" @scrollLeft="scrollLeft" @scrollRight="scrollRight">
      <div class="main-content">
        <div class="item" :class="`item_${item}`" v-for="(item, index) in datas" :key="index">
          <span v-if="item">{{item}}</span>
        </div>
      </div>
    </scroll>
    <div class="action">
      <button class="restart" @click="reStart">重新开始</button>
      <button class="max-score">历史最高分</button>
    </div>
    <div class="model" v-show="!canMove"  @click="canMove = true"></div>
    <div class="tips" v-show="!canMove">
      game over
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.home-page {
  user-select: none;
  .title {
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    font-family: cursive;
  }
  .main-content{
    background: #e7eadd;
    color: red;
    max-width: 400px;
    margin: 0 auto;
    padding: 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    
    .item {
      width: 80px;
      height: 80px;
      background: #CCC;
      margin: 5px;
      line-height: 80px;
      text-align: center;
      font-weight: bold;
      font-size: 24px;
      border-radius: 8px;
    }

    .item_2, .item_512 {
      background: #FFF;
      color: #000;
    }

    .item_4, .item_1024 {
      background: #d4dab1;
      color: #000;
    }

    .item_8, .item_2048 {
      background: #efcd8f;
      color: #FFF;
    }

    .item_16, .item_4096 {
      background: #d0c997;
      color: #FFF;
    }

    .item_32, .item_8192 {
      background: #d49d64;
      color: #FFF;
    }

    .item_64, .item_16384 {
      background: #f98a9a;
      color: #FFF;
    }

    .item_128, .item_32768 {
      background: #d897d6;
      color: #FFF;
    }

    .item_256 {
      background: #9799d8;
      color: #FFF;
    }
  }
  .action {
    margin-top: 10px;
    line-height: 60px;
    text-align: center;
    background: #ded4d4;

    button {
      height: 40px;
      border: none;
      color: #FFF;
      font-size: 16px;
      width: 120px;
    }

    .restart {
      background: #27b338;
      margin-right: 20px;
    }

    .max-score {
      background: #ccb934;
    }
  }
  .model {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #ccccccb3;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .tips {
    width: 260px;
    height: 180px;
    background: #fdba76;
    line-height: 180px;
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    margin-top: 50%;
    font-size: 28px;
  }
}
@media screen and (max-width: 370px ) {
  .home-page {
    .main-content {
      .item {
        width: 65px;
        height: 65px;
        line-height: 65px;
      }
    }
  }
}
</style>

<script>
import scroll from '@/components/common/scroll'
export default {
  components: {
    scroll
  },

  data () {
    return {
      palace: 4, // 4x4方格
      score: 0,
      // initData: [2, 1024,  0,    0,
      //            64, 32,   8,    0,
      //            4,  8,    128,  256,
      //            8,  1024, 2048, 256],
      datas: [],
      initData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      randomNums: [2, 4],
      canMove: true
    }
  },

  created () {
    this.init()
  },

  methods: {
    init () {
      this.score = 0
      this.canMove = true
      const data = [...this.initData]
      this.datas = this.randomValue(data)
    },
  
    reStart () {
      this.init()
    },

    mergeData (copysDatas, palace) {
      // 上滑或者下滑时  交换空值的位置
      const updateNullValue = () => {
        copysDatas.forEach((item, index) => {
          if (!item && index <= 11) {
            [copysDatas[index], copysDatas[index + palace]] = 
            [copysDatas[index + palace], copysDatas[index]]
          }
        })
      }
      updateNullValue(copysDatas)
      updateNullValue(copysDatas)
      updateNullValue(copysDatas)
      return copysDatas
    },

    // 生成随机值
    randomValue (datas) {
      let randomNull = []
      // 取出所以空值的下标
      datas.forEach((item, index) => {
        if (!item) {
          randomNull.push(index)
        }
      })
      // 随机取出一个空值下标
      const randomNullIndex= Math.floor((Math.random() * randomNull.length))

      // 在randomNums中随机取出一个数
      const randomNumIndex = Math.floor((Math.random() * this.randomNums.length))
      const randomNum = this.randomNums[randomNumIndex]
      // 给随机出的空值 补值
      datas[randomNull[randomNullIndex]] = randomNum
      return datas
    },

    // 滑动时数据处理
    scrollingActon (copysDatas, palace) {
      copysDatas = this.mergeData(copysDatas, palace)
      // 有相同值处理相加，并默认后者值为0
      copysDatas.forEach((value, index) => {
        if (index <= 11 && value && (copysDatas[index] == copysDatas[index + palace])) {
          copysDatas[index] = copysDatas[index] + copysDatas[index + palace]
          copysDatas[index + palace] = 0
          this.score += copysDatas[index]
        }
      })
      
      // 判断方格是否有可合并的数值
      let canMove = false
      if (!copysDatas.includes(0)) {
        copysDatas.forEach((item, index) => {
          // 判断左上3X3方格中每一个值和他的右边以及下边的值是否相等
          if (index <= 2 || (index >= 4 || index <= 6) || (index >= 8 || index <= 10)) {
            if ((item === copysDatas[index + 1]) || (item === copysDatas[index + 4])) {
              canMove = true
            }
          }
          // 判断最右侧的上三个数与下方值是否相等 
          if (index === 3 || index === 7 || index === 11) {
            if (item === copysDatas[index + 4]) {
              canMove = true
            }
          }
          // 判断最下侧的左三个数与右方值是否相等 
          if (index === 12 || index === 13 || index === 14) {
            if (item === copysDatas[index + 1]) {
              canMove = true
            }
          }
        })
        if (!canMove) {
          this.canMove = false
        }
      }
      copysDatas = this.mergeData([...copysDatas], palace)
      return copysDatas
    },

    // 向下滑动时数据处理
    fixScrollBottomData (datas, palace) {
      /**
       * 向下滑动 相当于把数据上下反转
       * 
       * 1(13)    2(14)   3(15)    4(16)
         5(9)     6(10)   7(11)    8(12)
         9(5)     10(6)   11(7)    12(8)
         13(1)    14(2)   15(3)    16(4)
       */
      let copysDatas = []
      datas.forEach((item, index) => {
        if (index <= 3) {
          let num = (index + 3 * palace)
          copysDatas[num] = datas[index]
        }
        if (index > 3 && index <= 7) {
          let num = (index + palace)
          copysDatas[num] = datas[index]
        }

        if (index > 7 && index <= 11) {
          let num = (index - palace)
          copysDatas[num] = datas[index]
        }

        if (index > 11 && index <= 15) {
          let num = (index - 3 * palace)
          copysDatas[num] = datas[index]
        }
      })
      return copysDatas
    },

    // 想右滑动时数据处理
    fixScrollRightData (datas, palace) {
      /**
       * 往右滑动  相当于把数据顺时针旋转90度
       * 原先的下标排序 1 2 3  4   5 6  7  8    9 10 11 12  13 14 15 16
       * 旋转后下标排序 4 8 12 16  3 7 11 15    2 6  10 14  1  5  9  13
        1(13)   2(9)   3(5)   4(1)
        5(14)   6(10)  7(6)   8(2)
        9(15)  10(11)  11(7)  12(3)
        13(16) 14(12)  15(8)  16(4)
      */
      let copysDatas = []
      datas.forEach((item, index) => {
        const dex = index + 1
        const remainder = dex % palace // 余数
        const divisor = parseInt(dex / palace) //除数
        const num = (palace - remainder) * palace + 1
        if (remainder === 0) {
          copysDatas[divisor - 1] = datas[index]
        }
        // 目前是 4X4 宫格  remainder从3开始
        if (remainder === 3 || remainder === 2 || remainder === 1) {
          copysDatas[divisor + num - 1] = datas[index]
        }
      })
      return copysDatas
    },

    scrollTop () {
      const palace = this.palace
      let copysDatas = [...this.datas]
      copysDatas = this.scrollingActon(copysDatas, palace)
      copysDatas = this.randomValue(copysDatas)
      this.datas = copysDatas
    },

    scrollBottom () {
      const palace = this.palace
      // 按照4X4方格 反转对称处理数据
      let copysDatas = this.fixScrollBottomData(this.datas, palace)
      copysDatas = this.scrollingActon(copysDatas, palace)
      // 再反转 得到原先数据
      copysDatas = this.fixScrollBottomData(copysDatas, palace)
      copysDatas = this.randomValue(copysDatas)
      this.datas = copysDatas
    },

    scrollRight () {
      const palace = this.palace
      // 按照4X4方格 得到顺时针旋转90度后的数据
      let copysDatas = this.fixScrollRightData(this.datas, palace)
      // 按照上滑情况处理
      copysDatas = this.scrollingActon(copysDatas, palace)
      // 再将数据反转并顺时针旋转90度 得到原先的数据
      copysDatas = this.fixScrollRightData(copysDatas.reverse(), palace)
      copysDatas = this.randomValue(copysDatas)
      this.datas = copysDatas
    },

    scrollLeft () {
      // 与右滑类似处理
      const palace = this.palace
      let copysDatas = this.fixScrollRightData(this.datas.reverse(), palace)
      copysDatas = this.scrollingActon(copysDatas, palace)
      copysDatas = this.fixScrollRightData(copysDatas, palace)
      copysDatas = this.randomValue(copysDatas)
      this.datas = copysDatas
    }
  }
}
</script>
