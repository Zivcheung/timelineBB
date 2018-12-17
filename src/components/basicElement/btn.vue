<template>
  <div class="btn-wp">
    <button
      class="btn btn-interaction"
      :class="['btn-'+size,'btn-'+color,type]"
      @click="$emit('click',$event)"
    >
      <i class="iconfont" :class="[icon,'i-'+(color==='white'?'black':'white')]"></i>
      <p class="btn-name" v-if="type==='rect'">
        <slot></slot>
      </p>
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
      type: String,
      default: "icon-seeuser"
    },
    type: {
      type: String,
      default: "circle"
    }
  },
  data() {
    return {};
  },
  methods: {
    // a(){
    //   alert(1);
    // }
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
  cursor: pointer;
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
    color:white;
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
