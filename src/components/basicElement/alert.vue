<template>
  <div class="dialog-wp" :style="renderStyle">
    <template v-if='loading'>
      <loading :style-config="loadingStyle"></loading>
    </template>
    <template v-else>
        <h3 class="dg-title">{{title}}</h3>
        <p class="dg-content">{{content}}</p>
    </template>
  </div>
</template>

<script>
import btn from "./btn.vue";
import loading from "./loading.vue"
export default {
  components:{
    btn,
    loading
  },
  props:{
    styleConfig:{
      type:Object,
      default:function(){
        return {
          width:"300px",
          backgroundColor:"#409EFF",
          color:"white"
        }
      }
    },
    title:{
      type:String,
      defalut:"提示"
    },
    content:{
      type:String,
      default:"请三思"
    },
    buttonPos:{
      type:String,
      default:"center"
    },
    loading:{
      type:Boolean,
      default:false
    },
    loadingStyle:{
      width:"10%",
    }
  },
  computed:{
    renderStyle(){
      let style = {};
      Object.assign(style,this.styleConfig);
      return style;
    }
  }
}
</script>

<style lang="less">
  .dialog-wp{
    position:fixed;
    top:40px;
    right:0;
    left:0;
    z-index:900 !important;
    margin:auto;
    padding:20px;
    background:rgba(240, 240, 240, 0.98);
    border-radius:10px;
    .dg-content{
      font-size:14px;
    }
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

</style>
