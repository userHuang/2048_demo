<template>
  <div class="firework-component">
    <div class="firework-grp firework-grp3">
      <div class="firework size05 pos1 ">
        <div class="drops-grp">
          <span :class="`drop drop-${item}`" v-for="item in drops" :key="item"></span>
        </div>
        <div class="drops-grp drops-grp2">
         <span :class="`drop drop-${item}`" v-for="item in drops" :key="item"></span>
        </div>
      </div>
      <div class="firework size08 pos2 delay1">
        <div class="drops-grp">
          <span :class="`drop drop-${item}`" v-for="item in drops" :key="item"></span>
        </div>
        <div class="drops-grp drops-grp2">
          <span :class="`drop drop-${item}`" v-for="item in drops" :key="item"></span>
        </div>
      </div>
        <div class="firework pos3 delay2">
          <div class="drops-grp">
            <span :class="`drop drop-${item}`" v-for="item in drops" :key="item"></span>
          </div>
          <div class="drops-grp drops-grp2">
            <span :class="`drop drop-${item}`" v-for="item in drops" :key="item"></span>
          </div>
        </div>
        <div class="firework size15 pos4 ">
          <div class="drops-grp">
            <span :class="`drop drop-${item}`" v-for="item in drops" :key="item"></span>
          </div>
          <div class="drops-grp drops-grp2">
            <span :class="`drop drop-${item}`" v-for="item in drops" :key="item"></span>
          </div>
        </div>
        <div class="firework size18 pos5 delay1">
          <div class="drops-grp">
            <span :class="`drop drop-${item}`" v-for="item in drops" :key="item"></span>
          </div>
          <div class="drops-grp drops-grp2">
            <span :class="`drop drop-${item}`" v-for="item in drops" :key="item"></span>
          </div>
        </div>
        <div class="firework size20 pos6 delay2">
          <div class="drops-grp">
            <span :class="`drop drop-${item}`" v-for="item in drops" :key="item"></span>
          </div>
          <div class="drops-grp drops-grp2">
            <span :class="`drop drop-${item}`" v-for="item in drops" :key="item"></span>
          </div>
        </div>
        <div class="firework size13 pos7">
          <div class="drops-grp">
            <span :class="`drop drop-${item}`" v-for="item in drops" :key="item"></span>
          </div>
          <div class="drops-grp drops-grp2">
            <span :class="`drop drop-${item}`" v-for="item in drops" :key="item"></span>
          </div>
        </div>
        <div class="firework size05 pos8">
          <div class="drops-grp">
            <span :class="`drop drop-${item}`" v-for="item in drops" :key="item"></span>
          </div>
          <div class="drops-grp drops-grp2">
            <span :class="`drop drop-${item}`" v-for="item in drops" :key="item"></span>
          </div>
      </div>
    </div>
  </div>
</template>


