<template>
  <div class="lds-ring" :style="{height:spinnerStyle.height,width:spinnerStyle.width}">
    <div :style="spinnerStyle"></div>
    <div :style="spinnerStyle"></div>
    <div :style="spinnerStyle"></div>
  </div>
</template>

<script>
export default {
  props:{
    styleConfig:{
      type:Object,
      default:()=>({
        radius:"80%",
        color:"#444",
        borderWidth:"3px"
      })
    }
  },
  computed:{
    spinnerStyle(){
      let style = {};
      let o = this.styleConfig;
      style.borderColor=`${o.color} transparent transparent transparent`;
      style.height=o.radius;
      style.width =o.radius;
      style.borderWidth = o.borderWidth;
      return style;
    },
  }

}
</script>

<style lang='less'>
.lds-ring {
  display: inline-block;
  vertical-align: baseline;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 51px;
  height: 51px;
  border: 6px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
