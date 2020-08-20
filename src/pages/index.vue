<template>
  <div class="home-page">
    <div class="title">
      <span>得分：{{score}}</span>
    </div>
    <scroll @scrollTop="scrollTop" @scrollBottom="scrollBottom" @scrollLeft="scrollLeft" @scrollRight="scrollRight">
      <div class="main-content">
        <div class="item" :class="`item_${item}`" v-for="(item, index) in datas" :key="`${item}_${index}`">
          <div v-show="item" :class="transitionIndex == index ? 'bounce-enter-active': ''">{{item}}</div>
        </div>
      </div>
    </scroll>
    <div class="action">
      <button class="restart" @click="reStart">重新开始</button>
      <button class="max-score" @click="showScore">历史最高分</button>
    </div>
    <div class="model" v-show="!notShowDialog"  @click="notShowDialog = true"></div>
    <div class="tips" v-show="!notShowDialog">
      <p class="head">{{dialogTitle}}</p>
      <p class="value">{{dialogTips}} {{emoji}}</p>
    </div>
    <div class="interjection" v-show="isInterject">{{interject}}</div>
    <fireworks v-show="isFireworks"></fireworks>
    <span class="goBack" @click="goBack"></span>
  </div>
</template>

<style lang="stylus" scoped>
.home-page {
  user-select: none;
  background: #ded9cb;
  height: 100%;

  .title {
    text-align: center;
    line-height: 60px;
    font-size: 22px;
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
    line-height: 70px;
    text-align: center;
    background: #ded4d4;

    button {
      height: 50px;
      border: none;
      color: #FFF;
      font-size: 18px;
      width: 140px;
      letter-spacing: 2px;
      border-radius: 10px;
    }

    .restart {
      background: #b38827;
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
    background: rgba(0,0,0,0.3);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .tips {
    width: 260px;
    height: 180px;
    background: #FFF;
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
    box-shadow: 2px 2px 1px #FFF;
    border-radius: 10px;

    .head, .value{
      height: 60px;
      line-height: 60px;
      margin: 0px;
      color: #d07e4f;
    }

    .head {
      margin-bottom: 10px;
      color: #000;
    }
  }
  .interjection {
    height: 40px;
    line-height: 40px;
    text-align: center;
    position: absolute;
    width: 100%;
    top: 30px;
    font-size: 24px;
    color: #26f10d;
    font-family: initial;
  }
  .goBack {
    position: absolute;
    width: 60px;
    top: 0px;
    height: 60px;
    line-height: 60px;
    background: url(".././assets/images/go_back.png") no-repeat;
    background-size: 40px 40px;
    background-position: center;
  }

  .bounce-enter-active{
    animation: bounce-in 0.5s;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.8);
    }
    100% {
      transform: scale(1);
    }
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
import loudlinks from '@/pages/utils/lounlinks.min.js'
import scroll from '@/components/common/scroll'
import fireworks from '@/components/common/fireworks'
export default {
  components: {
    scroll,
    fireworks
  },

  data () {
    return {
      palace: 4, // 4x4方格
      score: 0,
      maxScore: 0,

      datas: [],
      initData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      randomNums: [2, 4],

      notShowDialog: true,
      dialogTips: 'Game Over',
      dialogTitle: '',
      interject: '',
      oldInterject: '',
      isInterject: false,
      isFireworks: false,
      emoji: '😭',
      transitionIndex: 0,

      audioCtx: null //音频声音
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    init () {
      this.score = 0
      this.notShowDialog = true
      this.dialogTips = 'Game Over'
      this.dialogTitle = ''
      this.interject = ''
      this.oldInterject = ''
      this.isInterject = false
      this.isFireworks =  false
      const data = [...this.initData]
      this.datas = this.randomValue(data)
      if (window.localStorage.getItem('MAXSCORE')) {
        this.maxScore = window.localStorage.getItem('MAXSCORE')
      }
    },

    // 重新开始
    reStart () {
      this.init()
      document.getElementById('loud').click()
    },

    // 展示历史最高分
    showScore () {
      this.notShowDialog = false
      this.dialogTips = this.maxScore
      this.dialogTitle = 'Max Score'
      const score = this.maxScore
      if (score > 1000) {
        this.emoji = '😐'
      }
      if (score > 2000) {
        this.emoji = '😉'
      }
      if (score > 3000) {
        this.emoji = '😀'
      }
      if (score > 4000) {
        this.emoji = '😂'
      }
      if (score > 6000) {
        this.emoji = '😎'
      }
      if (score > 8000) {
        this.emoji = '😘'
      }
      if (score > 10000) {
        this.emoji = '❤'
      }
      this.showFireworks()
    },

    // 显示游戏结束
    showGameOver () {
      this.notShowDialog = false
      this.dialogTips = 'Game Over'
      this.dialogTitle = 'Sorry'
      this.emoji = '😭'
    },

    // 显示烟花效果
    showFireworks () {
      this.isFireworks = true
      setTimeout(() => {
        this.isFireworks = false
      }, 2000)
    },

    // 是否显示感叹词
    isShowInterjection () {
      const score = this.score
      if (score > 500) {
        this.interject = 'Good'
      }
      if (score > 1000) {
        this.interject = 'Super'
      }
      if (score > 1500) {
        this.interject = 'Perfect'
      }
      if (score > 2000) {
        this.interject = 'Excellent'
      }
      if (score > 2500) {
        this.interject = 'Outstanding'
      }
      if (score > 3000) {
        this.interject = 'Well done'
      }
      if (score > 3500) {
        this.interject = 'Super star'
      }
      if (score > 4000) {
        this.interject = 'You are special'
      }
      if (score > 4500) {
        this.interject = 'You are so smart'
      }
      if (score > 6000) {
        this.interject = 'I envy you very much'
      }
      if (score > 8000) {
        this.interject = 'You are Outstanding'
      }
      if (score > 10000) {
        this.interject = 'You are invincible'
      }
      if (score > 15000) {
        this.interject = '求你别玩了, 我已经想不到词了'
      }
      if (this.oldInterject !== this.interject) {
        this.isInterject = true
        this.isFireworks = true
        setTimeout(() => {
          this.isInterject = false
          this.isFireworks = false
          this.oldInterject = this.interject
        }, 2000)
      }
    },

    // 上滑或者下滑时  交换空值的位置
    mergeData (copysDatas, palace) {
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
      this.transitionIndex = randomNull[randomNullIndex]
      console.log(randomNull[randomNullIndex], 'randomNull[randomNullIndex]')
      return [...datas]
    },

    // 滑动时数据处理
    scrollingActon (copysDatas, palace) {
      copysDatas = this.mergeData(copysDatas, palace)
      // 有相同值处理相加，并默认后者值为0
      let isSameValue = false
      copysDatas.forEach((value, index) => {
        if (index <= 11 && value && (copysDatas[index] == copysDatas[index + palace])) {
          copysDatas[index] = copysDatas[index] + copysDatas[index + palace]
          copysDatas[index + palace] = 0
          this.score += copysDatas[index]
          isSameValue = true
        }
      })

      // if (isSameValue) {
      //   // 相同值触发音效
      //   this.$refs.loudSlide.click()
      // } else {
      //   this.$refs.loudClick.click()
      // }
      document.getElementById('loud').click()
      
      if (this.score > this.maxScore) {
        this.maxScore = this.score
        window.localStorage.setItem('MAXSCORE', this.score)
      }

      this.isShowInterjection()
      
      // 判断方格是否有可合并的数值
      let notShowDialog = false
      if (!copysDatas.includes(0)) {
        copysDatas.forEach((item, index) => {
          // 判断上下有没有值相等
          if (index >= 4) {
            if (item === copysDatas[index - 4]) {
              notShowDialog = true
            }
          } else {
            if (item === copysDatas[index + 4]) {
              notShowDialog = true
            }
          }
          // 判断左右有没有值相等
          if ([4, 7, 11, 15].includes(index)) {
            if (item === copysDatas[index - 1]) {
              notShowDialog = true
            }
          } else {
            if (item === copysDatas[index + 1]) {
              notShowDialog = true
            }
          }
        })
        if (!notShowDialog) {
          this.showGameOver()
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
    },

    goBack () {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>
