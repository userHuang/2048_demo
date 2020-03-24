<template>
  <scroll @scrollTop="scrollTop" @scrollBottom="scrollBottom" @scrollLeft="scrollLeft" @scrollRight="scrollRight">
    <div class="home-page">
      <div class="item" :class="`item_${item}`" v-for="(item, index) in datas" :key="index">
        <span v-if="item">{{item}}</span>
      </div>
    </div>
  </scroll>
</template>

<style lang="stylus" scoped>
  .home-page {
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
</style>

<script>
import scroll from '@/components/common/scroll'
export default {
  components: {
    scroll
  },

  data () {
    return {
      palace: 4,
      // datas: [{
      //   value: 0
      // }, {
      //   value: 0
      // }, {
      //   value: 0
      // }, {
      //   value: 0
      // }, {
      //   value: 32
      // }, {
      //   value: 64
      // }, {
      //   value: 128
      // }, {
      //   value: 256
      // }, {
      //   value: 512
      // }, {
      //   value: 1024
      // }, {
      //   value: 2048
      // }, {
      //   value: 4096
      // }, {
      //   value: 8192
      // }, {
      //   value: 16384
      // }, {
      //   value: 32768
      // }, {
      //   value: 65536
      // }],
      datas: [2, 4, 0, 0,
              2, 4, 8, 0,
              4, 8, 128, 256,
              8, 1024, 2048, 256]
    }
  },

  created () {
    console.log('-----created------')
  },

  methods: {
    mergeData (copysDatas, palace) {
      // 上滑或者下滑时  交换空值的位置

      var isNull = () => {
        copysDatas.forEach((item, index) => {
          if (!item && index <= 11) {
            [copysDatas[index], copysDatas[index + palace]] = 
            [copysDatas[index + palace], copysDatas[index]]
          }
        })
      }
      isNull(copysDatas)
      isNull(copysDatas)
      isNull(copysDatas)
      return copysDatas
    },

    topOrButtom (copysDatas, palace) {
      copysDatas = this.mergeData(copysDatas, palace)
      // 有相同值处理相加，并默认后者值为0
      copysDatas.forEach((value, index) => {
        if (index <= 11 && value && (copysDatas[index] == copysDatas[index + palace])) {
          copysDatas[index] = copysDatas[index] + copysDatas[index + palace]
          copysDatas[index + palace] = 0
        }
      })
      copysDatas = this.mergeData([...copysDatas], palace)
      return copysDatas
    },

    scrollTop () {
      console.log('=====scrollTop========')
      const palace = this.palace
      let copysDatas = [...this.datas]
      copysDatas = this.topOrButtom(copysDatas, palace)
      this.datas = copysDatas
    },

    scrollBottom () {
      // 下滑跟上滑处理一致，只需把数据反转
      const palace = this.palace
      let copysDatas = [...this.datas]
      this.topOrButtom(copysDatas.reverse(), palace)
      copysDatas = this.datas = copysDatas
      copysDatas.reverse()
      console.log('=====scrollBottom========')
    },


    rightData (datas, palace) {
      let copysDatas = []
      datas.forEach((item, index) => {
        let dex = index + 1
        const remainder = dex % palace // 余数
        const divisor = parseInt(dex / palace) //除数
        if (remainder === 0) {
          copysDatas[divisor - 1] = datas[index]
        }
        if (remainder === 3) {
          copysDatas[divisor + 5 - 1] = datas[index]
        }
        if (remainder === 2) {
          copysDatas[divisor + 9 - 1] = datas[index]
        }
        if (remainder === 1) {
          copysDatas[divisor + 13 - 1] = datas[index]
        }
      })
      return copysDatas
    },

    scrollLeft () {
      console.log('=====scrollLeft========')
      const palace = this.palace
      let copysDatas = this.rightData(this.datas.reverse(), palace)
      copysDatas = this.topOrButtom(copysDatas, palace)
      copysDatas = this.rightData(copysDatas, palace)
      console.log(copysDatas)
      this.datas = copysDatas
    },

    scrollRight () {
      console.log('=====scrollRight========')
      const palace = this.palace
      let copysDatas = this.rightData(this.datas, palace)
      copysDatas = this.topOrButtom(copysDatas, palace)
      copysDatas = this.rightData(copysDatas.reverse(), palace)
      console.log(copysDatas)
      this.datas = copysDatas
    }
  }
}
</script>