<style lang="stylus" scoped>
  .firework-component{
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    .firework-grp {
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        color: white;
        color: #535396;
    }
    .firework-grp2{
        transform: rotate(180deg);
        color: #2C1C44;
        z-index: 6;
    }
    .firework-grp3{
        transform: rotate(-75deg);
        color: #E339BD;
        z-index: 7;
    }
    .firework {
        font-size: 10px;
        display: block;
        width: 8.5em;
        height: 8.5em;
        position: absolute;
    }

    .size05 {
        transform: scale(0.5);
    }
    .size08 {
        transform: scale(0.8);
    }
    .size13 {
        transform: scale(1.3);
    }
    .size15 {
        transform: scale(1.5);
    }
    .size18 {
        transform: scale(1.8);
    }
    .size20 {
        transform: scale(2);
    }

    .pos1 {
        left: 56%;
        top: 65%;
    }
    .pos2 {
        left: 25%;
        top: 15%;
    }
    .pos3 {
        left: 50%;
        top: 25%;
    }
    .pos4 {
        left: -5%;
        top: 50%;
    }
    .pos5 {
        left: 90%;
        top: 65%;
    }
    .pos6 {
        left: 35%;
        top: 75%;
    }
    .pos7 {
        left: 5%;
        top: -5%;
    }
    .pos8 {
        left: 75%;
        top: 20%;
    }

    .drops-grp {
        display: block;
        width: 8.5em;
        height: 8.5em;
        position: absolute;
    }
    .drops-grp2 {
        display: block;
        width: 8.5em;
        height: 8.5em;
        position: absolute;
        transform: rotate(45deg);
        color: yellow;
    }
    .drop {
        display: block;
        width: 1em;
        height: 2em;
        overflow: hidden;
        position: absolute;
        opacity: 0;
    }
    .drop:before {
        content: "";
        display: block;
        width: 1em;
        height: 1em;
        background: currentColor;
        border-radius: 50%;
    }
    .drop:after {
        content: "";
        display: block;
        position: relative;
        top: -0.4em;
        width: 0;
        height: 0;
        border-top: 1.4em solid currentColor;
        border-left: 0.5em solid transparent;
        border-right: 0.5em solid transparent;
    }
    .drop-1 {
        left:3.75em;
        top: 0;
        animation: drop1anim 1s ease-in-out infinite;
    }
    .drop-2 {
        top: 3.25em;
        right: 0;
        animation: drop2anim 1s ease-in-out infinite;
    }
    .drop-3 {
        left:3.75em;
        bottom: 0;
        animation: drop3anim 1s ease-in-out infinite;
    }
    .drop-4 {
        top: 3.25em;
        left: 0;
        animation: drop4anim 1s ease-in-out infinite;
    }
    .firework-2 .drop-1 {
        animation-delay: 0.5s
    }
    .firework-2 .drop-2 {
        animation-delay: 0.5s
    }
    .firework-2 .drop-3 {
        animation-delay: 0.5s
    }
    .firework-2 .drop-4 {
        animation-delay: 0.5s
    }

    .delay1 .drop-1 {
        animation-delay: 0.25s
    }
    .delay1 .drop-2 {
        animation-delay: 0.25s
    }
    .delay1 .drop-3 {
        animation-delay: 0.25s
    }
    .delay1 .drop-4 {
        animation-delay: 0.25s
    }

    .delay2 .drop-1 {
        animation-delay: 0.75s
    }
    .delay2 .drop-2 {
        animation-delay: 0.75s
    }
    .delay2 .drop-3 {
        animation-delay: 0.75s
    }
    .delay2 .drop-4 {
        animation-delay: 0.75s
    }

    @keyframes drop1anim {
        0% {
            top:3.25em;
            opacity: 0;
            transform: scale(0.3);
        }
        25% {
            opacity: 0;
        }
        50% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            top: -0.75em;
            opacity: 0;
            transform: scale(0.3);
        }
    }
    @keyframes drop2anim {
        0% {
            right:3.75em;
            opacity: 0;
            transform: scale(0.3) rotate(90deg);
        }
        25% {
            opacity: 0;
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(90deg);
        }
        100% {
            right: -0.25em;
            opacity: 0;
            transform: scale(0.3) rotate(90deg);
        }
    }
    @keyframes drop3anim {
        0% {
            bottom:3.25em;
            opacity: 0;
            transform: scale(0.3) rotate(180deg);
        }
        25% {
            opacity: 0;
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
        }
        100% {
            bottom: -0.75em;
            opacity: 0;
            transform: scale(0.3) rotate(180deg);
        }
    }
    @keyframes drop4anim {
        0% {
            left:3.75em;
            opacity: 0;
            transform: scale(0.3) rotate(-90deg);
        }
        25% {
            opacity: 0;
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(-90deg);
        }
        100% {
            left: -0.25em;
            opacity: 0;
            transform: scale(0.3) rotate(-90deg);
        }
    }
  }
</style>>

<script>
export default {
  data () {
    return {
      drops: [1, 2, 3, 4]
    }
  }
}
</script>
