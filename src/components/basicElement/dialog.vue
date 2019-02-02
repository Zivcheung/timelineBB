<template>
  <div class="dialog-bg" >
    <div class="dialog-wp">
      <h3 class="dg-title">{{title}}</h3>
      <p class="dg-content">{{content}}</p>
      <div class="dg-btn-group" :class="buttonPos">
        <btn type="rect" size="small" color="yellow" @click="$emit('onLClick',$event)">Confirm</btn>
        <btn type="rect" size="small" color="white" @click="$emit('onRClick',$event)">Cancel</btn>
      </div>
    </div>
    </div>
</template>

<script>
import btn from "./btn.vue"
export default {
  components:{
    btn,
  },
  props:{
    title:{
      type:String,
      defalut:"提示"
    },
    content:{
      type:String,
      default:"are you sure?"
    },
    buttonPos:{
      type:String,
      default:"center"
    } 
  }
}
</script>

<style lang="less">
.dialog-bg{
  position:fixed;
  top:0;
  left:0;
  z-index:9999 !important;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.7);
  .dg-content{
    margin-top:20px;
    margin-bottom:50px;
  }
  .dialog-wp{
    width:30%;
    margin:20% auto 0;
    padding:30px;
    background:white;
    border-radius:10px;
    .dg-btn-group{
      display:flex;
      .btn-wp{
        margin:0 15px
      }
      &.center{
        justify-content: center;
      }
      &.left{
        justify-content: flex-start;        
      }
      &.right{
        justify-content: flex-end;
      }
    }
  }
}
</style>
