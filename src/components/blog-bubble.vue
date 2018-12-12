<template>
  <div class="timeline-wp">
    <btn size="medium" color="yellow" icon="icon-wallet"></btn>
    <h3 class="tl-title">{{blogInfo.title}}</h3>
  </div>
</template>

<script>
import btn from "./basicElement/btn"
export default {
  props:{
    "blogInfo":{
      type:Object,
      default:{},
    }
  },
  components:{
    btn:btn,
  }
}
</script>

<style lang="less" scoped>
.timeline-wp{
  display:flex;
  width:40%;
  margin:30px auto 0;
  flex-flow: column nowrap;
  align-items:center;
  .tl-title{
    margin:10px 0 0 0;
    font-size:12px;
    color:white;
    user-select: none;
  }
}
</style>
