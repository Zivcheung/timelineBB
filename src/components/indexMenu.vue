<template>
  <div class="index-menu-wp">
    <div class="center-btn" @click="openMenuEvent"></div>
    <!-- <transition name="idx-menu"> -->
    <btn class="sub-button sub-button-idx1" :class="{'open':isOpen}" color="white" icon="icon-icon19"></btn>
    <btn class="sub-button sub-button-idx2" :class="{'open':isOpen}" color="white" icon="icon-seeuser"></btn>
    <btn class="sub-button sub-button-idx3" :class="{'open':isOpen}" color="white" icon="icon-icmusicnotepx"></btn>
    <!-- </transition> -->
  </div>
</template>

<script>
import btn from "./basicElement/btn.vue";
export default {
  
  data: () => ({
    isOpen: false,
  }),
  components: {
    btn: btn
  },
  methods: {
    openMenuEvent(e) {
      this.isOpen =!this.isOpen;
    }
  },
  created(){
  }
};
</script>

<style lang="less" scoped>
@import (less) "~style/mixin/interaction.less";
.index-menu-wp {
  position: relative;
  margin-top: 20px;
  .center-btn {
    position:relative;
    z-index: 2;
    box-sizing: border-box;
    margin: auto;
    width: 100px;
    height: 100px;
    border: 30px solid white;
    border-radius: 50%;
    .mixin-button(white, "border");
  }
}
.sub-button {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 50%;
  margin: 25px -25px;
  opacity: 0;
  transition:.2s;

  &.open {
    opacity: 1;
  }
  &.sub-button-idx1.open {
    transform: translate(-100px, 100px);
  }
  &.sub-button-idx2.open {
    transform: translate(0, 150px);
  }
  &.sub-button-idx3.open {
    transform: translate(100px, 100px);
  }
}
</style>
