<template>
  <div class="btn-wp">
    <button
      class="btn btn-interaction"
      :class="{disabled:disabled,['btn-'+size]:true,['btn-'+color]:true,[type]:true}"
      @click="clickEvent"
      
    >
      
      <i class="iconfont" :class="{[icon]:!loading,['i-'+(color==='white'?'black':'white')]:!loading}"><loading v-if="loading" :style-config="styleConfig"></loading></i>
      <p class="btn-name" v-if="type==='rect'" :class="fontColor">
        <slot></slot>
      </p>
    </button>
  </div>
</template>

<script>
import loading from "./loading"
export default {
  components:{
    loading
  },
  props: {
    loading:true,
    disabled:{
      default:false,
      type:Boolean
    },
    size: {
      default: "medium",
      type: String
    },
    color: {
      default: "white",
      type: String
    },
    icon: {
      type: String,
      default: "icon-seeuser"
    },
    type: {
      type: String,
      default: "circle"
    }
  },
  data() {
    return {
    };
  },
  computed:{
    styleConfig(){
      let style={
        radius:"30px",
        color:"#555",
        borderWidth:"2px"
      };
      switch(this.size){
        case "small":
          style.radius = "10px"
          break;
        case "medium":
          style.radius = "20px"
          break;
        case "large":
          style.radius = "30px"
          break;
      }
      return style;
    },
    fontColor(){
      switch(this.color){
        case "yellow":
          return 'white';
        case "white":
          return 'black';
        default:
          return 'balck';
      }
    }
  },
  methods: {
    clickEvent(e){
      if(!this.loading&&!this.disabled){
        this.$emit('click',e)
      }
    }
  },
  created() {}
};
</script>

<style lang="less" scoped>
@import (less) "~style/mixin/interaction.less";
.btn-wp{
  display:inline-block;
  
}
.btn {
  box-sizing: border-box;
  cursor: pointer;
  // .lds-ring{
  //   position:absolute;
  //   top:0;
  //   right:0;
  // }
  &.disabled{
    background-color:#ddd !important;
    cursor:no-drop;
  }
  &.circle {
    border-radius: 50%;
    &.btn-large {
      width: 100px;
      height: 100px;
      font-size: 80px * 0.6px;
    }
    &.btn-small {
      width: 30px;
      height: 30px;
      font-size: 30px * 0.6px;
    }
    &.btn-medium {
      width: 50px;
      height: 50px;
      font-size: 50px * 0.6px;
    }
  }
  &.rect {
    display: block;
    border-radius:6px;
    padding:0 10px 0 12px;
    &.btn-large {
      height: 100px;
      font-size: 80px * 0.6px;
      .mixin-name(16px);
    }
    &.btn-medium {
      height: 50px;
      font-size: 50px * 0.6px;
      .mixin-name(14px);
    }
    &.btn-small {
      height: 30px;
      font-size: 30px * 0.6px;
      .mixin-name(12px);
    }
  }
}
.mixin-name(@size) {
  .btn-name {
    display: inline-block;
    font-size: @size;
    padding-left:4px;
    vertical-align: middle;
    &.black{
      color:#444;
    }
    &.white{
      color:white;
    }

  }
}
.btn-yellow {
  background-color: #faad14;
  .mixin-button(#faad14, "background");
}
.btn-transparent {
  background-color: transparent;
  .mixin-button(transparent, "background");
}
.btn-white {
  border:1px solid #ddd;
  background-color: white;
  .mixin-button(white, "border");
}

.iconfont {
  display: inline-block;
  font-size: 100%;

  vertical-align: text-bottom;
  &.i-white {
    color: white;
  }
  &.i-black {
    color: black;
  }
}
</style>
