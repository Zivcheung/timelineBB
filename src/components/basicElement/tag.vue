<template>
  <div class="tag" :class="[color]">{{tagName}}
  </div>
</template>

<script>
export default {
  props: {
    tagName: {
      default: "diary",
      type: String
    },
    color: {
      default: "blue",
      type: String
    }
  }
};
</script>

<style lang="less" scoped>
@import (less) "~style/mixin/colorPallet.less";

.tag {
  display:inline-block;
  line-height: 22px;
  min-width:46px;
  max-width:80px;
  margin:0 5px;
  text-align: center;
  font-size:12px;
  border-radius: 4px;
  color:white;
  &.blue {
    background-color: @blue;
  }
  &.yellow {
    background-color: @yellow;
  }
  &.magenta {
    background-color: @magenta;
  }
  &.cyan {
    background-color: @cyan;
  }
}
</style>
