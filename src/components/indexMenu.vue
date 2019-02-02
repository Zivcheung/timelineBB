<template>
  <div class="index-menu-wp">
    <div class="center-btn" :class="{'open':isOpen}" @click="openMenuEvent">
      <btn
      class="sub-button sub-button-idx1"
      :class="{'open':isOpen}"
      color="white"
      icon="icon-icon19"
      :disabled="true"
      ></btn>
      <btn
        class="sub-button sub-button-idx2"
        :class="{'open':isOpen}"
        color="white"
        icon="icon-seeuser"
        @click="loginClickEvent"
      ></btn>
      <btn
        class="sub-button sub-button-idx3"
        :class="{'open':isOpen}"
        color="white"
        icon="icon-icmusicnotepx"
        @click="openMusicPlayer"
      ></btn>
    </div>
  </div>
</template>

<script>
import bus from "../eventBus.js"
import btn from "./basicElement/btn.vue";
export default {
  data: () => ({
    isOpen: false,
    musicOpen:false,
  }),
  components: {
    btn: btn
  },
  methods: {
    openMusicPlayer(){
      if(!this.musicOpen){
        this.musicOpen=true;
        bus.$emit("playerOpen");
      }else{
        this.musicOpen=false;
        bus.$emit("playerOpen");        
      }
    },
    openMenuEvent(e) {
      this.isOpen = !this.isOpen;
    },
    closeMenuEvent(){
      this.isOpen = false;
    },
    loginClickEvent(){
      let user = this.$firebase.auth().currentUser;
      if(user){
        this.$router.push({name:'logout'})
      }else{
        this.$router.push({name:'login'});
      }
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
  .spotify{
    position:absolute;
    z-index:100;
    width:100px;
    height:100px;
  }
  .center-btn {
    position: relative;
    z-index: 3;
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
  z-index: 1;
  top: -30px;
  left: 50%;
  margin: 25px -25px;
  opacity: 0;
  transition: 0.2s;
  pointer-events: none;
  

  &.open {
    opacity: 1;
    pointer-events:auto;
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
