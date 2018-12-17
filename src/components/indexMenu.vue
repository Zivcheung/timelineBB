<template>
  <div class="index-menu-wp">
    <div class="center-btn" :class="{'open':isOpen}" @click="openMenuEvent">
    </div>
    <btn
      class="sub-button sub-button-idx1"
      :class="{'open':isOpen}"
      color="white"
      icon="icon-icon19"
    ></btn>
    <btn
      class="sub-button sub-button-idx2"
      :class="{'open':isOpen}"
      color="white"
      icon="icon-seeuser"
    ></btn>
    <btn
      class="sub-button sub-button-idx3"
      :class="{'open':isOpen}"
      color="white"
      icon="icon-icmusicnotepx"
    ></btn>
  </div>
</template>

<script>
import btn from "./basicElement/btn.vue";
export default {
  data: () => ({
    isOpen: false
  }),
  components: {
    btn: btn
  },
  methods: {
    openMenuEvent(e) {
      this.isOpen = !this.isOpen;
    },
    closeMenuEvent(){
      this.isOpen = false;
    }
  },

  created() {}
};
</script>

<style lang="less" scoped>
@import (less) "~style/mixin/interaction.less";
.index-menu-wp {
  position: relative;
  margin-top: 20px;
  .center-btn {
    position: relative;
    z-index: 2;
    box-sizing: border-box;
    margin: auto;
    width: 100px;
    height: 100px;
    border: 30px solid white;
    border-radius: 50%;
    cursor: pointer;
    .mixin-button(white, "border");
    &:after{
      content:"";
      position:absolute;
      top:-150px+20px;
      left:-150px+20px;
      display:block;
      width:300px;
      height:300px;
      border:2px dashed white;
      border-right:1px solid transparent;
      border-top:1px solid transparent;
      border-radius:50%;
      transition:200ms;
      transform:scale(0)rotate(-45deg);
    }
    &.open:after{
      transform:scale(1) rotate(-45deg);
    }
  }
}
.sub-button {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 50%;
  margin: 25px -25px;
  opacity: 0;
  transition: 0.2s;
  

  &.open {
    opacity: 1;
  }
  &.sub-button-idx1.open {
    transform: translate(-106px, 106px);
  }
  &.sub-button-idx2.open {
    transform: translate(0, 150px);
  }
  &.sub-button-idx3.open {
    transform: translate(106px, 106px);
  }
}
</style>
