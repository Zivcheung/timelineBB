<template>
  <div class="btn-wp">
    <button
      class="btn btn-interaction"
      :class="['btn-'+size,'btn-'+color]"
      @click="$emit('click',$event)"
    >
      <i class="iconfont" :class="[icon,'i-'+(color==='white'?'black':'white')]"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      default: "medium",
      type: String
    },
    color: {
      default: "white",
      type: String
    },
    icon: {
      type:String,
      default:"icon-seeuser"
    }
  },
  data() {
    return {
      
    };
  },
  created() {}
};
</script>

<style lang="less" scoped>
@import (less) "~style/mixin/interaction.less";
.btn {
  display: block;
  border-radius: 50%;
}
.btn-large {
  width: 100px;
  height: 100px;
  font-size:80px*0.6px;
}
.btn-small {
  width: 30px;
  height: 30px;
  font-size:30px*0.6px;
}
.btn-medium {
  width: 50px;
  height: 50px;
  font-size:50px*0.6px;
}
.btn-yellow {
  background-color: #faad14;
  .mixin-button(#faad14, "background");
}
.btn-white {
  background-color: white;
  .mixin-button(white, "background");
}
.iconfont {
  font-size: 100%;
  
  vertical-align: text-bottom;
  &.i-white{
    color: white;
  }
  &.i-black{
    color: black;
  }

}
</style>
