<template>
  <div class="tail-loading-wp" @click="$emit('click',$event)">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  </div>
</template>

<script>
export default {
  props: {
    loading: false
  },
  data: () => ({}),
  watch: {
    loading: function(val) {
      let _this = this;
      if (val) {
        console.log("animation started");
        _this.startLoaderAnimation();
      } else {
        console.log("animation closed");
        _this.stopLoaderAnimation();
      }
    }
  },
  methods: {
    startLoaderAnimation() {
      let dots = this.$el.children,
        i = 0;
      dots = Array.prototype.slice.call(dots, 0);
      this.$el.classList.add("nohover");
      this.$el.loadingTimer = setInterval(() => {
        let prev = i === 0 ? 2 : i - 1;
        dots[prev].classList.remove("loading");
        dots[i].classList.add("loading");
        i >= 2 ? (i = 0) : i++;
      }, 100);
    },
    stopLoaderAnimation() {
      let dots = this.$el.children;
      clearInterval(this.$el.loadingTimer);
      Array.prototype.forEach.call(dots, el => {
        el.classList.remove("loading");
      });
      this.$el.classList.remove("nohover");
    }
  }
};
</script>

<style lang="less" scoped>
@import (less) "~style/mixin/colorPallet.less";

.tail-loading-wp {
  cursor: pointer;
  width: 10px;
  .dot {
    display: block;
    width: 8px;
    height: 8px;
    margin: 8px auto;
    border-radius: 50%;
    background-color: white;
  }
  &:not(.nohover):hover .dot {
    background-color: fade(white, 70%);
  }
  .dot.loading{
    background-color: fade(white, 50%);
  }
  &.nohover{
    pointer-events: none;
  }
}
</style>
